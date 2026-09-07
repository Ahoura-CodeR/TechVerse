const template = document.createElement('template')
template.innerHTML = `
  <link rel="stylesheet" href="/ThchVerse/js/component/product/product.css">
  <div class="product-container">
      <div class="loader-container">
          <div class="loader">
              <span></span>
              <span></span>
              <span></span>
          </div>
          <p>Loading products...</p>
      </div>
  </div>
  
  `


let getProducts = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products/search?q=phone')
    if (!res.ok) throw new Error('خطا در دریافت اطلاعات ')
      const data = await res.json()
    return data.products || []
    
  } catch (error) {
    console.log('your error ==> ' + error)
    return []
  }
} 

class isProducts extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  async connectedCallback() {
    let fragment = document.createDocumentFragment()
    const productContainer = this.shadowRoot.querySelector('.product-container')
    const loader = this.shadowRoot.querySelector('.loader-container');
    loader.style.display = 'flex';
    try {
      const product = await getProducts()
      product.forEach((item) => {
        
        const boxProduct = document.createElement('div')
  
        boxProduct.innerHTML = `
          <div class="box-product">
              <svg class="svg-fav" width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.88776 12.7678L12.2689 21.5804C12.5933 21.8851 12.7555 22.0375 12.9535 22.0375C13.1515 22.0375 13.3138 21.8851 13.6382 21.5804L23.0193 12.7678C25.6275 10.3177 25.9443 6.28568 23.7506 3.45831L23.3381 2.92667C20.7139 -0.455676 15.4464 0.11157 13.6024 3.97509C13.342 4.52083 12.5651 4.52083 12.3046 3.97509C10.4607 0.11157 5.19316 -0.455676 2.56893 2.92667L2.15645 3.45831C-0.0372038 6.28568 0.279528 10.3177 2.88776 12.7678Z" stroke="#919191" stroke-opacity="0.77" stroke-width="1.4"/>
              </svg>
              <img src="${item.images[0]}">
              <p class="p-proucts">
                  ${item.description} 
              </p>
              <p class="price-products">
                  $${item.price}
              </p>
              <button data-id="${item.id}" class="button-buy">
                  Buy Now
              </button>
          </div>
          ` 
        fragment.appendChild(boxProduct)
        
      })
      productContainer.appendChild(fragment)

    } catch (error) {
      console.log(error);
      
    } finally {
      loader.style.display = 'none';
    }
    

    productContainer.addEventListener('click', event => {
      if (event.target.closest('.button-buy')) {
        const buttonTarget = event.target.closest('.button-buy')
        window.location.href = `/ThchVerse/pages/products-details.html?id=${buttonTarget.dataset.id}`
      }
    })
    
  }
}
export {isProducts, getProducts}
