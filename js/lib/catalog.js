// Pure catalog logic: no DOM access, so it can be tested with `npm test`.

const SCREEN_TYPES = ["mini-led", "micro-led", "amoled", "oled", "ips", "lcd", "led", "tn", "va"];

export function screenType(display) {
  if (!display) return null;
  const text = String(display).toLowerCase();
  const found = SCREEN_TYPES.find((type) => text.includes(type));
  return found ? found.toUpperCase() : null;
}

export function screenDiagonal(display) {
  if (!display) return null;
  const match = String(display).match(/(\d+(?:\.\d+)?)\s*inch/i);
  return match ? `${match[1]} inch` : null;
}

// One entry per sidebar filter. `get` reads the value a product is filtered by.
export const FILTERS = {
  brand: { label: "Brand", get: (p) => p.brand },
  battery: { label: "Battery capacity", get: (p) => p.specifications?.battery },
  screenType: { label: "Screen type", get: (p) => screenType(p.specifications?.display) },
  screenDiagonal: {
    label: "Screen diagonal",
    get: (p) => screenDiagonal(p.specifications?.display),
  },
  protection: { label: "Protection class", get: (p) => p.specifications?.protection },
  storage: { label: "Built-in memory", get: (p) => p.specifications?.storage },
};

const hasValue = (value) => value !== null && value !== undefined && String(value).trim() !== "";

export function uniqueValues(products, get) {
  const values = new Set();
  for (const product of products) {
    const value = get(product);
    if (hasValue(value)) values.add(String(value));
  }
  return [...values].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function countValue(products, get, value) {
  return products.filter((product) => String(get(product)) === String(value)).length;
}

// `selected` maps a filter key to the checked values, e.g. { brand: ["Apple"] }.
// Different filters combine with AND, values inside one filter with OR.
export function filterProducts(products, { search = "", selected = {} } = {}) {
  const query = search.trim().toLowerCase();

  return products.filter((product) => {
    if (query && !product.title.toLowerCase().includes(query)) return false;
    return Object.entries(selected).every(([key, values]) => {
      if (!values.length || !FILTERS[key]) return true;
      const value = FILTERS[key].get(product);
      return hasValue(value) && values.includes(String(value));
    });
  });
}

const SORTERS = {
  "By rating": (a, b) => b.rating - a.rating,
  "Price: Low to High": (a, b) => a.price - b.price,
  "Price: High to Low": (a, b) => b.price - a.price,
  "By name": (a, b) => a.title.localeCompare(b.title),
};

export function sortProducts(products, sort) {
  const compare = SORTERS[sort];
  return compare ? [...products].sort(compare) : [...products];
}

export function pageCount(total, perPage) {
  return Math.ceil(total / perPage);
}

// Returns the slice for `page` and the page number clamped to a valid range.
export function paginate(items, page, perPage) {
  const pages = pageCount(items.length, perPage);
  const current = pages === 0 ? 1 : Math.min(Math.max(page, 1), pages);
  const start = (current - 1) * perPage;
  return { items: items.slice(start, start + perPage), page: current, pages };
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
