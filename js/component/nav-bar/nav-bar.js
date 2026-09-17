import { getProducts } from "./component/product/product.js";
let template = document.createElement("template");

let eventSvgHandler = (page) => {
  window.location.href = `pages/${page}`;
};

template.innerHTML = `
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<link rel="stylesheet" href="js/component/nav-bar/nav-bar.css">
</head>
<nav class="nav-container">

    <!-- BRAND -->
    <div class="brand-section">

        <div class="brand-core">
            TV
        </div>


        <div class="brand-info">

            <strong>
                TECH<span>VERSE</span>
            </strong>

            <small>
                DIGITAL STORE
            </small>

        </div>

    </div>



    <!-- SEARCH -->

    <div class="search-box">


        <svg 
            class="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
        >

            <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                stroke-width="1.5"
            />

            <path
                d="M20 20L16 16"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
            />

        </svg>


        <input 
            class="input-nav"
            placeholder="Search products..."
        >
        
        <div class="search-result-box">

    <div class="search-results"></div>


    <div class="no-result">

        <h3>
            No Products Found
        </h3>

        <p>
            Try another keyword
        </p>

    </div>


    <button class="show-more-search">
        Show More
    </button>


</div>


    </div>




    <!-- LINKS -->

    <ul class="nav-links">


        <li>
            <a href="index.html">
                Home
            </a>
        </li>


        <li>
            <a href="pages/products.html">
                Products
            </a>
        </li>


        <li>
            <a href="pages/card.html">
                Store
            </a>
        </li>


        <li>
            <a href="pages/profile.html">
                Account
            </a>
        </li>
        
        <li>
            <a href="pages/login.html">
                Login
            </a>
        </li>

    </ul>




    <!-- ACTIONS -->

    <div class="nav-actions">


        <button class="nav-action favorite">

            <svg viewBox="0 0 24 24">

                <path 
                d="M20.8 4.6C19 2.7 16 2.8 14.3 4.7L12 7.2L9.7 4.7C8 2.8 5 2.7 3.2 4.6C1 7 2 10.5 4 12.8L12 21L20 12.8C22 10.5 23 7 20.8 4.6Z"
                />

            </svg>


        </button>



        <button class="nav-action cart"
        onclick="eventSvgHandler('card.html')">


            <svg viewBox="0 0 24 24">

                <path
                d="M3 4H5L7 17H20L22 7H7"
                />

                <circle cx="9" cy="21" r="1"/>
                <circle cx="18" cy="21" r="1"/>


            </svg>


        </button>




        <button class="nav-action profile"
        onclick="eventSvgHandler('profile.html')">


            <svg viewBox="0 0 24 24">

                <circle 
                cx="12"
                cy="8"
                r="4"
                />

                <path
                d="M4 22C4 17 8 15 12 15C16 15 20 17 20 22"
                />


            </svg>


        </button>


    </div>


</nav>
  `;

class isNav extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.state = {
      products: [],

      results: [],

      searchValue: "",

      visibleCount: 10,
    };
  }

  async connectedCallback() {
    const favIcon = this.shadowRoot.querySelector(".favorite");

    const buyIcon = this.shadowRoot.querySelector(".cart");

    const profileIcon = this.shadowRoot.querySelector(".profile");

    const input = this.shadowRoot.querySelector(".input-nav");

    const showMore = this.shadowRoot.querySelector(".show-more-search");

    await this.loadProducts();

    buyIcon?.addEventListener("click", () => eventSvgHandler("card.html"));

    profileIcon?.addEventListener("click", () =>
      eventSvgHandler("profile.html"),
    );

    favIcon?.addEventListener("click", () => {
      favIcon.classList.toggle("liked");
    });

    input.addEventListener("input", () => {
      this.state.searchValue = input.value.trim().toLowerCase();

      this.state.visibleCount = 10;

      this.searchProducts();
    });

    showMore.addEventListener("click", () => {
      this.state.visibleCount += 10;

      this.renderSearch();
    });

    this.shadowRoot
      .querySelector(".search-results")
      .addEventListener("click", (event) => {
        const button = event.target.closest(".search-product-btn");

        if (button) {
          location.href = `pages/products-details.html?id=${button.dataset.id}`;
        }
      });
  }

  async loadProducts() {
    this.state.products = await getProducts();
  }

  searchProducts() {
    const value = this.state.searchValue;

    const box = this.shadowRoot.querySelector(".search-result-box");

    if (!value) {
      box.classList.remove("show");

      return;
    }

    this.state.results = this.state.products.filter((product) => {
      return (
        product.title.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value)
      );
    });

    this.renderSearch();
  }

  renderSearch() {
    const box = this.shadowRoot.querySelector(".search-result-box");

    const container = this.shadowRoot.querySelector(".search-results");

    const noResult = this.shadowRoot.querySelector(".no-result");

    const showMore = this.shadowRoot.querySelector(".show-more-search");

    container.innerHTML = "";

    if (this.state.results.length === 0) {
      noResult.classList.add("show");

      showMore.classList.remove("show");

      box.classList.add("show");

      return;
    }

    noResult.classList.remove("show");

    const products = this.state.results.slice(0, this.state.visibleCount);

    products.forEach((product) => {
      const div = document.createElement("div");

      div.className = "search-product";

      div.innerHTML = `

            <img 
            src="${product.images[0]}"
            >


            <div class="search-product-info">

                <h4>
                ${product.title}
                </h4>


                <span>
                $${product.price}
                </span>

            </div>



            <button
            class="search-product-btn"
            data-id="${product.id}"
            >

            View

            </button>


        `;

      container.appendChild(div);
    });

    if (this.state.visibleCount < this.state.results.length) {
      showMore.classList.add("show");
    } else {
      showMore.classList.remove("show");
    }

    box.classList.add("show");
  }
}

export { isNav };
