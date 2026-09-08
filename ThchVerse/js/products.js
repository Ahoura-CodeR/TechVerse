import { isFooter } from "./component/footer/footer.js";
import { productCategory } from "/ThchVerse/js/component/products-box/products.js"


const getProducts = async () => {

    try {
        const res = await fetch(`/ThchVerse/Data/products.json`)
        if (!res.ok) throw new Error('خطا در دریافت اطلاعات ')
        const data = await res.json()
        return data.products || []
    } catch (error) {
        console.log('your error ==> ' + error);
        return []
        
    }

}

window.customElements.define('product-category', productCategory)
window.customElements.define("footer-site", isFooter)


let currentPage = 1
const itemPrePage = 10

const paginationPage = async (current, item) => {

    const allItem = await getProducts()
    const startIndex = (current - 1) * item
    const endIndex = startIndex + item
    const currentItem = allItem.slice(startIndex, endIndex)
    const totalPage = Math.ceil(allItem.length / itemPrePage)

    console.log(startIndex);
    console.log(endIndex);
    console.log(currentItem);
}

const paginationButton = document.querySelector('.pagination')

paginationButton.addEventListener('click', event => {
    if (event.target.closest('.pagination-page')) {
        
        currentPage = event.target.closest('.pagination-page').textContent.trim()
        console.log(currentPage);
        
        const pageActive = document.querySelectorAll('.pagination-page')
        pageActive.forEach(item => {
            
            item.classList.remove('active')
        })
        
        event.target.closest('.pagination-page').classList.add('active')
    } else if (event.target.closest('.pagination-arrow')) {
        
    }

}) 

paginationPage(currentPage, itemPrePage)
// const totalPage = Math.ceil(product / itemPrePage)
