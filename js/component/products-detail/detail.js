import { getProducts } from "../../lib/products-api.js";
import { mixin } from "../../utils/mixin.js";
import { DetailSections } from "./sections.js";
import { CategoryRenderers } from "./categories.js";
import { GamingRenderer } from "./gaming.js";
import { DetailInteractions } from "./interactions.js";

const template = document.createElement("template");

template.innerHTML = `
  <link
    rel="stylesheet"
    href="js/component/products-detail/detail.css"
  >

  <div class="box-container"></div>
`;

class productsDetail extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.state = {
      product: null,
    };
  }

  async connectedCallback() {
    const boxProduct = this.shadowRoot.querySelector(".box-container");

    const params = new URLSearchParams(window.location.search);

    const rawId = params.get("id");

    const urlId = Number(rawId);

    const products = await getProducts();

    const showProduct = products.find((item) => Number(item.id) === urlId);

    /* Product not found */

    if (!rawId || Number.isNaN(urlId) || !showProduct) {
      this.renderNotFound(boxProduct);

      return;
    }

    this.state.product = showProduct;

    /*
      Category comes from
      the product itself.
    */

    const category = String(showProduct.category || "").toLowerCase();

    /* Render category */

    switch (category) {
      case "phones":
        this.renderPhones(boxProduct, showProduct);

        break;
      case "smartwatches":
        this.renderSmartwatches(boxProduct, showProduct);

        break;
      case "cameras":
        this.renderCameras(boxProduct, showProduct);

        break;
      case "headphones":
        this.renderHeadphones(boxProduct, showProduct);

        break;
      case "computers":
        this.renderComputers(boxProduct, showProduct);

        break;
      case "gaming":
        this.renderGaming(boxProduct, showProduct);

        break;
      default:
        this.renderNotFound(boxProduct, "This product category is not supported yet.");

        return;
    }

    /* Events */

    this.bindEvents();
  }
}

mixin(productsDetail, DetailSections, CategoryRenderers, GamingRenderer, DetailInteractions);

export { productsDetail };
