const STORE_API = "https://tienda.caissa.com.ar/wp-json/wc/store/v1";
const PAGE_SIZE = 100;

type StoreCategory = {
  id: number;
  name: string;
  slug: string;
  parent: number;
};

type StoreImage = {
  src?: string;
  thumbnail?: string;
  alt?: string;
};

type StoreProduct = {
  id: number;
  name: string;
  permalink: string;
  images?: StoreImage[];
  categories?: StoreCategory[];
};

export type PortfolioGroup = {
  name: string;
  slug: string;
  products: StoreProduct[];
};

async function getCategories(): Promise<StoreCategory[]> {
  const query = new URLSearchParams({
    hide_empty: "true",
    per_page: String(PAGE_SIZE),
    _fields: "id,name,slug,parent",
  });
  const response = await fetch(`${STORE_API}/products/categories?${query}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) return [];
  return (await response.json()) as StoreCategory[];
}

async function getProducts(): Promise<StoreProduct[]> {
  const query = new URLSearchParams({
    per_page: String(PAGE_SIZE),
    page: "1",
    orderby: "menu_order",
    order: "asc",
    _fields: "id,name,permalink,images,categories",
  });
  const firstResponse = await fetch(`${STORE_API}/products?${query}`, {
    next: { revalidate: 3600 },
  });

  if (!firstResponse.ok) throw new Error("No se pudo cargar el catálogo");

  const firstPage = (await firstResponse.json()) as StoreProduct[];
  const pageCount = Number(firstResponse.headers.get("X-WP-TotalPages") ?? 1);

  if (pageCount <= 1) return firstPage;

  const nextPages = await Promise.all(
    Array.from({ length: pageCount - 1 }, async (_, index) => {
      const pageQuery = new URLSearchParams(query);
      pageQuery.set("page", String(index + 2));
      const response = await fetch(`${STORE_API}/products?${pageQuery}`, {
        next: { revalidate: 3600 },
      });
      if (!response.ok) return [] as StoreProduct[];
      return (await response.json()) as StoreProduct[];
    }),
  );

  return [...firstPage, ...nextPages.flat()];
}

export async function getPortfolioGroups(): Promise<PortfolioGroup[]> {
  try {
    const [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);
    const categoriesById = new Map(categories.map((category) => [category.id, category]));
    const groups = new Map<number, PortfolioGroup>();

    function getRootCategory(category: StoreCategory): StoreCategory {
      let current = categoriesById.get(category.id) ?? category;
      let remaining = categories.length + 1;

      while (current.parent && remaining > 0) {
        const parent = categoriesById.get(current.parent);
        if (!parent) break;
        current = parent;
        remaining -= 1;
      }

      return current;
    }

    for (const product of products) {
      const assigned = (product.categories ?? []).map(getRootCategory);
      const unique = [...new Map(assigned.map((category) => [category.id, category])).values()];
      const primary = unique.find((category) => category.slug !== "ofertas") ?? unique[0];
      const category = primary ?? {
        id: 0,
        name: "Otros productos",
        slug: "otros-productos",
        parent: 0,
      };
      const group = groups.get(category.id) ?? {
        name: category.name,
        slug: category.slug,
        products: [],
      };

      group.products.push(product);
      groups.set(category.id, group);
    }

    const orderedGroups = categories
      .filter((category) => category.parent === 0)
      .map((category) => groups.get(category.id))
      .filter((group): group is PortfolioGroup => Boolean(group));

    for (const group of groups.values()) {
      if (!orderedGroups.some((ordered) => ordered.slug === group.slug)) {
        orderedGroups.push(group);
      }
    }

    return orderedGroups;
  } catch {
    return [];
  }
}
