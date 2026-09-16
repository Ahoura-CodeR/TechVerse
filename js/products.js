import { isFooter } from "./component/footer/footer.js";
import { productCategory } from "./component/products-box/products.js";

window.customElements.define("product-category", productCategory);
window.customElements.define("footer-site", isFooter);

const container = document.querySelector(".container");
const pageLoader = document.querySelector(".page-loader");

container.style.display = "none";

window.addEventListener("load", () => {
  pageLoader.style.opacity = "0";
  pageLoader.style.visibility = "hidden";

  container.style.display = "";
});
