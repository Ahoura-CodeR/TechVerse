import { getProducts } from "../../lib/products-api.js";
import {
  FILTERS,
  filterProducts,
  sortProducts,
  paginate,
  uniqueValues,
  countValue,
  escapeHtml,
} from "../../lib/catalog.js";

const template = document.createElement("template");

template.innerHTML = `

<link rel="stylesheet" href="js/component/products-box/products.css">

<div class="product-loader">

  <div class="cyber-loader">

    <div class="loader-ring ring-one"></div>
    <div class="loader-ring ring-two"></div>
    <div class="loader-ring ring-three"></div>

    <div class="loader-core">
      TV
    </div>

  </div>

  <div class="loader-text">
    LOADING PRODUCTS...
  </div>

</div>

<div class="products-grid"></div>

<div class="no-products">

  <h2>
    No Products Found
  </h2>

  <p>
    Try another search
  </p>

  <button
    class="reset-search"
    type="button"
  >
    Clear Search
  </button>

</div>

<nav
  class="pagination"
  aria-label="Products pagination"
>

  <button
    class="page-arrow previous"
    type="button"
    aria-label="Previous page"
  >
    ‹
  </button>

  <span class="page-counter">

    <span class="current-page">
      1
    </span>

    <span class="page-divider">
      /
    </span>

    <span class="total-pages">
      1
    </span>

  </span>

  <button
    class="page-arrow next"
    type="button"
    aria-label="Next page"
  >
    ›
  </button>

</nav>

`;

const ITEMS_PER_PAGE = 9;

const CATEGORY_LABELS = { phones: "Smartphones" };

function categoryLabel(category) {
  if (!category) return "All products";
  return CATEGORY_LABELS[category.toLowerCase()] ?? category[0].toUpperCase() + category.slice(1);
}

