import { productsDetail } from "./component/products-detail/detail.js";
import { isFooter } from "./component/footer/footer.js";

window.customElements.define("products-detail", productsDetail);
window.customElements.define("footer-site", isFooter);

const animationLoad = document.querySelector(".container");
const pageLoader = document.querySelector(".page-loader");

animationLoad.style.display = "none";

window.addEventListener("load", (event) => {
  animationLoad.style.display = "";
  pageLoader.style.display = "none";
});
pageLoader.style.display = 'none'