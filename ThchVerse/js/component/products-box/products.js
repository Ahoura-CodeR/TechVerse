const template = document.createElement('template')

template.innerHTML = `
    <link rel="stylesheet" href="/ThchVerse/css/products/products.css">
    <div class="products-grid"></div>
`


const getProducts = async () => {

    try {
        const params = new URLSearchParams(window.location.search)
        const category = params.get("category")
        console.log(category);
        
        const res = await fetch(`https://dummyjson.com/products/category/${category}`)
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

        const productGrid = this.shadowRoot.querySelector('.products-grid')
        const products = await getProducts()
        console.log(products);

        
        
        const fragment = document.createDocumentFragment()
        
        products.forEach(item => {
            const div = document.createElement('div')
            div.classList.add('product-card')
            console.log(item);
            div.innerHTML = `
                <img class="product-image" src="${item.images[0]}" alt="${item.title}">
            
                <h3 class="product-title">
                    ${item.title}
                </h3>
            
                <p class="product-description">
                    ${item.description}
                </p>
            
                <span class="product-price">
                    $${item.price}
                </span>
            
                <button class="product-button">
                    Buy Now
                </button>
            `
            
            fragment.appendChild(div)
        });

        productGrid.appendChild(fragment)
        

    }
}

export { productCategory }