class ProductCategory extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.state = {
      products: [], // every product in the current category
      visible: [], // after search, filters and sorting
      page: 1,
      search: "",
      sort: "",
      selected: Object.fromEntries(Object.keys(FILTERS).map((key) => [key, []])),
    };
  }

  async connectedCallback() {
    this.abort = new AbortController();
    this.cacheElements();
    this.bindEvents();
    this.loader.classList.add("show");

    const category = new URLSearchParams(location.search).get("category");
    const all = await getProducts();

    this.state.products = category
      ? all.filter((product) => product.category.toLowerCase() === category.toLowerCase())
      : all;
    this.showCategory(category);
    this.renderFilterOptions();
    this.loader.classList.remove("show");
    this.update();
  }

  disconnectedCallback() {
    this.abort.abort();
  }

  cacheElements() {
    const root = this.shadowRoot;
    this.grid = root.querySelector(".products-grid");
    this.loader = root.querySelector(".product-loader");
    this.emptyState = root.querySelector(".no-products");
    this.pagination = root.querySelector(".pagination");
    this.previousButton = root.querySelector(".previous");
    this.nextButton = root.querySelector(".next");
    this.currentPageLabel = root.querySelector(".current-page");
    this.totalPagesLabel = root.querySelector(".total-pages");

    // These live in the page, outside the shadow root.
    this.searchInput = document.querySelector(".input-search");
    this.sortSelect = document.querySelector(".sort-products");
    this.filterSections = [...document.querySelectorAll(".filter-section")];
    this.countLabel = document.querySelector(".products-top strong");
    this.breadcrumbLabel = document.querySelector(".breadcrumb span");
  }

  bindEvents() {
    const { signal } = this.abort;
    this.searchInput?.addEventListener(
      "input",
      () => {
        this.state.search = this.searchInput.value;
        this.update({ resetPage: true });
      },
      { signal },
    );

    this.sortSelect?.addEventListener(
      "change",
      () => {
        this.state.sort = this.sortSelect.value;
        this.update({ resetPage: true });
      },
      { signal },
    );

    this.shadowRoot.addEventListener(
      "click",
      (event) => {
        if (event.target.closest(".previous")) return this.goToPage(this.state.page - 1);
        if (event.target.closest(".next")) return this.goToPage(this.state.page + 1);
        if (event.target.closest(".reset-search")) return this.reset();

        const button = event.target.closest(".product-button");
        if (button) location.href = `pages/products-details.html?id=${button.dataset.id}`;
      },
      { signal },
    );

    // The sidebar is part of the page, so its clicks are handled on the document.
    document.addEventListener(
      "click",
      (event) => {
        const heading = event.target.closest(".filter-heading");
        if (heading) this.toggleSection(heading.closest(".filter-section"));

        const checkbox = event.target.closest(".filter-option-input");
        if (checkbox) this.toggleFilterValue(checkbox);
      },
      { signal },
    );
  }

  showCategory(category) {
    const label = categoryLabel(category);
    if (this.breadcrumbLabel) this.breadcrumbLabel.textContent = label;
    document.title = `${label} | TechVerse`;
  }

  // ---- state -> screen ----
  update({ resetPage = false } = {}) {
    const { products, search, selected, sort } = this.state;
    if (resetPage) this.state.page = 1;
    this.state.visible = sortProducts(filterProducts(products, { search, selected }), sort);
    this.render();
  }

  goToPage(page) {
    this.state.page = page;
    this.render();
  }

  render() {
    const { items, page, pages } = paginate(this.state.visible, this.state.page, ITEMS_PER_PAGE);
    this.state.page = page;
    this.renderCards(items);
    this.currentPageLabel.textContent = page;
    this.totalPagesLabel.textContent = pages;
    this.pagination.classList.toggle("hidden", pages <= 1);
    this.previousButton.disabled = page <= 1;
    this.nextButton.disabled = page >= pages;
    this.emptyState.classList.toggle("show", this.state.visible.length === 0);
    if (this.countLabel) this.countLabel.textContent = this.state.visible.length;
  }

  renderCards(products) {
    this.grid.innerHTML = products.map(cardTemplate).join("");
  }

  // ---- sidebar filters ----
  renderFilterOptions() {
    for (const section of this.filterSections) {
      const key = section.dataset.filter;
      const filter = FILTERS[key];
      const list = section.querySelector(".brand-list, .filter-options");
      if (!filter || !list) continue;
      const values = uniqueValues(this.state.products, filter.get);

      // A category can lack a spec entirely (for example battery on a monitor).
      section.style.display = values.length ? "" : "none";
      list.innerHTML = values
        .map(
          (value) => `
            <label class="filter-option">
              <input type="checkbox" class="filter-option-input" data-filter="${key}" value="${escapeHtml(value)}">
              <span>${escapeHtml(value)}</span>
              <small>${countValue(this.state.products, filter.get, value)}</small>
            </label>`,
        )
        .join("");
    }
  }

  toggleFilterValue(checkbox) {
    const key = checkbox.dataset.filter;
    if (!(key in this.state.selected)) return;
    const values = this.state.selected[key];
    this.state.selected[key] = checkbox.checked
      ? [...values, checkbox.value]
      : values.filter((value) => value !== checkbox.value);

    this.update({ resetPage: true });
  }

  toggleSection(section) {
    if (!section) return;
    const wasOpen = section.classList.contains("open");
    this.filterSections.forEach((item) => item.classList.remove("open"));
    section.classList.toggle("open", !wasOpen);
  }

  reset() {
    if (this.searchInput) this.searchInput.value = "";
    if (this.sortSelect) this.sortSelect.selectedIndex = 0;
    document.querySelectorAll(".filter-option-input").forEach((box) => (box.checked = false));

    Object.assign(this.state, { search: "", sort: "" });
    Object.keys(this.state.selected).forEach((key) => (this.state.selected[key] = []));
    this.update({ resetPage: true });
  }
}

function cardTemplate(product) {
  const title = escapeHtml(product.title);

  return `
    <article class="product-card">
      <div class="product-image-wrapper">
        <button class="wishlist-btn" type="button" aria-label="Add ${title} to wishlist">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20.8 4.6C18.4 2.2 14.7 2.5 12 5.4 9.3 2.5 5.6 2.2 3.2 4.6 0.2 7.7 1 12.7 12 21 23 12.7 23.8 7.7 20.8 4.6Z" />
          </svg>
        </button>
        <img class="product-image" src="${escapeHtml(product.images?.[0])}" alt="${title}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="category">${escapeHtml(product.category)}</span>
        <h3>${title}</h3>
        <p>${escapeHtml(product.description)}</p>
        <div class="meta">
          <span class="rating">★ ${escapeHtml(product.rating)}</span>
          <strong>$${escapeHtml(product.price)}</strong>
        </div>
        <button class="view-product product-button" type="button" data-id="${escapeHtml(product.id)}">View Product</button>
      </div>
    </article>`;
}

export { ProductCategory };
