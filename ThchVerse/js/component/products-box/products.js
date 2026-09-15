const template = document.createElement("template");

template.innerHTML = `

<link rel="stylesheet" href="/ThchVerse/css/variables.css">
<link rel="stylesheet" href="/ThchVerse/css/global.css">
<link rel="stylesheet" href="/ThchVerse/css/animations.css">
<link rel="stylesheet" href="/ThchVerse/js/component/products-box/products.css">


<section class="products-component">


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
        <span>...</span>
    </div>

</div>




<div class="products-grid"></div>




<div class="empty-state">


<div class="empty-icon">

<svg viewBox="0 0 24 24">

<circle cx="10" cy="10" r="7"/>

<path d="M15 15L21 21"/>

</svg>

</div>


<h3>
No Products Found
</h3>


<p>
Try changing your search criteria
</p>


<button class="reset-search">
Clear Search
</button>


</div>





<nav class="pagination">


<button class="page-arrow previous">

<svg viewBox="0 0 24 24">
<path d="M15 18L9 12L15 6"/>
</svg>

</button>


<div class="pages"></div>


<button class="page-arrow next">

<svg viewBox="0 0 24 24">
<path d="M9 18L15 12L9 6"/>
</svg>

</button>


</nav>


</section>

`;

const categoryMap = {
  Cameras: "cameras",
  Phones: "phones",
  SmartWatches: "smartwatches",
  Headphones: "headphones",
  Computers: "computers",
  Gaming: "gaming",
};

async function getProducts() {
  try {
    const res = await fetch("/ThchVerse/Data/products.json");

    if (!res.ok) throw new Error("Products loading error");

    const data = await res.json();

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

    this.products = [];

    this.filteredProducts = [];

    this.currentPage = 1;

    this.itemsPerPage = 10;
  }

  async connectedCallback() {
    this.grid = this.shadowRoot.querySelector(".products-grid");

    this.loader = this.shadowRoot.querySelector(".product-loader");

    this.empty = this.shadowRoot.querySelector(".empty-state");

    this.pages = this.shadowRoot.querySelector(".pages");

    this.previous = this.shadowRoot.querySelector(".previous");

    this.next = this.shadowRoot.querySelector(".next");

    await this.loadProducts();

    this.events();
  }

  async loadProducts() {
    this.loader.classList.add("show");

    this.products = await getProducts();

    const params = new URLSearchParams(location.search);

    const category = params.get("category");

    if (category) {
      const normalized = categoryMap[category];

      this.filteredProducts = this.products.filter(
        (product) => product.category.toLowerCase() === normalized,
      );
    } else {
      this.filteredProducts = this.products;
    }

    this.render();

    this.loader.classList.remove("show");
  }

  render() {
    const start = (this.currentPage - 1) * this.itemsPerPage;

    const end = start + this.itemsPerPage;

    const current = this.filteredProducts.slice(start, end);

    this.grid.innerHTML = "";

    if (current.length === 0) {
      this.empty.classList.add("show");

      return;
    } else {
      this.empty.classList.remove("show");
    }

    const fragment = document.createDocumentFragment();

    current.forEach((product) => {
      const card = document.createElement("article");

      card.className = "product-card";

      const rating = (product.rating / 5) * 100;

      card.innerHTML = `

<div class="product-image">


<img
src="${product.images[0]}"
loading="lazy"
alt="${product.title}"
>


<button class="wishlist">

<svg viewBox="0 0 24 24">

<path d="
M20.8 4.6
C18.4 2.2 14.7 2.5 12 5.4
C9.3 2.5 5.6 2.2 3.2 4.6
C0.2 7.7 1 12.7 12 21
C23 12.7 23.8 7.7 20.8 4.6Z"/>

</svg>


</button>


</div>





<div class="product-info">


<span class="category">
${product.category}
</span>


<h3>
${product.title}
</h3>



<p>
${product.description}
</p>



<div class="meta">


<div class="rating">

★ ${product.rating}

</div>


<strong>
$${product.price}
</strong>


</div>



<button 
class="view-product"
data-id="${product.id}">

VIEW PRODUCT

</button>



</div>


`;

      fragment.appendChild(card);
    });

    this.grid.appendChild(fragment);

    this.renderPagination();
  }

  renderPagination() {
    this.pages.innerHTML = "";

    const total = Math.ceil(this.filteredProducts.length / this.itemsPerPage);

    for (let i = 1; i <= total; i++) {
      const btn = document.createElement("button");

      btn.textContent = i;

      btn.className = "page-number";

      if (i === this.currentPage) btn.classList.add("active");

      this.pages.appendChild(btn);
    }
  }

  events() {
    this.shadowRoot.addEventListener("click", (e) => {
      const productBtn = e.target.closest(".view-product");

      if (productBtn) {
        location.href = `/ThchVerse/pages/products-details.html?id=${productBtn.dataset.id}`;
      }

      const page = e.target.closest(".page-number");

      if (page) {
        this.currentPage = Number(page.textContent);

        this.render();
      }

      if (e.target.closest(".next")) {
        const total = Math.ceil(
          this.filteredProducts.length / this.itemsPerPage,
        );

        if (this.currentPage < total) {
          this.currentPage++;

          this.render();
        }
      }

      if (e.target.closest(".previous")) {
        if (this.currentPage > 1) {
          this.currentPage--;

          this.render();
        }
      }

      const fav = e.target.closest(".wishlist");

      if (fav) {
        fav.classList.toggle("active");
      }
    });
  }

  search(value) {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase()),
    );

    this.currentPage = 1;

    this.render();
  }

  sort(type) {
    const data = [...this.filteredProducts];

    if (type === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    if (type === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (type === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    if (type === "name") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    }

    this.filteredProducts = data;

    this.render();
  }
}

export { productCategory, getProducts };
