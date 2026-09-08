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

const categoryMap = {
    Cameras: 'cameras',
    Phones: 'phones',
    SmartWatches: 'smartwatches',
    Headphones: 'headphones',
    Computers: 'computers',
    Gaming: 'gaming'
}

const params = new URLSearchParams(window.location.search)
const categories = params.get("category")
const newCategory = categoryMap[categories]

let newProducts = await getProducts()
let filterProduct = newProducts.filter(item => {
    return item.category === newCategory
})

let currentPage = 1
let itemPrePage = 10
let totalPage = 0


let renderInformPage = (page, item) => {

    const startIndex = (page - 1) * itemPrePage
    const endIndex = startIndex + itemPrePage
    return item.slice(startIndex, endIndex)
}

let finallyProduct

if (newCategory === undefined) {
    finallyProduct = newProducts
} else {
    finallyProduct = filterProduct
}

totalPage = Math.ceil(finallyProduct.length / itemPrePage)
const nextButtonPagination = document.querySelector('.next')
const navPagination = document.querySelector('.pagination')

let renderButtonPagination = () => {

    const parentButtonPagination = document.querySelectorAll('.pagination-page')
    
    parentButtonPagination.forEach(item => {
        item.remove()
    })
    
    
    for (let i = 1; i <= totalPage; i++) {
                
        const buttonPagination = document.createElement('button')
        buttonPagination.classList.add('pagination-page')
        buttonPagination.textContent = i
        navPagination.insertBefore(buttonPagination, nextButtonPagination)
    
        if (buttonPagination.textContent === '1') {
            
            buttonPagination.classList.add('active')
        }
    }

    navPagination.addEventListener('click', event => {
            if (event.target.closest('.pagination-page')) {

                const parentButtonPagination = document.querySelectorAll('.pagination-page')
                const itemActive = Array.from(parentButtonPagination).filter(item => {
                
                    return item.classList.contains('active')
                })

                itemActive[0].classList.remove('active')
                event.target.closest('.pagination-page').classList.add('active')
                currentPage = Number(event.target.textContent)
                
            } else if (event.target.closest('.previous')) {

                const parentButtonPagination = document.querySelectorAll('.pagination-page')
                const itemActive = Array.from(parentButtonPagination).filter(item => {
                
                    return item.classList.contains('active')
                })

                if (Number(itemActive[0].textContent) === 1) {
                    
                    return
                } else {

                    itemActive[0].classList.remove('active')
                    itemActive[0].previousElementSibling.classList.add('active')
                    currentPage = Number(itemActive[0].previousElementSibling.textContent)
                } 
            } else if (event.target.closest('.next')) {

                const parentButtonPagination = document.querySelectorAll('.pagination-page')
                const itemActive = Array.from(parentButtonPagination).filter(item => {
                
                    return item.classList.contains('active')
                })
                
                if (Number(itemActive[0].textContent) === totalPage) {
                    
                    return
                } else {

                    itemActive[0].classList.remove('active')
                    itemActive[0].nextElementSibling.classList.add('active')
                    currentPage = Number(itemActive[0].nextElementSibling.textContent)
                } 
                
            }
        })
    
}


renderButtonPagination()

const productForShado = document.querySelector('product-category')
const shadowRootP = productForShado.shadowRoot
const productGrid = shadowRootP.querySelector('.products-grid')

let renderProduct = (products) => {

    const fragment = document.createDocumentFragment()
        productGrid.innerHTML = ''
        
        products.forEach(item => {
            const div = document.createElement('div')
            div.classList.add('product-card')
            const ratingPercent = (item.rating / 5) * 100
    
    div.innerHTML = `
        <div class="product-image-wrapper">
            <img
                class="product-image"
                src="${item.images[0]}"
                alt="${item.title}"
            >
        </div>
    
        <h3 class="product-title">
            ${item.title}
        </h3>
    
        <p class="product-description">
            ${item.description}
        </p>
    
        <div class="product-meta">
        
        <div class="product-rating">
        
        <svg
        class="rating-star"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
                >
                    <defs>
                        <linearGradient
                            id="rating-${item.id}"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop
                                offset="${ratingPercent}%"
                                stop-color="#F5B301"
                            />
                            <stop
                                offset="${ratingPercent}%"
                                stop-color="#D9D9D9"
                            />
                        </linearGradient>
                    </defs>
    
                    <path
                        d="M12 2.5L14.95 8.45L21.5 9.4L16.75 14L17.9 20.5L12 17.4L6.1 20.5L7.25 14L2.5 9.4L9.05 8.45Z"
                        fill="url(#rating-${item.id})"
                    />
                </svg>
    
                <span class="rating-value">
                    ${item.rating}
                    </span>
    
            </div>
    
            <span class="product-price">
                $${item.price}
            </span>
    
        </div>
    
        <button data-id="${item.id}" class="product-button">
            Buy Now
        </button>
        `
        fragment.appendChild(div)
    });        
    productGrid.appendChild(fragment)
}



let renderProductPage = () => {
    
    productGrid.innerHTML = ''

    let renderProductsPage = renderInformPage(currentPage, finallyProduct)
    renderProduct(renderProductsPage)

    navPagination.addEventListener('click', event => {
        if (event.target.closest('.pagination-page')) {
        
            let newRenderProduct = renderInformPage(currentPage, finallyProduct)
            renderProduct(newRenderProduct)

        } else if (event.target.closest('.previous')) {

            let newRenderProduct = renderInformPage(currentPage, finallyProduct)
            renderProduct(newRenderProduct)

        } else if (event.target.closest('.next')) {

            let newRenderProduct = renderInformPage(currentPage, finallyProduct)
            renderProduct(newRenderProduct)
        }
    })

}

renderProductPage()