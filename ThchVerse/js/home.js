import { isCategory } from "./component/category/category.js";
import { isFooter } from "./component/footer/footer.js";
import { isProducts, getProducts } from "./component/product/product.js";
window.customElements.define("category-component", isCategory)
window.customElements.define("footer-site", isFooter)
window.customElements.define("product-data", isProducts)

getProducts ()