const template = document.createElement("template");

template.innerHTML = `

<link rel="stylesheet" href="/ThchVerse/css/variables.css">
<link rel="stylesheet" href="/ThchVerse/css/global.css">
<link rel="stylesheet" href="/ThchVerse/css/animations.css">
<link rel="stylesheet" href="/ThchVerse/js/component/product/product.css">


<section class="product-container">

    <div class="loader-container">

        <div class="loader-core">

            <span></span>
            <span></span>
            <span></span>

        </div>

        <p>
            Loading Products...
        </p>

    </div>


</section>

`;

let getProducts = async () => {
  try {
    const response = await fetch("/ThchVerse/Data/products.json");

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
  }

  async connectedCallback() {
    const container = this.shadowRoot.querySelector(".product-container");

    const loader = this.shadowRoot.querySelector(".loader-container");

    const fragment = document.createDocumentFragment();

    try {
      loader.classList.add("show");

      const products = await getProducts();

      products.forEach((product) => {
        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

<div class="product-image-box">


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

        fragment.appendChild(card);
      });

      container.appendChild(fragment);
    } finally {
      loader.classList.remove("show");
    }

    container.addEventListener("click", (event) => {
      const button = event.target.closest(".product-btn");

      if (button) {
        window.location.href = `/ThchVerse/pages/products-details.html?id=${button.dataset.id}`;
      }

      const fav = event.target.closest(".wishlist-btn");

      if (fav) {
        fav.classList.toggle("active");
      }
    });
  }
}

export { isProducts, getProducts };
