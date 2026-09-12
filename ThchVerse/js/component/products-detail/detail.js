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
        let urlCategory = product.find(item => {
            return item.id === urlId
        })
        urlCategory = urlCategory.category
        

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

    <div class="details-heading">
      <span class="section-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3v18M3 12h18"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      </span>

      <div>
        <h2>Details</h2>
        <p class="details-intro">
          ${showProduct.description}
        </p>
      </div>
    </div>


    <!-- ================= DISPLAY ================= -->
    <div class="details-group">

      <div class="details-group-title">
        <span class="group-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M8 21h8M12 19v2"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>
        </span>

        <h3>Display</h3>
      </div>

      <table class="specs-table">

        <tr class="table-row">
          <td>Screen diagonal</td>
          <td class="text-right spec-value">
            ${showProduct.specifications.display}
          </td>
        </tr>

        <tr class="table-row">
          <td>Screen resolution</td>
          <td class="text-right spec-value">
            ${showProduct.specifications.resolution}
          </td>
        </tr>

        <tr class="table-row">
          <td>Refresh rate</td>
          <td class="text-right spec-value">
            ${showProduct.specifications.refresh_rate}
          </td>
        </tr>

        <tr class="table-row">
          <td>Screen type</td>
          <td class="text-right spec-value">
            ${showProduct.specifications.screen_type}
          </td>
        </tr>

      </table>
    </div>


    <!-- ================= EXTRA DETAILS ================= -->
    <div class="details-extra">


      <!-- ================= PERFORMANCE ================= -->
      <div class="details-group">

        <div class="details-group-title">
          <span class="group-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v4M12 17v4M3 12h4M17 12h4"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
              <circle
                cx="12"
                cy="12"
                r="5"
                stroke="currentColor"
                stroke-width="1.7"
              />
            </svg>
          </span>

          <h3>Performance</h3>
        </div>

        <table class="specs-table">

          <tr class="table-row">
            <td>Processor</td>
            <td class="text-right spec-value">
              ${showProduct.specifications.processor}
            </td>
          </tr>

          <tr class="table-row">
            <td>Number of cores</td>
            <td class="text-right spec-value">
              ${showProduct.specifications.cores}
            </td>
          </tr>

          <tr class="table-row">
            <td>RAM</td>
            <td class="text-right spec-value">
              ${showProduct.specifications.ram}
            </td>
          </tr>

          <tr class="table-row">
            <td>Storage</td>
            <td class="text-right spec-value">
              ${showProduct.specifications.storage}
            </td>
          </tr>

          <tr class="table-row">
            <td>Operating system</td>
            <td class="text-right spec-value">
              ${showProduct.specifications.operating_system}
            </td>
          </tr>

        </table>
      </div>


      <!-- ================= CAMERA ================= -->
      <div class="details-group">

        <div class="details-group-title">
          <span class="group-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h4l1.5-2h5L16 7h4v12H4V7Z"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <circle
                cx="12"
                cy="13"
                r="3.5"
                stroke="currentColor"
                stroke-width="1.7"
              />
            </svg>
          </span>

          <h3>Camera</h3>
        </div>

        <table class="specs-table">

          <tr class="table-row">
            <td>Main camera</td>
            <td class="text-right spec-value">
              ${showProduct.specifications.main_camera}
            </td>
          </tr>

          <tr class="table-row">
            <td>Front camera</td>
            <td class="text-right spec-value">
              ${showProduct.specifications.front_camera}
            </td>
          </tr>

        </table>
      </div>


      <!-- ================= BATTERY ================= -->
      <div class="details-group">

        <div class="details-group-title">
          <span class="group-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect
                x="4"
                y="7"
                width="15"
                height="10"
                rx="2"
                stroke="currentColor"
                stroke-width="1.7"
              />
              <path
                d="M19 10h2v4h-2M11 9l-2 3h3l-2 3"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <h3>Battery & Charging</h3>
        </div>

        <table class="specs-table">

          <tr class="table-row">
            <td>Battery capacity</td>
            <td class="text-right spec-value">
              ${showProduct.specifications.battery}
            </td>
          </tr>

          <tr class="table-row">
            <td>Charging</td>
            <td class="text-right spec-value">
              ${showProduct.specifications.charging}
            </td>
          </tr>

        </table>
      </div>


      <!-- ================= CONNECTIVITY ================= -->
      <div class="details-group">

        <div class="details-group-title">
          <span class="group-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M5 9a10 10 0 0 1 14 0M8 12a6 6 0 0 1 8 0M11 15a2 2 0 0 1 2 0"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
              <circle
                cx="12"
                cy="18"
                r="1"
                fill="currentColor"
              />
            </svg>
          </span>

          <h3>Connectivity</h3>
        </div>

        <table class="specs-table">

          <tr class="table-row">
            <td>Network</td>
            <td class="text-right spec-value">
              ${showProduct.specifications.network}
            </td>
          </tr>

        </table>
      </div>


      <!-- ================= PROTECTION ================= -->
      <div class="details-group">

        <div class="details-group-title">
          <span class="group-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3l7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3Z"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="m9 12 2 2 4-4"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <h3>Protection</h3>
        </div>

        <table class="specs-table">

          <tr class="table-row">
            <td>Protection class</td>
            <td class="text-right spec-value">
              ${showProduct.specifications.protection}
            </td>
          </tr>

        </table>
      </div>

    </div>


    <!-- ================= VIEW MORE ================= -->
    <div class="view-more-wrapper">

      <button class="btn-view-more" type="button">

        <span class="view-more-text">
          View More
        </span>

        <span class="arrow-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

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


        <!-- ================= DETAILS HEADER ================= -->

        <div class="details-heading">

            <span class="section-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 3v18M3 12h18"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                    />
                </svg>
            </span>

            <div>
                <h2>Details</h2>

                <p class="details-intro">
                    ${showProduct.description}
                </p>
            </div>

        </div>


        <!-- ================= DISPLAY ================= -->

        <div class="details-group">

            <div class="details-group-title">

                <span class="group-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                            stroke="currentColor"
                            stroke-width="1.7"
                        />

                        <path
                            d="M8 21h8M12 19v2"
                            stroke="currentColor"
                            stroke-width="1.7"
                            stroke-linecap="round"
                        />
                    </svg>
                </span>

                <h3>Display</h3>

            </div>


            <table class="specs-table">

                <tr class="table-row">
                    <td>Display</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.display}
                    </td>
                </tr>


                <tr class="table-row">
                    <td>Resolution</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.resolution}
                    </td>
                </tr>


                <tr class="table-row">
                    <td>Screen type</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.screen_type}
                    </td>
                </tr>


                <tr class="table-row">
                    <td>Protection</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.protection}
                    </td>
                </tr>

            </table>

        </div>


        <!-- ================= EXTRA DETAILS ================= -->

        <div class="details-extra">


            <!-- ================= HEALTH & CONNECTIVITY ================= -->

            <div class="details-group">

                <div class="details-group-title">

                    <span class="group-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">

                            <path
                                d="M12 21s-7-4.4-7-10V5l7-2 7 2v6c0 5.6-7 10-7 10Z"
                                stroke="currentColor"
                                stroke-width="1.7"
                                stroke-linejoin="round"
                            />

                            <path
                                d="M9 12h6M12 9v6"
                                stroke="currentColor"
                                stroke-width="1.7"
                                stroke-linecap="round"
                            />

                        </svg>
                    </span>

                    <h3>Health & Connectivity</h3>

                </div>


                <table class="specs-table">

                    <tr class="table-row">
                        <td>Sensors</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.sensors}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Health features</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.health_features}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>GPS</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.gps}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Connectivity</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.connectivity}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Compatibility</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.compatibility}
                        </td>
                    </tr>

                </table>

            </div>


            <!-- ================= BATTERY & CHARGING ================= -->

            <div class="details-group">

                <div class="details-group-title">

                    <span class="group-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">

                            <rect
                                x="4"
                                y="7"
                                width="15"
                                height="10"
                                rx="2"
                                stroke="currentColor"
                                stroke-width="1.7"
                            />

                            <path
                                d="M19 10h2v4h-2M11 9l-2 3h3l-2 3"
                                stroke="currentColor"
                                stroke-width="1.7"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />

                        </svg>
                    </span>

                    <h3>Battery & Charging</h3>

                </div>


                <table class="specs-table">

                    <tr class="table-row">
                        <td>Battery</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.battery}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Charging</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.charging}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Storage</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.storage}
                        </td>
                    </tr>

                </table>

            </div>

        </div>


        <!-- ================= VIEW MORE ================= -->

        <div class="view-more-wrapper">

            <button
                class="btn-view-more"
                type="button"
                aria-expanded="false"
            >

                <span class="view-more-text">
                    View More
                </span>

                <span
                    class="arrow-icon"
                    aria-hidden="true"
                >

                    <svg viewBox="0 0 24 24" fill="none">
                        <path
                            d="m6 9 6 6 6-6"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                </span>

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


        <!-- ================= DETAILS HEADER ================= -->

        <div class="details-heading">

            <span class="section-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 3v18M3 12h18"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                    />
                </svg>
            </span>

            <div>
                <h2>Details</h2>

                <p class="details-intro">
                    ${showProduct.description}
                </p>
            </div>

        </div>


        <!-- ================= IMAGE & SENSOR ================= -->

        <div class="details-group">

            <div class="details-group-title">

                <span class="group-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">

                        <path
                            d="M4 7h4l1.5-2h5L16 7h4v12H4V7Z"
                            stroke="currentColor"
                            stroke-width="1.7"
                            stroke-linejoin="round"
                        />

                        <circle
                            cx="12"
                            cy="13"
                            r="3.5"
                            stroke="currentColor"
                            stroke-width="1.7"
                        />

                    </svg>
                </span>

                <h3>Image & Sensor</h3>

            </div>


            <table class="specs-table">

                <tr class="table-row">
                    <td>Sensor</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.sensor}
                    </td>
                </tr>


                <tr class="table-row">
                    <td>Resolution</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.resolution}
                    </td>
                </tr>


                <tr class="table-row">
                    <td>Lens mount</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.lens_mount}
                    </td>
                </tr>


                <tr class="table-row">
                    <td>Lens</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.lens}
                    </td>
                </tr>


                <tr class="table-row">
                    <td>Stabilization</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.stabilization}
                    </td>
                </tr>


                <tr class="table-row">
                    <td>Autofocus</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.autofocus}
                    </td>
                </tr>

            </table>

        </div>


        <!-- ================= EXTRA DETAILS ================= -->

        <div class="details-extra">


            <!-- ================= VIDEO & EXPOSURE ================= -->

            <div class="details-group">

                <div class="details-group-title">

                    <span class="group-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">

                            <rect
                                x="3"
                                y="6"
                                width="14"
                                height="12"
                                rx="2"
                                stroke="currentColor"
                                stroke-width="1.7"
                            />

                            <path
                                d="m17 10 4-2v8l-4-2"
                                stroke="currentColor"
                                stroke-width="1.7"
                                stroke-linejoin="round"
                            />

                        </svg>
                    </span>

                    <h3>Video & Exposure</h3>

                </div>


                <table class="specs-table">

                    <tr class="table-row">
                        <td>Video</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.video}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>ISO range</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.iso_range}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Shutter speed</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.shutter_speed}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Screen</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.screen}
                        </td>
                    </tr>

                </table>

            </div>


            <!-- ================= BATTERY & CONNECTIVITY ================= -->

            <div class="details-group">

                <div class="details-group-title">

                    <span class="group-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">

                            <rect
                                x="4"
                                y="7"
                                width="15"
                                height="10"
                                rx="2"
                                stroke="currentColor"
                                stroke-width="1.7"
                            />

                            <path
                                d="M19 10h2v4h-2M11 9l-2 3h3l-2 3"
                                stroke="currentColor"
                                stroke-width="1.7"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />

                        </svg>
                    </span>

                    <h3>Battery & Connectivity</h3>

                </div>


                <table class="specs-table">

                    <tr class="table-row">
                        <td>Battery</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.battery}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Connectivity</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.connectivity}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Weight</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.weight}
                        </td>
                    </tr>

                </table>

            </div>

        </div>


        <!-- ================= VIEW MORE ================= -->

        <div class="view-more-wrapper">

            <button
                class="btn-view-more"
                type="button"
                aria-expanded="false"
            >

                <span class="view-more-text">
                    View More
                </span>

                <span
                    class="arrow-icon"
                    aria-hidden="true"
                >

                    <svg viewBox="0 0 24 24" fill="none">
                        <path
                            d="m6 9 6 6 6-6"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                </span>

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

