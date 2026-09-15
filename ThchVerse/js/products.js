import { isFooter } from "./component/footer/footer.js";

import { productCategory } from "./component/products-box/products.js";

window.customElements.define("product-category", productCategory);

window.customElements.define("footer-site", isFooter);

async function getProducts() {
  try {
    const response = await fetch("/ThchVerse/Data/products.json");

    if (!response.ok) throw new Error("Products not found");

    const data = await response.json();

    return data.products || [];
  } catch (error) {
    console.log(error);

    return [];
  }
}

// -----------------------------
// PAGE LOADER
// -----------------------------

const container = document.querySelector(".container");

const pageLoader = document.querySelector(".page-loader");

container.style.display = "none";

window.addEventListener("load", () => {
  pageLoader.style.display = "none";

  container.style.display = "";
});

// -----------------------------
// CATEGORY
// -----------------------------

const categoryMap = {
  Cameras: "cameras",

  Phones: "phones",

  SmartWatches: "smartwatches",

  Headphones: "headphones",

  Computers: "computers",

  Gaming: "gaming",
};

const params = new URLSearchParams(window.location.search);

const category = params.get("category");

const selectedCategory = categoryMap[category];

// -----------------------------
// STATE
// -----------------------------

const state = {
  products: [],

  filteredProducts: [],

  currentPage: 1,

  itemsPerPage: 9,

  search: "",

  sort: "",
};

// -----------------------------
// ELEMENTS
// -----------------------------

const productComponent = document.querySelector("product-category");

const pagination = document.querySelector(".pagination");

const pages = document.querySelector(".pages");

const next = document.querySelector(".next");

const previous = document.querySelector(".previous");

const searchInput = document.querySelector(".input-search");

const sortSelect = document.querySelector(".sort-products");

// -----------------------------
// FILTER
// -----------------------------

function applyFilters() {
  let result = [...state.products];

  // category

  if (selectedCategory) {
    result = result.filter(
      (item) => item.category.toLowerCase() === selectedCategory,
    );
  }

  // search

  if (state.search) {
    result = result.filter((item) =>
      item.title.toLowerCase().includes(state.search),
    );
  }

  // sort

  switch (state.sort) {
    case "By rating":
      result.sort((a, b) => b.rating - a.rating);

      break;

    case "Price: Low to High":
      result.sort((a, b) => a.price - b.price);

      break;

    case "Price: High to Low":
      result.sort((a, b) => b.price - a.price);

      break;

    case "By name":
      result.sort((a, b) => a.title.localeCompare(b.title));

      break;
  }

  state.filteredProducts = result;

  state.currentPage = 1;

  render();
}

// -----------------------------
// PAGINATION
// -----------------------------

function totalPages() {
  return Math.ceil(state.filteredProducts.length / state.itemsPerPage);
}

function getCurrentProducts() {
  const start = (state.currentPage - 1) * state.itemsPerPage;

  const end = start + state.itemsPerPage;

  return state.filteredProducts.slice(start, end);
}

function renderPagination() {
  pages.innerHTML = "";

  const total = totalPages();

  for (let i = 1; i <= total; i++) {
    const button = document.createElement("button");

    button.className = "pagination-page";

    button.textContent = i;

    button.dataset.page = i;

    if (i === state.currentPage) button.classList.add("active");

    pages.appendChild(button);
  }
}

// -----------------------------
// RENDER
// -----------------------------

function render() {
  productComponent.setProducts(getCurrentProducts());

  renderPagination();
}

// -----------------------------
// EVENTS
// -----------------------------

searchInput.addEventListener("input", () => {
  state.search = searchInput.value.trim().toLowerCase();

  applyFilters();
});

sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;

  applyFilters();
});

pagination.addEventListener("click", (event) => {
  const page = event.target.closest(".pagination-page");

  if (page) {
    state.currentPage = Number(page.dataset.page);

    render();
  }

  if (event.target.closest(".next")) {
    if (state.currentPage < totalPages()) {
      state.currentPage++;

      render();
    }
  }

  if (event.target.closest(".previous")) {
    if (state.currentPage > 1) {
      state.currentPage--;

      render();
    }
  }
});

// -----------------------------
// START
// -----------------------------

async function init() {
  state.products = await getProducts();

  state.filteredProducts = [...state.products];

  render();
}

init();
