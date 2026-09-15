const template = document.createElement("template");

template.innerHTML = `

<link rel="stylesheet" href="/ThchVerse/css/variables.css">

<link rel="stylesheet" href="/ThchVerse/css/global.css">

<link rel="stylesheet" href="/ThchVerse/css/animations.css">

<link rel="stylesheet" href="/ThchVerse/js/component/products-box/products.css">



<div class="products-wrapper">


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

            LOADING PRODUCTS

            <span class="dots">

                ...

            </span>

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



        <button class="reset-search">

            Clear Search

        </button>


    </div>


</div>

`;

class productCategory extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.products = [];
  }

  connectedCallback() {
    this.cacheElements();

    this.events();
  }

  cacheElements() {
    this.grid = this.shadowRoot.querySelector(".products-grid");

    this.loader = this.shadowRoot.querySelector(".product-loader");

    this.noProducts = this.shadowRoot.querySelector(".no-products");
  }

  setProducts(products) {
    this.products = products;

    this.renderProducts(products);
  }

  showLoader() {
    this.loader.classList.add("show");
  }

  hideLoader() {
    this.loader.classList.remove("show");
  }

  renderProducts(products) {
    this.grid.innerHTML = "";

    if (!products.length) {
      this.noProducts.classList.add("show");

      return;
    }

    this.noProducts.classList.remove("show");

    const fragment = document.createDocumentFragment();

    products.forEach((product) => {
      const card = document.createElement("article");

      card.className = "product-card";

      card.innerHTML = `



<div class="product-image-wrapper">


<button 
class="wishlist-btn"
aria-label="wishlist">


<svg viewBox="0 0 24 24">


<path d="
M20.8 4.6
C18.4 2.2 14.7 2.5 12 5.4
C9.3 2.5 5.6 2.2 3.2 4.6
C0.2 7.7 1 12.7 12 21
C23 12.7 23.8 7.7 20.8 4.6Z"/>


</svg>


</button>




<img

src="${product.images[0]}"

alt="${product.title}"

loading="lazy"


>


</div>





<h3>

${product.title}

</h3>





<div class="rating">


★ ${product.rating}


</div>





<strong>


$${product.price}


</strong>






<button

class="product-button"

data-id="${product.id}"

>


View Product


</button>



`;

      fragment.appendChild(card);
    });

    this.grid.appendChild(fragment);
  }

  events() {
    this.shadowRoot.addEventListener("click", (event) => {
      const button = event.target.closest(".product-button");

      if (button) {
        const id = button.dataset.id;

        window.location.href = `/ThchVerse/pages/products-details.html?id=${id}`;
      }

      const wishlist = event.target.closest(".wishlist-btn");

      if (wishlist) {
        wishlist.classList.toggle("active");
      }
    });
  }
}

export { productCategory };
