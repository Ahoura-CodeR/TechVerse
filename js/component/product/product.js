const template = document.createElement("template");

template.innerHTML = `


<link rel="stylesheet" href="../../../css/variables.css">
<link rel="stylesheet" href="../../../css/global.css">
<link rel="stylesheet" href="../../../css/animations.css">
<link rel="stylesheet" href="../../../js/component/product/product.css">



<section class="product-wrapper">


<div class="loader-container">


<div class="cyber-loader">

<div class="loader-ring ring-one"></div>
<div class="loader-ring ring-two"></div>
<div class="loader-ring ring-three"></div>


<div class="loader-core">
TV
</div>


</div>



<div class="loader-text">

INITIALIZING PRODUCTS
<span class="dots">...</span>

</div>


</div>





<div class="product-container">

</div>





<nav class="pagination">


<button class="pagination-arrow previous">

<svg viewBox="0 0 24 24">
<path d="M15 18L9 12L15 6"/>
</svg>

</button>




<div class="page-number"></div>





<button class="pagination-arrow next">

<svg viewBox="0 0 24 24">
<path d="M9 18L15 12L9 6"/>
</svg>


</button>



</nav>



</section>

`;

let getProducts = async () => {
  try {
    const response = await fetch("/Data/products.json");

    if (!response.ok) throw new Error("Products not found");

    const data = await response.json();

    return data.products || [];
  } catch (error) {
    console.log(error);

    return [];
  }
};

class isProducts extends HTMLElement {
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

      itemsPerPage: 12,
    };
  }

  async connectedCallback() {
    const loader = this.shadowRoot.querySelector(".loader-container");

    loader.classList.add("show");

    this.state.products = await getProducts();

    this.state.filteredProducts = this.state.products;

    this.totalPages = Math.ceil(
      this.state.filteredProducts.length / this.state.itemsPerPage,
    );

    this.renderProducts();

    this.renderPagination();

    this.setupEvents();

    loader.classList.remove("show");
  }

  renderProducts() {
    const container = this.shadowRoot.querySelector(".product-container");

    container.innerHTML = "";

    const start = (this.state.currentPage - 1) * this.state.itemsPerPage;

    const end = start + this.state.itemsPerPage;

    const products = this.state.filteredProducts.slice(start, end);

    const fragment = document.createDocumentFragment();

    products.forEach((product) => {
      fragment.appendChild(this.createCard(product));
    });

    container.appendChild(fragment);
  }

  createCard(product) {
    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `


<div class="product-image-box">


<button class="wishlist-btn">


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
loading="lazy">


</div>



<div class="product-info">


<span class="product-category">

${product.category || "Technology"}

</span>



<h3>
${product.title}
</h3>




<div class="product-rating">

★★★★★

</div>



<strong class="product-price">

$${product.price}

</strong>



<button 
class="product-btn"
data-id="${product.id}">

View Product

</button>



</div>


`;

    return card;
  }

  renderPagination() {
    const page = this.shadowRoot.querySelector(".page-number");

    page.textContent = `${this.state.currentPage} / ${this.totalPages}`;
  }

  setupEvents() {
    const container = this.shadowRoot.querySelector(".product-container");

    container.addEventListener("click", (event) => {
      const productBtn = event.target.closest(".product-btn");

      if (productBtn) {
        window.location.href = `../../../pages/products-details.html?id=${productBtn.dataset.id}`;
      }

      const wishlist = event.target.closest(".wishlist-btn");

      if (wishlist) {
        wishlist.classList.toggle("active");
      }
    });

    const next = this.shadowRoot.querySelector(".next");

    const previous = this.shadowRoot.querySelector(".previous");

    next.addEventListener("click", () => {
      if (this.state.currentPage < this.totalPages) {
        this.state.currentPage++;

        this.renderProducts();

        this.renderPagination();
      }
    });

    previous.addEventListener("click", () => {
      if (this.state.currentPage > 1) {
        this.state.currentPage--;

        this.renderProducts();

        this.renderPagination();
      }
    });
  }
}

export { isProducts, getProducts };
