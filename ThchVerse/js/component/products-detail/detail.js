import { getProducts } from '/ThchVerse/js/component/products-box/products.js'

const template = document.createElement('template')

template.innerHTML = `
<link rel="stylesheet" href="/ThchVerse/js/component/products-detail/detail.css">
<!-- ================= SECTION 1: HERO ================= -->

<div class="box-container">
</div>

`

const param = new URLSearchParams(window.location.search)
const urlId = Number(param.get('id'))


class productsDetail extends HTMLElement {
    constructor () {
        
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    
    async connectedCallback () {
        
        const product = await getProducts()
        const boxProduct = this.shadowRoot.querySelector('.box-container')
        const showProduct = product.find(item => {
            return item.id === urlId
        })
        console.log(showProduct);

        boxProduct.innerHTML = `
            <section class="product-hero animate-fade-in">
              <!-- گالری تصاویر -->
              <div class="product-gallery">
                <div class="thumbnails">
                  <img src="${showProduct.images[0]}" class="thumb active" alt="${showProduct.brand}">
                  <img src="${showProduct.images[1]}" class="thumb" alt="${showProduct.brand}">
                  <img src="${showProduct.images[2]}" class="thumb" alt="${showProduct.brand}">
                  <img src="${showProduct.images[3]}" class="thumb" alt="${showProduct.brand}">
                </div>
                <div class="main-image-wrapper">
                  <img src="${showProduct.images[0]}" class="main-image" alt="${showProduct.brand}">
                </div>
              </div>
        
              <!-- اطلاعات محصول -->
              <div class="product-info">
                <h1 class="product-title">${showProduct.title}</h1>
                <div class="price-container">
                  <span class="current-price">$${showProduct.price}</span>
                  <span class="original-price">$1499</span>
                </div>
        
                <!-- انتخاب رنگ -->
                <div class="color-selection">
                  <label>Select color :</label>
                  <div class="color-options">
                    <span class="color-dot active" style="--dot-color: #3b3a3e;"></span>
                    <span class="color-dot" style="--dot-color: ${showProduct.colors[0]};"></span>
                    <span class="color-dot" style="--dot-color: ${showProduct.colors[1]};"></span>
                    <span class="color-dot" style="--dot-color: ${showProduct.colors[3]};"></span>
                    <span class="color-dot" style="--dot-color: #e3e4e5;"></span>
                  </div>
                </div>
        
                <!-- انتخاب حافظه -->
                <div class="storage-selection">
                  <button class="storage-btn disabled">${showProduct.storage_options[0]}</button>
                  <button class="storage-btn">${showProduct.storage_options[1]}</button>
                  <button class="storage-btn">${showProduct.storage_options[2]}</button>
                  <button class="storage-btn active">${showProduct.storage_options[3]}</button>
                </div>
        
                <!-- کارت‌های ویژگی -->
                <div class="specs-grid">
                  <div class="spec-card">
                    <span class="spec-icon">📱</span>
                    <div><small>Screen size</small><strong>${showProduct.specifications.display}</strong></div>
                  </div>
                  <div class="spec-card">
                    <span class="spec-icon">⚙️</span>
                    <div><small>CPU</small><strong>${showProduct.specifications.processor}</strong></div>
                  </div>
                  <div class="spec-card">
                    <span class="spec-icon">🧩</span>
                    <div><small>Number of Cores</small><strong>${showProduct.specifications.cores}</strong></div>
                  </div>
                  <div class="spec-card">
                    <span class="spec-icon">📸</span>
                    <div><small>Main camera</small><strong>${showProduct.specifications.main_camera}</strong></div>
                  </div>
                  <div class="spec-card">
                    <span class="spec-icon">🤳</span>
                    <div><small>Front-camera</small><strong>${showProduct.specifications.front_camera}</strong></div>
                  </div>
                  <div class="spec-card">
                    <span class="spec-icon">🔋</span>
                    <div><small>Battery capacity</small><strong> + ${showProduct.specifications.battery}</strong></div>
                  </div>
                </div>
        
                <p class="product-description">
                  ${showProduct.description} <a href="#" class="more-link">more...</a>
                </p>
        
                <!-- دکمه‌ها -->
                <div class="action-buttons">
                  <button class="btn btn-wishlist">
                    <svg class="heart-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    Add to Wishlist
                  </button>
                  <button class="btn btn-cart">
                    Add to Cart
                  </button>
                </div>
        
                <!-- دلیوری -->
                <div class="delivery-info">
                  <div class="delivery-item">
                    <span class="icon">🚚</span>
                    <div><small>Free Delivery</small><strong>1-2 day</strong></div>
                  </div>
                  <div class="delivery-item">
                    <span class="icon">🏪</span>
                    <div><small>In Stock</small><strong>Today</strong></div>
                  </div>
                  <div class="delivery-item">
                    <span class="icon">🛡️</span>
                    <div><small>Guaranteed</small><strong>1 year</strong></div>
                  </div>
                </div>
              </div>
            </section>
        
            <!-- ================= SECTION 2: DETAILS ================= -->
            <section class="product-details-section animate-slide-up">
              <div class="details-container">
                <h2>Details</h2>
                <p class="details-intro">
                   + ${showProduct.description}
                </p>
        
                <h3>Screen</h3>
                <table class="specs-table">
                  <tr class="table-row"><td>Screen diagonal</td><td class="text-right">${showProduct.specifications.display}</td></tr>
                  <tr class="table-row"><td>The screen resolution</td><td class="text-right">${showProduct.specifications.resolution}</td></tr>
                  <tr class="table-row"><td>The screen refresh rate</td><td class="text-right">${showProduct.specifications.refresh_rate}</td></tr>
                  <tr class="table-row"><td>The pixel density</td><td class="text-right">460 ppi</td></tr>
                  <tr class="table-row"><td>Screen type</td><td class="text-right">${showProduct.specifications.screen_type}</td></tr>
                </table>
        
                <div class="view-more-wrapper">
                  <button class="btn-view-more">
                    View More <span class="arrow-icon">∨</span>
                  </button>
                </div>
              </div>
            </section>
        `
        
    }
}

export { productsDetail }