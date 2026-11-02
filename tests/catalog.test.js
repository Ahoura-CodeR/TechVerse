import { test } from "node:test";
import assert from "node:assert/strict";
import {
  screenType,
  screenDiagonal,
  uniqueValues,
  countValue,
  filterProducts,
  sortProducts,
  paginate,
  escapeHtml,
  FILTERS,
} from "../js/lib/catalog.js";

const products = [
  {
    id: 1,
    title: "Apple iPhone",
    brand: "Apple",
    price: 700,
    rating: 4.5,
    specifications: { display: "6.1 inch OLED", storage: "128 GB" },
  },
  {
    id: 2,
    title: "Samsung Galaxy",
    brand: "Samsung",
    price: 500,
    rating: 4.8,
    specifications: { display: "6.7 inch AMOLED", storage: "256 GB" },
  },
  {
    id: 3,
    title: "Apple Watch",
    brand: "Apple",
    price: 300,
    rating: 4.1,
    specifications: { storage: "128 GB" },
  },
];

test("screenType finds the most specific panel type", () => {
  assert.equal(screenType("6.1 inch OLED"), "OLED");
  assert.equal(screenType("6.7 inch AMOLED"), "AMOLED");
  assert.equal(screenType("27 inch Mini-LED"), "MINI-LED");
  assert.equal(screenType("no panel info"), null);
  assert.equal(screenType(undefined), null);
});

test("screenDiagonal reads the size in inches", () => {
  assert.equal(screenDiagonal("6.1 inch OLED"), "6.1 inch");
  assert.equal(screenDiagonal("14 Inch IPS"), "14 inch");
  assert.equal(screenDiagonal("OLED"), null);
});

test("uniqueValues skips empty values and sorts numerically", () => {
  assert.deepEqual(uniqueValues(products, FILTERS.storage.get), ["128 GB", "256 GB"]);
  assert.deepEqual(uniqueValues(products, FILTERS.screenType.get), ["AMOLED", "OLED"]);
});

test("countValue counts products per value", () => {
  assert.equal(countValue(products, FILTERS.brand.get, "Apple"), 2);
});

test("filterProducts: search is case-insensitive", () => {
  assert.deepEqual(
    filterProducts(products, { search: "  APPLE " }).map((p) => p.id),
    [1, 3],
  );
});

test("filterProducts: values in one filter are OR, different filters are AND", () => {
  const both = filterProducts(products, { selected: { brand: ["Apple", "Samsung"] } });
  assert.equal(both.length, 3);

  const narrowed = filterProducts(products, {
    selected: { brand: ["Apple", "Samsung"], storage: ["128 GB"] },
  });
  assert.deepEqual(
    narrowed.map((p) => p.id),
    [1, 3],
  );
});

test("filterProducts: a product missing the filtered field never matches", () => {
  const result = filterProducts(products, { selected: { screenType: ["OLED"] } });
  assert.deepEqual(
    result.map((p) => p.id),
    [1],
  );
});

test("sortProducts does not mutate the input", () => {
  const before = products.map((p) => p.id);
  assert.deepEqual(
    sortProducts(products, "Price: Low to High").map((p) => p.id),
    [3, 2, 1],
  );
  assert.deepEqual(
    sortProducts(products, "By rating").map((p) => p.id),
    [2, 1, 3],
  );
  assert.deepEqual(
    sortProducts(products, "By name").map((p) => p.id),
    [1, 3, 2],
  );
  assert.deepEqual(
    sortProducts(products, "").map((p) => p.id),
    before,
  );
  assert.deepEqual(
    products.map((p) => p.id),
    before,
  );
});

test("paginate clamps the page and reports the page count", () => {
  const items = Array.from({ length: 20 }, (_, i) => i);
  assert.deepEqual(paginate(items, 1, 9), { items: items.slice(0, 9), page: 1, pages: 3 });
  assert.equal(paginate(items, 3, 9).items.length, 2);
  assert.equal(paginate(items, 99, 9).page, 3);
  assert.equal(paginate(items, -4, 9).page, 1);
  assert.deepEqual(paginate([], 5, 9), { items: [], page: 1, pages: 0 });
});

test("escapeHtml neutralises markup", () => {
  assert.equal(
    escapeHtml('<img src="x" onerror=alert(1)>'),
    "&lt;img src=&quot;x&quot; onerror=alert(1)&gt;",
  );
  assert.equal(escapeHtml(null), "");
});
