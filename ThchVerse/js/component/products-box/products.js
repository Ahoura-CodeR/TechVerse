const template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" href="/ThchVerse/js/component/products-box/products.css">
    <div class="products-grid"></div>
`
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

class productCategory extends HTMLElement {
    constructor () {
        super()
        this.attachShadow({mode: "open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    async connectedCallback () {

        const inputElem = document.querySelector('.input-search')
        const productGrid = this.shadowRoot.querySelector('.products-grid')
        const products = await getProducts()
        
        let newProducts = products.filter(item => {
            
            return item.category === newCategory
        })
        
        
        const buttonContainer = this.shadowRoot.querySelector('.products-grid')

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
        
        buttonContainer.addEventListener('click', event => {
            
            if (event.target.closest('.product-button')) {

                const idBtn = event.target.dataset.id
                window.location.href = `/ThchVerse/pages/products-details.html?id=${idBtn}`
            }
        })
        
        
        if (categories != null) {
            renderProduct(newProducts)
        } else {
            renderProduct(products)
        }
        inputElem.addEventListener('input', event => {
            
            const searchResult = products.filter(item => item.title.trim().toLowerCase().includes(inputElem.value.trim().toLowerCase()))
            if (inputElem.value.trim().toLowerCase() !== '') {
                renderProduct(searchResult)
            } else {
                if (categories != null) {
                    renderProduct(newProducts)
                } else {
                    renderProduct(products)
            }
            }
        })

    }
}

export { productCategory }
