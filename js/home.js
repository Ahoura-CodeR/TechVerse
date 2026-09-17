import { isCategory } from "./component/category/category.js";
import { isFooter } from "./component/footer/footer.js";
import { isProducts } from "./component/product/product.js";

window.customElements.define("category-component", isCategory);

window.customElements.define("footer-site", isFooter);

window.customElements.define("product-data", isProducts);

// ==========================
// Hero Buttons
// ==========================

const productPage = () => {
  window.location.href = "pages/products.html";
};

const exploreButton = document.querySelector(".primary-btn");

const collectionButton = document.querySelector(".secondary-btn");

const saleButton = document.querySelector(".sale-content button");

if (exploreButton) {
  exploreButton.addEventListener("click", productPage);
}

if (collectionButton) {
  collectionButton.addEventListener("click", productPage);
}

if (saleButton) {
  saleButton.addEventListener("click", productPage);
}

// ==========================
// Page Loader
// ==========================

const loader = document.querySelector(".loader-container");

const container = document.querySelector(".container");

if (container) {
  container.classList.add("page-hidden");
}

window.addEventListener("load", () => {
  setTimeout(() => {
    loader?.classList.add("loader-hide");

    container?.classList.remove("page-hidden");
  }, 1200);
});