<!-- =========================================================
     SECTION 2: HEADPHONES DETAILS
     ========================================================= -->

<section class="product-details-section animate-slide-up">

    <div class="details-container">


        <!-- ================= DETAILS HEADER ================= -->

        <div class="details-heading">

            <span class="section-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 3v18M3 12h18"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                    />
                </svg>
            </span>

            <div>
                <h2>Details</h2>

                <p class="details-intro">
                    ${showProduct.description}
                </p>
            </div>

        </div>


        <!-- ================= AUDIO ================= -->

        <div class="details-group">

            <div class="details-group-title">

                <span class="group-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">

                        <path
                            d="M4 13v-1a8 8 0 0 1 16 0v1"
                            stroke="currentColor"
                            stroke-width="1.7"
                            stroke-linecap="round"
                        />

                        <path
                            d="M4 13h3v6H5a1 1 0 0 1-1-1v-5ZM20 13h-3v6h2a1 1 0 0 0 1-1v-5Z"
                            stroke="currentColor"
                            stroke-width="1.7"
                            stroke-linejoin="round"
                        />

                    </svg>
                </span>

                <h3>Audio</h3>

            </div>


            <table class="specs-table">

                <tr class="table-row">
                    <td>Type</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.type}
                    </td>
                </tr>


                <tr class="table-row">
                    <td>Driver</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.driver}
                    </td>
                </tr>


                <tr class="table-row">
                    <td>Frequency Response</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.frequency_response}
                    </td>
                </tr>


                <tr class="table-row">
                    <td>Noise Cancellation</td>

                    <td class="text-right spec-value">
                        ${showProduct.specifications.noise_cancellation}
                    </td>
                </tr>

            </table>

        </div>


        <!-- ================= EXTRA DETAILS ================= -->

        <div class="details-extra">


            <!-- ================= CONNECTIVITY ================= -->

            <div class="details-group">

                <div class="details-group-title">

                    <span class="group-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">

                            <path
                                d="M7 12h10"
                                stroke="currentColor"
                                stroke-width="1.7"
                                stroke-linecap="round"
                            />

                            <path
                                d="M9 8.5 5.5 12 9 15.5M15 8.5l3.5 3.5-3.5 3.5"
                                stroke="currentColor"
                                stroke-width="1.7"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />

                        </svg>
                    </span>

                    <h3>Connectivity</h3>

                </div>


                <table class="specs-table">

                    <tr class="table-row">
                        <td>Connectivity</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.connection}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Codec</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.codec}
                        </td>
                    </tr>

                </table>

            </div>


            <!-- ================= BATTERY & DESIGN ================= -->

            <div class="details-group">

                <div class="details-group-title">

                    <span class="group-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">

                            <rect
                                x="4"
                                y="7"
                                width="15"
                                height="10"
                                rx="2"
                                stroke="currentColor"
                                stroke-width="1.7"
                            />

                            <path
                                d="M19 10h2v4h-2M11 9l-2 3h3l-2 3"
                                stroke="currentColor"
                                stroke-width="1.7"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />

                        </svg>
                    </span>

                    <h3>Battery & Design</h3>

                </div>


                <table class="specs-table">

                    <tr class="table-row">
                        <td>Battery</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.battery}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Charging</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.charging}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Weight</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.weight}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Water Resistance</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.water_resistance}
                        </td>
                    </tr>


                    <tr class="table-row">
                        <td>Microphone</td>

                        <td class="text-right spec-value">
                            ${showProduct.specifications.microphone}
                        </td>
                    </tr>

                </table>

            </div>

        </div>


        <!-- ================= VIEW MORE ================= -->

        <div class="view-more-wrapper">

            <button
                class="btn-view-more"
                type="button"
                aria-expanded="false"
            >

                <span class="view-more-text">
                    View More
                </span>

                <span
                    class="arrow-icon"
                    aria-hidden="true"
                >

                    <svg viewBox="0 0 24 24" fill="none">
                        <path
                            d="m6 9 6 6 6-6"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                </span>

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

        <!-- ================= HEADER ================= -->

        <h2 class="details-heading">

            <svg
                class="details-heading-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
            >
                <rect x="3" y="4" width="18" height="13" rx="2"/>
                <path d="M8 21h8"/>
                <path d="M12 17v4"/>
            </svg>

            Details

        </h2>


        <p class="details-intro">
            ${showProduct.description}
        </p>


        <!-- ================= DISPLAY ================= -->

        <div class="details-group">

            <h3 class="details-group-title">

                <svg
                    class="group-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    aria-hidden="true"
                >
                    <rect x="3" y="4" width="18" height="13" rx="2"/>
                    <path d="M8 21h8"/>
                    <path d="M12 17v4"/>
                </svg>

                Display

            </h3>


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

                    <td>Refresh Rate</td>

                    <td class="text-right">
                        ${showProduct.specifications.refresh_rate}
                    </td>

                </tr>

            </table>

        </div>


        <!-- ================= EXTRA DETAILS ================= -->

        <div class="details-extra">


            <!-- ================= PERFORMANCE ================= -->

            <div class="details-group">

                <h3 class="details-group-title">

                    <svg
                        class="group-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        aria-hidden="true"
                    >
                        <path d="M9 3h6"/>
                        <path d="M10 3v4"/>
                        <path d="M14 3v4"/>
                        <rect x="4" y="7" width="16" height="14" rx="2"/>
                        <path d="M8 11h8"/>
                        <path d="M8 15h3"/>
                        <path d="M13 15h3"/>
                        <path d="M8 18h8"/>
                    </svg>

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

            </div>


            <!-- ================= SYSTEM & CONNECTIVITY ================= -->

            <div class="details-group">

                <h3 class="details-group-title">

                    <svg
                        class="group-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.5 1.5-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.1v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.5-1.5.1-.1A1.7 1.7 0 0 0 9.1 15a1.7 1.7 0 0 0-1.5-1H7.4v-2.1h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.5-1.5.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.1v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.5 1.5-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1z"/>
                    </svg>

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

            </div>

        </div>


        <!-- ================= VIEW MORE ================= -->

        <div class="view-more-wrapper">

            <button
                class="btn-view-more"
                aria-expanded="false"
            >

                View More

                <span class="arrow-icon">

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        aria-hidden="true"
                    >
                        <path d="m6 9 6 6 6-6"/>
                    </svg>

                </span>

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


    const visibleSpecs = detailSpecs.slice(0, 6)
    const extraSpecs = detailSpecs.slice(6)


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


                <h2 class="details-heading">

                    <svg
                        class="details-heading-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        aria-hidden="true"
                    >
                        <path d="M7 8h10a5 5 0 0 1 4.8 6.4l-1 3.2a2.5 2.5 0 0 1-4.6.4l-.7-1.4H8.5l-.7 1.4a2.5 2.5 0 0 1-4.6-.4l-1-3.2A5 5 0 0 1 7 8Z"/>
                        <path d="M8 12v4"/>
                        <path d="M6 14h4"/>
                        <circle cx="16.5" cy="13" r=".8"/>
                        <circle cx="18.5" cy="15" r=".8"/>
                    </svg>

                    Details

                </h2>


                <p class="details-intro">
                    Detailed specifications and technical information
                    about this ${deviceType.toLowerCase()}.
                </p>


                <div class="details-group">

                    <h3 class="details-group-title">

                        <svg
                            class="group-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            aria-hidden="true"
                        >
                            <path d="M12 3v18"/>
                            <path d="M3 12h18"/>
                            <circle cx="12" cy="12" r="8"/>
                        </svg>

                        Technical Specifications

                    </h3>


                    <table class="specs-table">

                        <tbody>

                            ${visibleSpecs.map(([icon, name, value]) => `

                                <tr class="table-row">

                                    <td>
                                        <span class="spec-label-icon">
                                            ${icon}
                                        </span>

                                        ${name}
                                    </td>

                                    <td class="text-right">
                                        ${value}
                                    </td>

                                </tr>

                            `).join('')}

                        </tbody>

                    </table>

                </div>


                ${
                    extraSpecs.length > 0
                        ? `
                            <div class="details-extra">

                                <table class="specs-table">

                                    <tbody>

                                        ${extraSpecs.map(([icon, name, value]) => `

                                            <tr class="table-row">

                                                <td>
                                                    <span class="spec-label-icon">
                                                        ${icon}
                                                    </span>

                                                    ${name}
                                                </td>

                                                <td class="text-right">
                                                    ${value}
                                                </td>

                                            </tr>

                                        `).join('')}

                                    </tbody>

                                </table>

                            </div>


                            <div class="view-more-wrapper">

                                <button
                                    class="btn-view-more"
                                    type="button"
                                    aria-expanded="false"
                                >

                                    View More

                                    <span class="arrow-icon">

                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            aria-hidden="true"
                                        >
                                            <path d="m6 9 6 6 6-6"/>
                                        </svg>

                                    </span>

                                </button>

                            </div>
                        `
                        : ''
                }

            </div>

        </section>

    `
} else if (urlId === 0) {

    
    const sectionComment = document.querySelector('.reviews-section')
    sectionComment.style.display = 'none'
    
    boxProduct.innerHTML = `
        
        <div class="product-not-found">
            <div class="not-found-icon">🔍</div>
        
            <h2>Product Not Found</h2>
        
            <p>
                We couldn't find the product you're looking for.
                The product may have been removed or the link may be invalid.
            </p>
        
            <a href="/ThchVerse/pages/products.html" class="back-to-products">
                Back to Products
            </a>
        </div>
            `
        }        
        
        const buttonShowMore = this.shadowRoot.querySelector('.btn-view-more')
        const detailsSection = this.shadowRoot.querySelector('.product-details-section')
        
        if (buttonShowMore && detailsSection) {
        
            buttonShowMore.addEventListener('click', () => {
        
                const isExpanded =
                    detailsSection.classList.toggle('expanded')
        
                buttonShowMore.setAttribute(
                    'aria-expanded',
                    String(isExpanded)
                )
        
            })
        
        }

        const galleryContainer = this.shadowRoot.querySelector('.product-gallery');
        const mainImage = this.shadowRoot.querySelector('.main-image-wrapper img'); // ← خود img
        
        galleryContainer.addEventListener('click', event => {
            
            const thumbnails = event.target.closest('.thumbnails');
            if (!thumbnails) return;
        
            const clickedImg = event.target.closest('img');
            if (!clickedImg) return;
        
            if (mainImage) {
                mainImage.src = clickedImg.src;
            }
        });
    }
}

export { productsDetail }