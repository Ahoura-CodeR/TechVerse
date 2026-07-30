import { isCategory } from "./component/category/category.js";
import { isFooter } from "./component/footer/footer.js";
window.customElements.define("category-component", isCategory)
window.customElements.define("footer-site", isFooter)