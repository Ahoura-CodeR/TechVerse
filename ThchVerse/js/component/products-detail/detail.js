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
const urlCategory = param.get('category')


class productsDetail extends HTMLElement {
    constructor () {
        
        super()
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    
    async connectedCallback () {
        
        const product = await getProducts()
        const boxProduct = this.shadowRoot.querySelector('.box-container')
        const gamingSpecs = {
    'Gaming Monitor': [
        ['Display', 'display'],
        ['Resolution', 'resolution'],
        ['Refresh Rate', 'refresh_rate'],
        ['Response Time', 'response_time'],
        ['Panel Type', 'panel_type'],
        ['HDR', 'hdr']
    ],

    'Gaming Keyboard': [
        ['Type', 'type'],
        ['Connection', 'connection'],
        ['Switches', 'switches'],
        ['Layout', 'layout'],
        ['Compatibility', 'compatibility'],
        ['Lighting', 'lighting']
    ],

    'Gaming Mouse': [
        ['Connection', 'connection'],
        ['Sensor', 'sensor'],
        ['DPI', 'dpi'],
        ['Buttons', 'buttons'],
        ['Polling Rate', 'polling_rate'],
        ['Battery', 'battery']
    ],

    'Gaming Headset': [
        ['Connection', 'connection'],
        ['Compatibility', 'compatibility'],
        ['Microphone', 'microphone'],
        ['Noise Cancellation', 'noise_cancellation'],
        ['Battery', 'battery'],
        ['Lighting', 'lighting']
    ],

    'Game Controller': [
        ['Connection', 'connection'],
        ['Compatibility', 'compatibility'],
        ['Battery', 'battery'],
        ['Buttons', 'buttons'],
        ['Vibration', 'vibration'],
        ['Wireless Range', 'wireless_range']
    ],

    'Gaming Desktop': [
        ['Processor', 'processor'],
        ['Cores', 'cores'],
        ['RAM', 'ram'],
        ['Storage', 'storage'],
        ['GPU', 'gpu'],
        ['GPU Memory', 'gpu_memory']
    ]
}
        const showProduct = product.find(item => {
            return item.id === urlId
        })

        console.log(urlCategory);

        if (urlCategory === 'phones') {

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
        } else if (urlCategory === 'smartwatches') {
            
            boxProduct.innerHTML = `
                <section class="product-hero animate-fade-in">

    <!-- ================= GALLERY ================= -->
    <div class="product-gallery">

        <div class="thumbnails">
            <img
                src="${showProduct.images[0]}"
                class="thumb active"
                alt="${showProduct.title}"
            >

            <img
                src="${showProduct.images[1]}"
                class="thumb"
                alt="${showProduct.title}"
            >

            <img
                src="${showProduct.images[2]}"
                class="thumb"
                alt="${showProduct.title}"
            >

            <img
                src="${showProduct.images[3]}"
                class="thumb"
                alt="${showProduct.title}"
            >
        </div>

        <div class="main-image-wrapper">
            <img
                src="${showProduct.images[0]}"
                class="main-image"
                alt="${showProduct.title}"
            >
        </div>

    </div>


    <!-- ================= PRODUCT INFO ================= -->
    <div class="product-info">

        <h1 class="product-title">
            ${showProduct.title}
        </h1>


        <!-- PRICE -->
        <div class="price-container">
            <span class="current-price">
                $${showProduct.price}
            </span>

            <span class="original-price">
                $${Math.round(showProduct.price * 1.15)}
            </span>
        </div>


        <!-- ================= COLOR ================= -->
        <div class="color-selection">

            <label>Select color :</label>

            <div class="color-options">

                <span
                    class="color-dot active"
                    style="--dot-color: ${showProduct.colors[0]};"
                ></span>

                <span
                    class="color-dot"
                    style="--dot-color: ${showProduct.colors[1]};"
                ></span>

                <span
                    class="color-dot"
                    style="--dot-color: ${showProduct.colors[2]};"
                ></span>

            </div>

        </div>


        <!-- ================= SPECS ================= -->
        <div class="specs-grid">

            <div class="spec-card">
                <span class="spec-icon">⌚</span>

                <div>
                    <small>Display</small>
                    <strong>
                        ${showProduct.specifications.display}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">❤️</span>

                <div>
                    <small>Sensors</small>
                    <strong>
                        ${showProduct.specifications.sensors}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">🔋</span>

                <div>
                    <small>Battery</small>
                    <strong>
                        ${showProduct.specifications.battery}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">📍</span>

                <div>
                    <small>GPS</small>
                    <strong>
                        ${showProduct.specifications.gps}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">📡</span>

                <div>
                    <small>Connectivity</small>
                    <strong>
                        ${showProduct.specifications.connection}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">📱</span>

                <div>
                    <small>Compatibility</small>
                    <strong>
                        ${showProduct.specifications.compatibility}
                    </strong>
                </div>
            </div>

        </div>


        <!-- ================= DESCRIPTION ================= -->
        <p class="product-description">
            ${showProduct.description}

            <a href="#" class="more-link">
                more...
            </a>
        </p>


        <!-- ================= ACTION BUTTONS ================= -->
        <div class="action-buttons">

            <button class="btn btn-wishlist">

                <svg
                    class="heart-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    ></path>
                </svg>

                Add to Wishlist

            </button>


            <button class="btn btn-cart">
                Add to Cart
            </button>

        </div>


        <!-- ================= DELIVERY ================= -->
        <div class="delivery-info">

            <div class="delivery-item">
                <span class="icon">🚚</span>

                <div>
                    <small>Free Delivery</small>
                    <strong>1-2 day</strong>
                </div>
            </div>


            <div class="delivery-item">
                <span class="icon">🏪</span>

                <div>
                    <small>In Stock</small>

                    <strong>
                        ${showProduct.stock > 0 ? 'Today' : 'Out of Stock'}
                    </strong>
                </div>
            </div>


            <div class="delivery-item">
                <span class="icon">🛡️</span>

                <div>
                    <small>Guaranteed</small>

                    <strong>
                        ${showProduct.warranty}
                    </strong>
                </div>
            </div>

        </div>

    </div>

</section>



<!-- =========================================================
     SECTION 2: SMARTWATCH DETAILS
     ========================================================= -->

<section class="product-details-section animate-slide-up">

    <div class="details-container">

        <h2>Details</h2>


        <p class="details-intro">
            ${showProduct.description}
        </p>


        <!-- ================= DISPLAY ================= -->
        <h3>Display</h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Display</td>

                <td class="text-right">
                    ${showProduct.specifications.display}
                </td>
            </tr>


            <tr class="table-row">
                <td>Resolution</td>

                <td class="text-right">
                    ${showProduct.specifications.resolution}
                </td>
            </tr>


            <tr class="table-row">
                <td>Screen type</td>

                <td class="text-right">
                    ${showProduct.specifications.screen_type}
                </td>
            </tr>


            <tr class="table-row">
                <td>Protection</td>

                <td class="text-right">
                    ${showProduct.specifications.protection}
                </td>
            </tr>

        </table>


        <!-- ================= HEALTH & CONNECTIVITY ================= -->
        <h3 class="details-subtitle">
            Health & Connectivity
        </h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Sensors</td>

                <td class="text-right">
                    ${showProduct.specifications.sensors}
                </td>
            </tr>


            <tr class="table-row">
                <td>Health features</td>

                <td class="text-right">
                    ${showProduct.specifications.health_features}
                </td>
            </tr>


            <tr class="table-row">
                <td>GPS</td>

                <td class="text-right">
                    ${showProduct.specifications.gps}
                </td>
            </tr>


            <tr class="table-row">
                <td>Connectivity</td>

                <td class="text-right">
                    ${showProduct.specifications.connection}
                </td>
            </tr>


            <tr class="table-row">
                <td>Compatibility</td>

                <td class="text-right">
                    ${showProduct.specifications.compatibility}
                </td>
            </tr>

        </table>


        <!-- ================= BATTERY ================= -->
        <h3 class="details-subtitle">
            Battery & Charging
        </h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Battery</td>

                <td class="text-right">
                    ${showProduct.specifications.battery}
                </td>
            </tr>


            <tr class="table-row">
                <td>Charging</td>

                <td class="text-right">
                    ${showProduct.specifications.charging}
                </td>
            </tr>


            <tr class="table-row">
                <td>Storage</td>

                <td class="text-right">
                    ${showProduct.specifications.storage}
                </td>
            </tr>

        </table>


        <!-- ================= VIEW MORE ================= -->
        <div class="view-more-wrapper">

            <button class="btn-view-more">
                View More
                <span class="arrow-icon">∨</span>
            </button>

        </div>

    </div>

</section>
            `
        } else if (urlCategory === 'cameras') {

            boxProduct.innerHTML = `
                <section class="product-hero animate-fade-in">

    <!-- ================= GALLERY ================= -->
    <div class="product-gallery">

        <div class="thumbnails">
            <img
                src="${showProduct.images[0]}"
                class="thumb active"
                alt="${showProduct.title}"
            >

            <img
                src="${showProduct.images[1]}"
                class="thumb"
                alt="${showProduct.title}"
            >

            <img
                src="${showProduct.images[2]}"
                class="thumb"
                alt="${showProduct.title}"
            >

            <img
                src="${showProduct.images[3]}"
                class="thumb"
                alt="${showProduct.title}"
            >
        </div>

        <div class="main-image-wrapper">
            <img
                src="${showProduct.images[0]}"
                class="main-image"
                alt="${showProduct.title}"
            >
        </div>

    </div>


    <!-- ================= PRODUCT INFO ================= -->
    <div class="product-info">

        <h1 class="product-title">
            ${showProduct.title}
        </h1>


        <!-- PRICE -->
        <div class="price-container">
            <span class="current-price">
                $${showProduct.price}
            </span>

            <span class="original-price">
                $${Math.round(showProduct.price * 1.15)}
            </span>
        </div>


        <!-- ================= COLORS ================= -->
        <div class="color-selection">

            <label>Select color :</label>

            <div class="color-options">

                <span
                    class="color-dot active"
                    style="--dot-color: ${showProduct.colors[0]};"
                ></span>

                <span
                    class="color-dot"
                    style="--dot-color: ${showProduct.colors[1]};"
                ></span>

                <span
                    class="color-dot"
                    style="--dot-color: ${showProduct.colors[2]};"
                ></span>

            </div>

        </div>


        <!-- ================= CAMERA SPECS ================= -->
        <div class="specs-grid">

            <div class="spec-card">
                <span class="spec-icon">📷</span>

                <div>
                    <small>Sensor</small>
                    <strong>
                        ${showProduct.specifications.sensor}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">🔍</span>

                <div>
                    <small>Resolution</small>
                    <strong>
                        ${showProduct.specifications.resolution}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">🎥</span>

                <div>
                    <small>Video</small>
                    <strong>
                        ${showProduct.specifications.video}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">🔭</span>

                <div>
                    <small>Lens</small>
                    <strong>
                        ${showProduct.specifications.lens}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">🎯</span>

                <div>
                    <small>Autofocus</small>
                    <strong>
                        ${showProduct.specifications.autofocus}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">⚖️</span>

                <div>
                    <small>Weight</small>
                    <strong>
                        ${showProduct.specifications.weight}
                    </strong>
                </div>
            </div>

        </div>


        <!-- ================= DESCRIPTION ================= -->
        <p class="product-description">

            ${showProduct.description}

            <a href="#" class="more-link">
                more...
            </a>

        </p>


        <!-- ================= ACTION BUTTONS ================= -->
        <div class="action-buttons">

            <button class="btn btn-wishlist">

                <svg
                    class="heart-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    ></path>
                </svg>

                Add to Wishlist

            </button>


            <button class="btn btn-cart">
                Add to Cart
            </button>

        </div>


        <!-- ================= DELIVERY ================= -->
        <div class="delivery-info">

            <div class="delivery-item">
                <span class="icon">🚚</span>

                <div>
                    <small>Free Delivery</small>
                    <strong>1-2 day</strong>
                </div>
            </div>


            <div class="delivery-item">
                <span class="icon">🏪</span>

                <div>
                    <small>In Stock</small>

                    <strong>
                        ${showProduct.stock > 0
                            ? 'Today'
                            : 'Out of Stock'}
                    </strong>
                </div>
            </div>


            <div class="delivery-item">
                <span class="icon">🛡️</span>

                <div>
                    <small>Guaranteed</small>

                    <strong>
                        ${showProduct.warranty}
                    </strong>
                </div>
            </div>

        </div>

    </div>

</section>


<!-- =========================================================
     SECTION 2: CAMERA DETAILS
     ========================================================= -->

<section class="product-details-section animate-slide-up">

    <div class="details-container">

        <h2>Details</h2>

        <p class="details-intro">
            ${showProduct.description}
        </p>


        <!-- ================= SENSOR & IMAGE ================= -->
        <h3>Image & Sensor</h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Sensor</td>

                <td class="text-right">
                    ${showProduct.specifications.sensor}
                </td>
            </tr>


            <tr class="table-row">
                <td>Resolution</td>

                <td class="text-right">
                    ${showProduct.specifications.resolution}
                </td>
            </tr>


            <tr class="table-row">
                <td>Lens mount</td>

                <td class="text-right">
                    ${showProduct.specifications.lens_mount}
                </td>
            </tr>


            <tr class="table-row">
                <td>Lens</td>

                <td class="text-right">
                    ${showProduct.specifications.lens}
                </td>
            </tr>


            <tr class="table-row">
                <td>Stabilization</td>

                <td class="text-right">
                    ${showProduct.specifications.stabilization}
                </td>
            </tr>


            <tr class="table-row">
                <td>Autofocus</td>

                <td class="text-right">
                    ${showProduct.specifications.autofocus}
                </td>
            </tr>

        </table>


        <!-- ================= VIDEO & EXPOSURE ================= -->
        <h3 class="details-subtitle">
            Video & Exposure
        </h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Video</td>

                <td class="text-right">
                    ${showProduct.specifications.video}
                </td>
            </tr>


            <tr class="table-row">
                <td>ISO range</td>

                <td class="text-right">
                    ${showProduct.specifications.iso_range}
                </td>
            </tr>


            <tr class="table-row">
                <td>Shutter speed</td>

                <td class="text-right">
                    ${showProduct.specifications.shutter_speed}
                </td>
            </tr>


            <tr class="table-row">
                <td>Screen</td>

                <td class="text-right">
                    ${showProduct.specifications.screen}
                </td>
            </tr>

        </table>


        <!-- ================= BATTERY & CONNECTIVITY ================= -->
        <h3 class="details-subtitle">
            Battery & Connectivity
        </h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Battery</td>

                <td class="text-right">
                    ${showProduct.specifications.battery}
                </td>
            </tr>


            <tr class="table-row">
                <td>Connectivity</td>

                <td class="text-right">
                    ${showProduct.specifications.connection}
                </td>
            </tr>


            <tr class="table-row">
                <td>Weight</td>

                <td class="text-right">
                    ${showProduct.specifications.weight}
                </td>
            </tr>

        </table>


        <!-- ================= VIEW MORE ================= -->
        <div class="view-more-wrapper">

            <button class="btn-view-more">
                View More
                <span class="arrow-icon">∨</span>
            </button>

        </div>

    </div>

</section>
            `
        } else if (urlCategory === 'headphones') {

            boxProduct.innerHTML = `
                <section class="product-hero animate-fade-in">

    <!-- ================= GALLERY ================= -->
    <div class="product-gallery">

        <div class="thumbnails">
            <img src="${showProduct.images[0]}" class="thumb active" alt="${showProduct.title}">
            <img src="${showProduct.images[1]}" class="thumb" alt="${showProduct.title}">
            <img src="${showProduct.images[2]}" class="thumb" alt="${showProduct.title}">
            <img src="${showProduct.images[3]}" class="thumb" alt="${showProduct.title}">
        </div>

        <div class="main-image-wrapper">
            <img src="${showProduct.images[0]}" class="main-image" alt="${showProduct.title}">
        </div>

    </div>


    <!-- ================= PRODUCT INFO ================= -->
    <div class="product-info">

        <h1 class="product-title">
            ${showProduct.title}
        </h1>


        <!-- PRICE -->
        <div class="price-container">
            <span class="current-price">
                $${showProduct.price}
            </span>

            <span class="original-price">
                $${Math.round(showProduct.price * 1.15)}
            </span>
        </div>


        <!-- ================= COLORS ================= -->
        <div class="color-selection">

            <label>Select color :</label>

            <div class="color-options">

                <span
                    class="color-dot active"
                    style="--dot-color: ${showProduct.colors[0]};"
                ></span>

                <span
                    class="color-dot"
                    style="--dot-color: ${showProduct.colors[1]};"
                ></span>

                <span
                    class="color-dot"
                    style="--dot-color: ${showProduct.colors[2]};"
                ></span>

            </div>

        </div>


        <!-- ================= HEADPHONE SPECS ================= -->
        <div class="specs-grid">

            <div class="spec-card">
                <span class="spec-icon">🎧</span>

                <div>
                    <small>Type</small>
                    <strong>${showProduct.specifications.type}</strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">🔊</span>

                <div>
                    <small>Driver</small>
                    <strong>${showProduct.specifications.driver}</strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">🔇</span>

                <div>
                    <small>Noise Cancellation</small>
                    <strong>${showProduct.specifications.noise_cancellation}</strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">🔋</span>

                <div>
                    <small>Battery Life</small>
                    <strong>${showProduct.specifications.battery}</strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">📡</span>

                <div>
                    <small>Connectivity</small>
                    <strong>${showProduct.specifications.connection}</strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">⚖️</span>

                <div>
                    <small>Weight</small>
                    <strong>${showProduct.specifications.weight}</strong>
                </div>
            </div>

        </div>


        <!-- ================= DESCRIPTION ================= -->
        <p class="product-description">

            ${showProduct.description}

            <a href="#" class="more-link">
                more...
            </a>

        </p>


        <!-- ================= ACTION BUTTONS ================= -->
        <div class="action-buttons">

            <button class="btn btn-wishlist">

                <svg
                    class="heart-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    ></path>
                </svg>

                Add to Wishlist

            </button>


            <button class="btn btn-cart">
                Add to Cart
            </button>

        </div>


        <!-- ================= DELIVERY ================= -->
        <div class="delivery-info">

            <div class="delivery-item">
                <span class="icon">🚚</span>

                <div>
                    <small>Free Delivery</small>
                    <strong>1-2 day</strong>
                </div>
            </div>


            <div class="delivery-item">
                <span class="icon">🏪</span>

                <div>
                    <small>In Stock</small>

                    <strong>
                        ${showProduct.stock > 0 ? 'Today' : 'Out of Stock'}
                    </strong>
                </div>
            </div>


            <div class="delivery-item">
                <span class="icon">🛡️</span>

                <div>
                    <small>Guaranteed</small>
                    <strong>${showProduct.warranty}</strong>
                </div>
            </div>

        </div>

    </div>

</section>



<!-- ================= SECTION 2: DETAILS ================= -->

<section class="product-details-section animate-slide-up">

    <div class="details-container">

        <h2>Details</h2>

        <p class="details-intro">
            ${showProduct.description}
        </p>


        <!-- ================= AUDIO ================= -->
        <h3>Audio</h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Type</td>
                <td class="text-right">
                    ${showProduct.specifications.type}
                </td>
            </tr>

            <tr class="table-row">
                <td>Driver</td>
                <td class="text-right">
                    ${showProduct.specifications.driver}
                </td>
            </tr>

            <tr class="table-row">
                <td>Frequency Response</td>
                <td class="text-right">
                    ${showProduct.specifications.frequency_response}
                </td>
            </tr>

            <tr class="table-row">
                <td>Noise Cancellation</td>
                <td class="text-right">
                    ${showProduct.specifications.noise_cancellation}
                </td>
            </tr>

        </table>


        <!-- ================= CONNECTIVITY ================= -->
        <h3 class="details-subtitle">Connectivity</h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Connectivity</td>
                <td class="text-right">
                    ${showProduct.specifications.connection}
                </td>
            </tr>

            <tr class="table-row">
                <td>Bluetooth Version</td>
                <td class="text-right">
                    ${showProduct.specifications.connection}
                </td>
            </tr>

            <tr class="table-row">
                <td>Codec</td>
                <td class="text-right">
                    ${showProduct.specifications.codec}
                </td>
            </tr>

        </table>


        <!-- ================= BATTERY ================= -->
        <h3 class="details-subtitle">Battery & Design</h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Battery Life</td>
                <td class="text-right">
                    ${showProduct.specifications.battery}
                </td>
            </tr>

            <tr class="table-row">
                <td>Charging Port</td>
                <td class="text-right">
                    ${showProduct.specifications.charging}
                </td>
            </tr>

            <tr class="table-row">
                <td>Weight</td>
                <td class="text-right">
                    ${showProduct.specifications.weight}
                </td>
            </tr>

            <tr class="table-row">
                <td>Water Resistance</td>
                <td class="text-right">
                    ${showProduct.specifications.water_resistance}
                </td>
            </tr>

        </table>


        <div class="view-more-wrapper">

            <button class="btn-view-more">
                View More
                <span class="arrow-icon">∨</span>
            </button>

        </div>

    </div>

</section>
            `
        } else if (urlCategory === 'computers') {

            boxProduct.innerHTML = `
                <section class="product-hero animate-fade-in">

    <!-- ================= GALLERY ================= -->
    <div class="product-gallery">

        <div class="thumbnails">
            <img src="${showProduct.images[0]}" class="thumb active" alt="${showProduct.title}">
            <img src="${showProduct.images[1]}" class="thumb" alt="${showProduct.title}">
            <img src="${showProduct.images[2]}" class="thumb" alt="${showProduct.title}">
            <img src="${showProduct.images[3]}" class="thumb" alt="${showProduct.title}">
        </div>

        <div class="main-image-wrapper">
            <img src="${showProduct.images[0]}" class="main-image" alt="${showProduct.title}">
        </div>

    </div>


    <!-- ================= PRODUCT INFO ================= -->
    <div class="product-info">

        <h1 class="product-title">
            ${showProduct.title}
        </h1>


        <!-- PRICE -->
        <div class="price-container">

            <span class="current-price">
                $${showProduct.price}
            </span>

            <span class="original-price">
                $${Math.round(showProduct.price * 1.15)}
            </span>

        </div>


        <!-- ================= COLORS ================= -->
        <div class="color-selection">

            <label>Select color :</label>

            <div class="color-options">

                <span
                    class="color-dot active"
                    style="--dot-color: ${showProduct.colors[0]};"
                ></span>

                <span
                    class="color-dot"
                    style="--dot-color: ${showProduct.colors[1]};"
                ></span>

                <span
                    class="color-dot"
                    style="--dot-color: ${showProduct.colors[2]};"
                ></span>

            </div>

        </div>


        <!-- ================= STORAGE ================= -->
        <div class="storage-selection">

            <button class="storage-btn active">
                ${showProduct.storage_options[0]}
            </button>

            <button class="storage-btn">
                ${showProduct.storage_options[1]}
            </button>

            <button class="storage-btn">
                ${showProduct.storage_options[2]}
            </button>

            <button class="storage-btn">
                ${showProduct.storage_options[3]}
            </button>

        </div>


        <!-- ================= COMPUTER SPECS ================= -->
        <div class="specs-grid">

            <div class="spec-card">
                <span class="spec-icon">🖥️</span>

                <div>
                    <small>Display</small>
                    <strong>
                        ${showProduct.specifications.screen}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">⚙️</span>

                <div>
                    <small>Processor</small>
                    <strong>
                        ${showProduct.specifications.processor}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">🧩</span>

                <div>
                    <small>RAM</small>
                    <strong>
                        ${showProduct.specifications.ram}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">💾</span>

                <div>
                    <small>Storage</small>
                    <strong>
                        ${showProduct.specifications.storage}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">🎮</span>

                <div>
                    <small>GPU</small>
                    <strong>
                        ${showProduct.specifications.gpu}
                    </strong>
                </div>
            </div>


            <div class="spec-card">
                <span class="spec-icon">🧠</span>

                <div>
                    <small>GPU Memory</small>
                    <strong>
                        ${showProduct.specifications.gpu_memory}
                    </strong>
                </div>
            </div>

        </div>


        <!-- ================= DESCRIPTION ================= -->
        <p class="product-description">

            ${showProduct.description}

            <a href="#" class="more-link">
                more...
            </a>

        </p>


        <!-- ================= ACTION BUTTONS ================= -->
        <div class="action-buttons">

            <button class="btn btn-wishlist">

                <svg
                    class="heart-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    ></path>
                </svg>

                Add to Wishlist

            </button>


            <button class="btn btn-cart">
                Add to Cart
            </button>

        </div>


        <!-- ================= DELIVERY ================= -->
        <div class="delivery-info">

            <div class="delivery-item">

                <span class="icon">🚚</span>

                <div>
                    <small>Free Delivery</small>
                    <strong>1-2 day</strong>
                </div>

            </div>


            <div class="delivery-item">

                <span class="icon">🏪</span>

                <div>
                    <small>In Stock</small>

                    <strong>
                        ${showProduct.stock > 0 ? 'Today' : 'Out of Stock'}
                    </strong>
                </div>

            </div>


            <div class="delivery-item">

                <span class="icon">🛡️</span>

                <div>
                    <small>Guaranteed</small>
                    <strong>${showProduct.warranty}</strong>
                </div>

            </div>

        </div>

    </div>

</section>



<!-- =========================================================
     SECTION 2: COMPUTER DETAILS
     ========================================================= -->

<section class="product-details-section animate-slide-up">

    <div class="details-container">

        <h2>Details</h2>

        <p class="details-intro">
            ${showProduct.description}
        </p>


        <!-- ================= DISPLAY ================= -->
        <h3>Display</h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Screen</td>

                <td class="text-right">
                    ${showProduct.specifications.screen}
                </td>
            </tr>


            <tr class="table-row">
                <td>Resolution</td>

                <td class="text-right">
                    ${showProduct.specifications.resolution}
                </td>
            </tr>


            <tr class="table-row">
                <td>Refresh rate</td>

                <td class="text-right">
                    ${showProduct.specifications.refresh_rate}
                </td>
            </tr>

        </table>


        <!-- ================= PERFORMANCE ================= -->
        <h3 class="details-subtitle">
            Performance
        </h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Processor</td>

                <td class="text-right">
                    ${showProduct.specifications.processor}
                </td>
            </tr>


            <tr class="table-row">
                <td>CPU Cores</td>

                <td class="text-right">
                    ${showProduct.specifications.cores}
                </td>
            </tr>


            <tr class="table-row">
                <td>RAM</td>

                <td class="text-right">
                    ${showProduct.specifications.ram}
                </td>
            </tr>


            <tr class="table-row">
                <td>Storage</td>

                <td class="text-right">
                    ${showProduct.specifications.storage}
                </td>
            </tr>


            <tr class="table-row">
                <td>GPU</td>

                <td class="text-right">
                    ${showProduct.specifications.gpu}
                </td>
            </tr>


            <tr class="table-row">
                <td>GPU Memory</td>

                <td class="text-right">
                    ${showProduct.specifications.gpu_memory}
                </td>
            </tr>

        </table>


        <!-- ================= SYSTEM & CONNECTIVITY ================= -->
        <h3 class="details-subtitle">
            System & Connectivity
        </h3>

        <table class="specs-table">

            <tr class="table-row">
                <td>Operating System</td>

                <td class="text-right">
                    ${showProduct.specifications.operating_system}
                </td>
            </tr>


            <tr class="table-row">
                <td>Ports</td>

                <td class="text-right">
                    ${showProduct.specifications.ports}
                </td>
            </tr>


            <tr class="table-row">
                <td>Connectivity</td>

                <td class="text-right">
                    ${showProduct.specifications.connectivity}
                </td>
            </tr>


            <tr class="table-row">
                <td>Battery</td>

                <td class="text-right">
                    ${showProduct.specifications.battery}
                </td>
            </tr>


            <tr class="table-row">
                <td>Weight</td>

                <td class="text-right">
                    ${showProduct.specifications.weight}
                </td>
            </tr>

        </table>


        <!-- ================= VIEW MORE ================= -->
        <div class="view-more-wrapper">

            <button class="btn-view-more">
                View More
                <span class="arrow-icon">∨</span>
            </button>

        </div>

    </div>

</section>
            `
        } else if (urlCategory === 'gaming') {

    const specs = showProduct.specifications
    const deviceType = specs.device_type

    let heroSpecs = []
    let detailSpecs = []

    if (deviceType === 'Gaming Monitor') {

        heroSpecs = [
            ['🖥️', 'Display', specs.display],
            ['📐', 'Resolution', specs.resolution],
            ['⚡', 'Refresh Rate', specs.refresh_rate],
            ['⏱️', 'Response Time', specs.response_time],
            ['🎨', 'Panel Type', specs.panel_type],
            ['✨', 'HDR', specs.hdr]
        ]

        detailSpecs = [
            ['🖥️', 'Display', specs.display],
            ['📐', 'Resolution', specs.resolution],
            ['⚡', 'Refresh Rate', specs.refresh_rate],
            ['⏱️', 'Response Time', specs.response_time],
            ['🎨', 'Panel Type', specs.panel_type],
            ['✨', 'HDR', specs.hdr],
            ['🔌', 'Connectivity', specs.connectivity],
            ['💡', 'Lighting', specs.lighting]
        ]

    } else if (deviceType === 'Gaming Keyboard') {

        heroSpecs = [
            ['⌨️', 'Type', specs.type],
            ['🔌', 'Connection', specs.connection],
            ['⌨️', 'Switches', specs.switches],
            ['🔤', 'Layout', specs.layout],
            ['💻', 'Compatibility', specs.compatibility],
            ['💡', 'Lighting', specs.lighting]
        ]

        detailSpecs = [
            ['⌨️', 'Type', specs.type],
            ['🔌', 'Connection', specs.connection],
            ['⌨️', 'Switches', specs.switches],
            ['🔤', 'Layout', specs.layout],
            ['💻', 'Compatibility', specs.compatibility],
            ['💡', 'Lighting', specs.lighting],
            ['⚡', 'Polling Rate', specs.polling_rate],
            ['🛡️', 'Warranty', showProduct.warranty]
        ]

    } else if (deviceType === 'Gaming Mouse') {

        heroSpecs = [
            ['🔌', 'Connection', specs.connection],
            ['🎯', 'Sensor', specs.sensor],
            ['🎚️', 'DPI', specs.dpi],
            ['🔘', 'Buttons', specs.buttons],
            ['⚡', 'Polling Rate', specs.polling_rate],
            ['🔋', 'Battery', specs.battery]
        ]

        detailSpecs = [
            ['🔌', 'Connection', specs.connection],
            ['🎯', 'Sensor', specs.sensor],
            ['🎚️', 'DPI', specs.dpi],
            ['🔘', 'Buttons', specs.buttons],
            ['⚡', 'Polling Rate', specs.polling_rate],
            ['💻', 'Compatibility', specs.compatibility],
            ['💡', 'Lighting', specs.lighting],
            ['🔋', 'Battery', specs.battery]
        ]

    } else if (deviceType === 'Gaming Headset') {

        heroSpecs = [
            ['🔌', 'Connection', specs.connection],
            ['💻', 'Compatibility', specs.compatibility],
            ['🎙️', 'Microphone', specs.microphone],
            ['🔇', 'Noise Cancellation', specs.noise_cancellation],
            ['🔋', 'Battery', specs.battery],
            ['💡', 'Lighting', specs.lighting]
        ]

        detailSpecs = [
            ['🔌', 'Connection', specs.connection],
            ['💻', 'Compatibility', specs.compatibility],
            ['🎙️', 'Microphone', specs.microphone],
            ['🔇', 'Noise Cancellation', specs.noise_cancellation],
            ['🔋', 'Battery', specs.battery],
            ['💡', 'Lighting', specs.lighting],
            ['🛡️', 'Warranty', showProduct.warranty]
        ]

    } else if (deviceType === 'Game Controller') {

        heroSpecs = [
            ['🔌', 'Connection', specs.connection],
            ['💻', 'Compatibility', specs.compatibility],
            ['🔋', 'Battery', specs.battery],
            ['🔘', 'Buttons', specs.buttons],
            ['〰️', 'Vibration', specs.vibration],
            ['📡', 'Wireless Range', specs.wireless_range]
        ]

        detailSpecs = [
            ['🔌', 'Connection', specs.connection],
            ['💻', 'Compatibility', specs.compatibility],
            ['🔋', 'Battery', specs.battery],
            ['🔘', 'Buttons', specs.buttons],
            ['〰️', 'Vibration', specs.vibration],
            ['📡', 'Wireless Range', specs.wireless_range],
            ['💡', 'Lighting', specs.lighting],
            ['🛡️', 'Warranty', showProduct.warranty]
        ]

    } else if (deviceType === 'Gaming Desktop') {

        heroSpecs = [
            ['⚙️', 'Processor', specs.processor],
            ['🧩', 'Cores', specs.cores],
            ['🧠', 'RAM', specs.ram],
            ['💾', 'Storage', specs.storage],
            ['🎮', 'GPU', specs.gpu],
            ['🧠', 'GPU Memory', specs.gpu_memory]
        ]

        detailSpecs = [
            ['⚙️', 'Processor', specs.processor],
            ['🧩', 'Cores', specs.cores],
            ['🧠', 'RAM', specs.ram],
            ['💾', 'Storage', specs.storage],
            ['🎮', 'GPU', specs.gpu],
            ['🧠', 'GPU Memory', specs.gpu_memory],
            ['🔌', 'Power Supply', specs.power_supply],
            ['🪟', 'Operating System', specs.operating_system],
            ['🌐', 'Connectivity', specs.connectivity]
        ]
    }


    boxProduct.innerHTML = `

        <section class="product-hero">

            <div class="product-gallery">

                <div class="thumbnails">

                    ${showProduct.images.map((image, index) => `
                        <button
                            class="thumb ${index === 0 ? 'active' : ''}"
                            type="button"
                        >
                            <img
                                src="${image}"
                                alt="${showProduct.title}"
                            >
                        </button>
                    `).join('')}

                </div>


                <div class="main-image-wrapper">

                    <img
                        class="main-image"
                        src="${showProduct.images[0]}"
                        alt="${showProduct.title}"
                    >

                </div>

            </div>


            <div class="product-info">

                <h1 class="product-title">
                    ${showProduct.title}
                </h1>


                <div class="price-container">

                    <span class="current-price">
                        $${showProduct.price}
                    </span>

                </div>


                <div class="color-selection">

                    <label>
                        Select color:
                    </label>

                    <div class="color-options">

                        ${showProduct.colors.map((color, index) => `
                            <button
                                class="color-dot ${index === 0 ? 'active' : ''}"
                                type="button"
                                title="${color}"
                                aria-label="${color}"
                                style="--dot-color: ${color};"
                            ></button>
                        `).join('')}

                    </div>

                </div>


                <div class="specs-grid">

                    ${heroSpecs.map(([icon, name, value]) => `

                        <div class="spec-card">

                            <div class="spec-icon">
                                ${icon}
                            </div>

                            <div>

                                <small>
                                    ${name}
                                </small>

                                <strong>
                                    ${value}
                                </strong>

                            </div>

                        </div>

                    `).join('')}

                </div>


                <div class="product-description">

                    <h3>
                        Description
                    </h3>

                    <p>
                        ${showProduct.description}
                    </p>

                </div>


                <div class="action-buttons">

                    <button
                        class="btn btn-wishlist"
                        type="button"
                    >
                        ♡ Add to Wishlist
                    </button>

                    <button
                        class="btn btn-cart"
                        type="button"
                    >
                        Add to Cart
                    </button>

                </div>


                <div class="delivery-info">

                    <div class="delivery-item">

                        <span class="icon">
                            🚚
                        </span>

                        <div>

                            <small>
                                Free Delivery
                            </small>

                            <strong>
                                1-2 business days
                            </strong>

                        </div>

                    </div>


                    <div class="delivery-item">

                        <span class="icon">
                            ✓
                        </span>

                        <div>

                            <small>
                                In Stock
                            </small>

                            <strong>
                                ${showProduct.stock > 0
                                    ? `${showProduct.stock} available`
                                    : 'Currently unavailable'
                                }
                            </strong>

                        </div>

                    </div>


                    <div class="delivery-item">

                        <span class="icon">
                            🛡️
                        </span>

                        <div>

                            <small>
                                Warranty
                            </small>

                            <strong>
                                ${showProduct.warranty}
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </section>


        <section class="product-details-section">

            <div class="details-container">

                <h2>
                    Product Details
                </h2>

                <p class="details-intro">
                    Detailed specifications and technical information
                    about this ${deviceType.toLowerCase()}.
                </p>


                <h3 class="details-subtitle">
                    Technical Specifications
                </h3>


                <div class="specs-table">

                    ${detailSpecs.map(([icon, name, value]) => `

                        <div class="table-row">

                            <span>
                                ${icon} ${name}
                            </span>

                            <span class="text-right">
                                ${value}
                            </span>

                        </div>

                    `).join('')}

                </div>


                <div class="view-more-wrapper">

                    <button
                        class="btn-view-more"
                        type="button"
                    >
                        View More

                        <span class="arrow-icon">
                            →
                        </span>

                    </button>

                </div>

            </div>

        </section>

    `
}
        

        
    }
}

export { productsDetail }