const template = document.createElement("template");

template.innerHTML = `

<link rel="stylesheet" href="/ThchVerse/js/component/products-box/products.css">


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

async function getProducts() {
  try {
    const response = await fetch("/ThchVerse/Data/products.json");

    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }

    const data = await response.json();

    return data.products || [];
  } catch (error) {
    console.log(error);

    return [];
  }
}

class productCategory extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.state = {
      products: [],

      filteredProducts: [],

      currentPage: 1,

      itemsPerPage: 9,

      search: "",

      sort: "",

      filters: {
        brand: [],

        battery: [],

        screenType: [],

        screenDiagonal: [],

        protection: [],

        storage: [],
      },
    };
  }

  async connectedCallback() {
    this.cache();

    this.events();

    this.showLoader();

    this.state.products = await getProducts();

    this.state.filteredProducts = [...this.state.products];

    this.renderFilterOptions();

    this.hideLoader();

    this.render();
  }

  /* =====================================================
     CACHE
  ===================================================== */

  cache() {
    this.grid = this.shadowRoot.querySelector(".products-grid");

    this.loader = this.shadowRoot.querySelector(".product-loader");

    this.noProducts = this.shadowRoot.querySelector(".no-products");

    this.previous = this.shadowRoot.querySelector(".previous");

    this.next = this.shadowRoot.querySelector(".next");

    this.currentPageElement = this.shadowRoot.querySelector(".current-page");

    this.totalPagesElement = this.shadowRoot.querySelector(".total-pages");

    /*
      Outside Shadow DOM
    */

    this.searchInput = document.querySelector(".input-search");

    this.sortSelect = document.querySelector(".sort-products");

    this.filterSections = [...document.querySelectorAll(".filter-section")];
  }

  /* =====================================================
     EVENTS
  ===================================================== */

  events() {
    /*
      Product search
    */

    if (this.searchInput) {
      this.searchInput.addEventListener("input", () => {
        this.state.search = this.searchInput.value.trim().toLowerCase();

        this.state.currentPage = 1;

        this.filter();
      });
    }

    /*
      Sort
    */

    if (this.sortSelect) {
      this.sortSelect.addEventListener("change", () => {
        this.state.sort = this.sortSelect.value;

        this.state.currentPage = 1;

        this.filter();
      });
    }

    /*
      Shadow DOM events
    */

    this.shadowRoot.addEventListener("click", (event) => {
      /*
          Previous
        */

      if (event.target.closest(".previous")) {
        if (this.state.currentPage > 1) {
          this.state.currentPage--;

          this.render();
        }

        return;
      }

      /*
          Next
        */

      if (event.target.closest(".next")) {
        if (this.state.currentPage < this.totalPages()) {
          this.state.currentPage++;

          this.render();
        }

        return;
      }

      /*
          Reset
        */

      const reset = event.target.closest(".reset-search");

      if (reset) {
        this.resetFilters();

        return;
      }

      /*
          Product
        */

      const product = event.target.closest(".product-button");

      if (product) {
        location.href = `/ThchVerse/pages/products-details.html?id=${product.dataset.id}`;
      }
    });

    /*
      Sidebar events
    */

    document.addEventListener("click", (event) => {
      /*
          Accordion
        */

      const heading = event.target.closest(".filter-heading");

      if (heading) {
        const section = heading.closest(".filter-section");

        if (section) {
          this.toggleFilterSection(section);
        }
      }

      /*
          Checkbox
        */

      const checkbox = event.target.closest(".filter-option-input");

      if (checkbox) {
        this.handleFilterChange(checkbox);
      }
    });
  }

  /* =====================================================
     FILTER DEFINITIONS
  ===================================================== */

  getFilterDefinitions() {
    return {
      brand: {
        label: "Brand",

        getValue: (item) => item.brand,
      },

      battery: {
        label: "Battery capacity",

        getValue: (item) => item.specifications?.battery,
      },

      screenType: {
        label: "Screen type",

        getValue: (item) =>
          this.extractScreenType(item.specifications?.display),
      },

      screenDiagonal: {
        label: "Screen diagonal",

        getValue: (item) =>
          this.extractScreenDiagonal(item.specifications?.display),
      },

      protection: {
        label: "Protection class",

        getValue: (item) => item.specifications?.protection,
      },

      storage: {
        label: "Built-in memory",

        getValue: (item) => item.specifications?.storage,
      },
    };
  }

  /* =====================================================
     SCREEN TYPE
  ===================================================== */

  extractScreenType(display) {
    if (!display) {
      return null;
    }

    const normalized = String(display).toLowerCase();

    const types = [
      "mini-led",
      "micro-led",
      "amoled",
      "oled",
      "ips",
      "lcd",
      "led",
      "tn",
      "va",
    ];

    const found = types.find((type) => normalized.includes(type));

    return found ? found.toUpperCase() : null;
  }

  /* =====================================================
     SCREEN DIAGONAL
  ===================================================== */

  extractScreenDiagonal(display) {
    if (!display) {
      return null;
    }

    const match = String(display).match(/(\d+(?:\.\d+)?)\s*inch/i);

    return match ? `${match[1]} inch` : null;
  }

  /* =====================================================
     RENDER FILTER OPTIONS
  ===================================================== */

  renderFilterOptions() {
    const definitions = this.getFilterDefinitions();

    this.filterSections.forEach((section) => {
      const heading = section.querySelector(".filter-heading span");

      if (!heading) {
        return;
      }

      const definition = Object.entries(definitions).find(
        ([, config]) => config.label === heading.textContent.trim(),
      );

      if (!definition) {
        return;
      }

      const [filterKey, config] = definition;

      /*
          Brand uses .brand-list
        */

      const optionsBox =
        filterKey === "brand"
          ? section.querySelector(".brand-list")
          : section.querySelector(".filter-options");

      if (!optionsBox) {
        return;
      }

      optionsBox.dataset.filter = filterKey;

      optionsBox.innerHTML = "";

      const values = this.getUniqueFilterValues(config.getValue);

      values.forEach((value) => {
        const label = document.createElement("label");

        label.className = "filter-option";

        label.innerHTML = `

              <input
                type="checkbox"
                class="filter-option-input"
                data-filter="${filterKey}"
                value="${this.escapeAttribute(value)}"
              >

              <span>
                ${value}
              </span>

              <small>
                ${this.getFilterCount(config.getValue, value)}
              </small>

            `;

        optionsBox.appendChild(label);
      });
    });
  }

  /* =====================================================
     UNIQUE VALUES
  ===================================================== */

  getUniqueFilterValues(getValue) {
    const values = new Set();

    this.state.products.forEach((item) => {
      const value = getValue(item);

      if (
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ""
      ) {
        values.add(String(value));
      }
    });

    return [...values].sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
      }),
    );
  }

  /* =====================================================
     FILTER COUNT
  ===================================================== */

  getFilterCount(getValue, value) {
    return this.state.products.filter(
      (item) => String(getValue(item)) === String(value),
    ).length;
  }

  /* =====================================================
     FILTER CHANGE
  ===================================================== */

  handleFilterChange(checkbox) {
    const filter = checkbox.dataset.filter;

    if (!this.state.filters[filter]) {
      return;
    }

    const value = checkbox.value;

    if (checkbox.checked) {
      if (!this.state.filters[filter].includes(value)) {
        this.state.filters[filter].push(value);
      }
    } else {
      this.state.filters[filter] = this.state.filters[filter].filter(
        (item) => item !== value,
      );
    }

    this.state.currentPage = 1;

    this.filter();
  }

  /* =====================================================
     APPLY FILTERS
  ===================================================== */

  applyFilters(result) {
    const definitions = this.getFilterDefinitions();

    Object.entries(this.state.filters).forEach(
      ([filterKey, selectedValues]) => {
        if (selectedValues.length === 0) {
          return;
        }

        const definition = definitions[filterKey];

        if (!definition) {
          return;
        }

        result = result.filter((item) => {
          const value = definition.getValue(item);

          if (value === null || value === undefined) {
            return false;
          }

          return selectedValues.includes(String(value));
        });
      },
    );

    return result;
  }

  /* =====================================================
     MAIN FILTER
  ===================================================== */

  filter() {
    let result = [...this.state.products];

    /*
      Search
    */

    if (this.state.search) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(this.state.search),
      );
    }

    /*
      Sidebar filters
    */

    result = this.applyFilters(result);

    /*
      Sort
    */

    switch (this.state.sort) {
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

    this.state.filteredProducts = result;

    this.render();
  }

  /* =====================================================
     TOTAL PAGES
  ===================================================== */

  totalPages() {
    return Math.ceil(
      this.state.filteredProducts.length / this.state.itemsPerPage,
    );
  }

  /* =====================================================
     RENDER
  ===================================================== */

  render() {
    const totalPages = this.totalPages();

    if (totalPages > 0 && this.state.currentPage > totalPages) {
      this.state.currentPage = totalPages;
    }

    if (totalPages === 0) {
      this.state.currentPage = 1;
    }

    const start = (this.state.currentPage - 1) * this.state.itemsPerPage;

    const products = this.state.filteredProducts.slice(
      start,
      start + this.state.itemsPerPage,
    );

    this.renderProducts(products);

    this.renderPagination();

    this.noProducts.classList.toggle(
      "show",
      this.state.filteredProducts.length === 0,
    );
  }

  /* =====================================================
     RENDER PRODUCTS
  ===================================================== */

  renderProducts(products) {
    this.grid.innerHTML = "";

    const fragment = document.createDocumentFragment();

    products.forEach((item) => {
      const card = document.createElement("article");

      card.className = "product-card";

      card.innerHTML = `

          <div class="product-image-wrapper">

            <button
              class="wishlist-btn"
              type="button"
              aria-label="Add ${this.escapeAttribute(item.title)} to wishlist"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >

                <path
                  d="M20.8 4.6
                  C18.4 2.2 14.7 2.5 12 5.4
                  C9.3 2.5 5.6 2.2 3.2 4.6
                  C0.2 7.7 1 12.7 12 21
                  C23 12.7 23.8 7.7 20.8 4.6Z"
                />

              </svg>

            </button>


            <img
              class="product-image"
              src="${this.escapeAttribute(item.images?.[0] || "")}"
              alt="${this.escapeAttribute(item.title)}"
              loading="lazy"
            >

          </div>


          <div class="product-info">

            <span class="category">
              ${item.category || ""}
            </span>


            <h3>
              ${item.title || ""}
            </h3>


            <p>
              ${item.description || ""}
            </p>


            <div class="meta">

              <span class="rating">
                ★ ${item.rating ?? ""}
              </span>


              <strong>
                $${item.price ?? ""}
              </strong>

            </div>


            <button
              class="view-product product-button"
              type="button"
              data-id="${this.escapeAttribute(item.id)}"
            >
              View Product
            </button>

          </div>

        `;

      fragment.appendChild(card);
    });

    this.grid.appendChild(fragment);
  }

  /* =====================================================
     PAGINATION
  ===================================================== */

  renderPagination() {
    const totalPages = this.totalPages();

    this.currentPageElement.textContent = this.state.currentPage;

    this.totalPagesElement.textContent = totalPages;

    const shouldShow = totalPages > 1;

    this.shadowRoot
      .querySelector(".pagination")
      .classList.toggle("hidden", !shouldShow);

    this.previous.disabled = this.state.currentPage <= 1;

    this.next.disabled = this.state.currentPage >= totalPages;
  }

  /* =====================================================
     ACCORDION
  ===================================================== */

  toggleFilterSection(section) {
    const options = section.querySelector(".filter-options");

    /*
      Brand has .brand-list
    */

    const content = options || section.querySelector(".brand-list");

    if (!content) {
      return;
    }

    const isOpen = section.classList.contains("open");

    this.filterSections.forEach((item) => {
      item.classList.remove("open");
    });

    if (!isOpen) {
      section.classList.add("open");
    }
  }

  /* =====================================================
     RESET
  ===================================================== */

  resetFilters() {
    if (this.searchInput) {
      this.searchInput.value = "";
    }

    if (this.sortSelect) {
      this.sortSelect.selectedIndex = 0;
    }

    this.state.search = "";

    this.state.sort = "";

    this.state.currentPage = 1;

    Object.keys(this.state.filters).forEach((key) => {
      this.state.filters[key] = [];
    });

    document.querySelectorAll(".filter-option-input").forEach((checkbox) => {
      checkbox.checked = false;
    });

    this.state.filteredProducts = [...this.state.products];

    this.render();
  }

  /* =====================================================
     ESCAPE
  ===================================================== */

  escapeAttribute(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  /* =====================================================
     LOADER
  ===================================================== */

  showLoader() {
    this.loader.classList.add("show");
  }

  hideLoader() {
    this.loader.classList.remove("show");
  }
}

export { productCategory, getProducts };
