import { isCategory } from "./component/category/category.js";
import { isFooter } from "./component/footer/footer.js";
import { isProducts, getProducts } from "./component/product/product.js";
window.customElements.define("category-component", isCategory)
window.customElements.define("footer-site", isFooter)
window.customElements.define("product-data", isProducts)

getProducts ()

const buttonShop = document.querySelector('.button-header')
const buttonShopTow = document.querySelector('.shop-btn')

let isGoDetail = () => {
  window.location.href = '../pages/products.html'
}

buttonShop.addEventListener('click', isGoDetail)
buttonShopTow.addEventListener('click', isGoDetail)

const animationLoad = document.querySelector('.container')
const pageLoader = document.querySelector('.page-loader')

animationLoad.style.display = 'none'

window.addEventListener('load', event => {
  animationLoad.style.display = ''
  pageLoader.style.display = 'none'
})