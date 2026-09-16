import { getProducts } from "/js/component/products-box/products.js";

const template = document.createElement("template");

template.innerHTML = `
  <link
    rel="stylesheet"
    href="/ThchVerse/js/component/products-detail/detail.css"
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

    /*
      ================================================
      PRODUCT NOT FOUND
      ================================================
    */

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

    /*
      ================================================
      RENDER CATEGORY
      ================================================
    */

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
        this.renderNotFound(
          boxProduct,
          "This product category is not supported yet.",
        );

        return;
    }

    /*
      ================================================
      EVENTS
      ================================================
    */

    this.bindEvents();
  }

  /* =====================================================
     PRODUCT NOT FOUND
  ===================================================== */

  renderNotFound(
    boxProduct,
    message = "We couldn't find the product you're looking for.",
  ) {
    const reviews = document.querySelector(".reviews-section");

    if (reviews) {
      reviews.style.display = "none";
    }

    boxProduct.innerHTML = `

      <div class="product-not-found">

        <div class="not-found-icon">
          🔍
        </div>

        <h2>
          Product Not Found
        </h2>

        <p>
          ${message}
        </p>

        <a
          href="/ThchVerse/pages/products.html"
          class="back-to-products"
        >
          Back to Products
        </a>

      </div>

    `;
  }

  /* =====================================================
     COMMON DATA
  ===================================================== */

  getImages(product) {
    return Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  }

  getColors(product) {
    return Array.isArray(product.colors) ? product.colors.filter(Boolean) : [];
  }

  getSpecs(product) {
    return product.specifications || {};
  }

  getOriginalPrice(product) {
    return Math.round(Number(product.price || 0) * 1.15);
  }

  /* =====================================================
     GALLERY HTML
  ===================================================== */

  renderGallery(product) {
    const images = this.getImages(product);

    const fallback = images[0] || "";

    return `

      <div class="product-gallery">

        <div class="thumbnails">

          ${images
            .map(
              (image, index) => `

              <button
                class="thumb ${index === 0 ? "active" : ""}"
                type="button"
                aria-label="View image ${index + 1}"
              >

                <img
                  src="${image}"
                  alt="${product.title}"
                >

              </button>

          `,
            )
            .join("")}

        </div>


        <div class="main-image-wrapper">

          <img
            src="${fallback}"
            class="main-image"
            alt="${product.title}"
          >

        </div>

      </div>

    `;
  }

  /* =====================================================
     COLORS HTML
  ===================================================== */

  renderColors(product) {
    const colors = this.getColors(product);

    if (!colors.length) {
      return "";
    }

    return `

      <div class="color-selection">

        <label>
          Select color :
        </label>

        <div class="color-options">

          ${colors
            .map(
              (color, index) => `

              <button
                class="color-dot ${index === 0 ? "active" : ""}"
                type="button"
                title="${color}"
                aria-label="${color}"
                style="--dot-color: ${color};"
              ></button>

          `,
            )
            .join("")}

        </div>

      </div>

    `;
  }

  /* =====================================================
     DELIVERY HTML
  ===================================================== */

  renderDelivery(product) {
    return `

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
              ${
                Number(product.stock) > 0
                  ? `${product.stock} available`
                  : "Currently unavailable"
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
              ${product.warranty || "Not specified"}
            </strong>

          </div>

        </div>

      </div>

    `;
  }

  /* =====================================================
     ACTION BUTTONS
  ===================================================== */

  renderActions() {
    return `

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

    `;
  }

  /* =====================================================
     GENERIC HERO
  ===================================================== */

  renderHero(product, heroSpecs, options = {}) {
    const storage = options.storage || "";

    return `

      <section class="product-hero">

        ${this.renderGallery(product)}


        <div class="product-info">

          <h1 class="product-title">
            ${product.title}
          </h1>


          <div class="price-container">

            <span class="current-price">
              $${product.price}
            </span>

            ${
              options.showOriginalPrice !== false
                ? `
                  <span class="original-price">
                    $${this.getOriginalPrice(product)}
                  </span>
                `
                : ""
            }

          </div>


          ${this.renderColors(product)}


          ${
            storage
              ? `
                <div class="storage-selection">
                  ${storage}
                </div>
              `
              : ""
          }


          <div class="specs-grid">

            ${heroSpecs
              .map(
                ([icon, name, value]) => `

                <div class="spec-card">

                  <div class="spec-icon">
                    ${icon}
                  </div>

                  <div>

                    <small>
                      ${name}
                    </small>

                    <strong>
                      ${value ?? "N/A"}
                    </strong>

                  </div>

                </div>

            `,
              )
              .join("")}

          </div>


          <div class="product-description">

            <h3>
              Description
            </h3>

            <p>
              ${product.description || ""}
            </p>

          </div>


          ${this.renderActions()}


          ${this.renderDelivery(product)}

        </div>

      </section>

    `;
  }

  /* =====================================================
     DETAILS HTML
  ===================================================== */

  renderDetails(product, groups, intro, allowViewMore = true) {
    return `

      <section class="product-details-section">

        <div class="details-container">


          <div class="details-heading">

            <span
              class="section-icon"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3v18M3 12h18"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </span>


            <div>

              <h2>
                Details
              </h2>

              <p class="details-intro">
                ${intro}
              </p>

            </div>

          </div>


          ${groups
            .map(
              (group, groupIndex) => `

              <div
                class="details-group ${groupIndex > 0 ? "details-extra" : ""}"
              >

                <div class="details-group-title">

                  <span
                    class="group-icon"
                    aria-hidden="true"
                  >
                    ${
                      group.icon ||
                      `
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="8"
                            stroke="currentColor"
                            stroke-width="1.7"
                          />
                        </svg>
                      `
                    }
                  </span>

                  <h3>
                    ${group.title}
                  </h3>

                </div>


                <table class="specs-table">

                  <tbody>

                    ${group.rows
                      .map(
                        ([label, value]) => `

                        <tr class="table-row">

                          <td>
                            ${label}
                          </td>

                          <td class="text-right spec-value">
                            ${value ?? "N/A"}
                          </td>

                        </tr>

                    `,
                      )
                      .join("")}

                  </tbody>

                </table>

              </div>

          `,
            )
            .join("")}


          ${
            allowViewMore
              ? `
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

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                      >

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
              `
              : ""
          }

        </div>

      </section>

    `;
  }

  /* =====================================================
     PHONES
  ===================================================== */

  renderPhones(boxProduct, product) {
    const specs = this.getSpecs(product);

    const storageOptions = Array.isArray(product.storage_options)
      ? product.storage_options
      : [];

    const storageButtons = storageOptions
      .map(
        (storage, index) => `

          <button
            class="storage-btn ${index === 0 ? "active" : ""}"
            type="button"
          >
            ${storage}
          </button>

      `,
      )
      .join("");

    const heroSpecs = [
      ["📱", "Display", specs.display],

      ["⚙️", "CPU", specs.processor],

      ["🧩", "RAM", specs.ram],

      ["📸", "Main Camera", specs.main_camera],

      ["🤳", "Front Camera", specs.front_camera],

      ["🔋", "Battery", specs.battery],
    ];

    const detailsGroups = [
      {
        title: "Display",

        rows: [
          ["Screen diagonal", specs.display],
          ["Screen resolution", specs.resolution],
          ["Refresh rate", specs.refresh_rate],
          ["Screen type", specs.screen_type],
        ],
      },

      {
        title: "Performance",

        rows: [
          ["Processor", specs.processor],
          ["Number of cores", specs.cores],
          ["RAM", specs.ram],
          ["Storage", specs.storage],
          ["Operating system", specs.operating_system],
        ],
      },

      {
        title: "Camera",

        rows: [
          ["Main camera", specs.main_camera],
          ["Front camera", specs.front_camera],
        ],
      },

      {
        title: "Battery & Charging",

        rows: [
          ["Battery capacity", specs.battery],
          ["Charging", specs.charging],
        ],
      },

      {
        title: "Connectivity",

        rows: [["Network", specs.network]],
      },

      {
        title: "Protection",

        rows: [["Protection class", specs.protection]],
      },
    ];

    boxProduct.innerHTML = `

      ${this.renderHero(product, heroSpecs, {
        storage: storageButtons,
      })}


      ${this.renderDetails(product, detailsGroups, product.description || "")}

    `;
  }

  /* =====================================================
     SMARTWATCHES
  ===================================================== */

  renderSmartwatches(boxProduct, product) {
    const specs = this.getSpecs(product);

    const heroSpecs = [
      ["⌚", "Display", specs.display],

      ["❤️", "Sensors", specs.sensors],

      ["🔋", "Battery", specs.battery],

      ["📍", "GPS", specs.gps],

      ["📡", "Connectivity", specs.connectivity],

      ["📱", "Compatibility", specs.compatibility],
    ];

    const detailsGroups = [
      {
        title: "Display",

        rows: [
          ["Display", specs.display],
          ["Resolution", specs.resolution],
          ["Screen type", specs.screen_type],
          ["Protection", specs.protection],
        ],
      },

      {
        title: "Health & Connectivity",

        rows: [
          ["Sensors", specs.sensors],
          ["Health features", specs.health_features],
          ["GPS", specs.gps],
          ["Connectivity", specs.connectivity],
          ["Compatibility", specs.compatibility],
        ],
      },

      {
        title: "Battery & Charging",

        rows: [
          ["Battery", specs.battery],
          ["Charging", specs.charging],
          ["Storage", specs.storage],
        ],
      },
    ];

    boxProduct.innerHTML = `

      ${this.renderHero(product, heroSpecs)}


      ${this.renderDetails(product, detailsGroups, product.description || "")}

    `;
  }

  /* =====================================================
     CAMERAS
  ===================================================== */

  renderCameras(boxProduct, product) {
    const specs = this.getSpecs(product);

    const heroSpecs = [
      ["📷", "Sensor", specs.sensor],

      ["🔍", "Resolution", specs.resolution],

      ["🎥", "Video", specs.video],

      ["🔭", "Lens", specs.lens],

      ["🎯", "Autofocus", specs.autofocus],

      ["⚖️", "Weight", specs.weight],
    ];

    const detailsGroups = [
      {
        title: "Image & Sensor",

        rows: [
          ["Sensor", specs.sensor],
          ["Resolution", specs.resolution],
          ["Lens mount", specs.lens_mount],
          ["Lens", specs.lens],
          ["Stabilization", specs.stabilization],
          ["Autofocus", specs.autofocus],
        ],
      },

      {
        title: "Video & Exposure",

        rows: [
          ["Video", specs.video],
          ["ISO range", specs.iso_range],
          ["Shutter speed", specs.shutter_speed],
          ["Screen", specs.screen],
        ],
      },

      {
        title: "Battery & Connectivity",

        rows: [
          ["Battery", specs.battery],
          ["Connectivity", specs.connectivity],
          ["Weight", specs.weight],
        ],
      },
    ];

    boxProduct.innerHTML = `

      ${this.renderHero(product, heroSpecs)}


      ${this.renderDetails(product, detailsGroups, product.description || "")}

    `;
  }

  /* =====================================================
     HEADPHONES
  ===================================================== */

  renderHeadphones(boxProduct, product) {
    const specs = this.getSpecs(product);

    const heroSpecs = [
      ["🎧", "Type", specs.type],

      ["🔊", "Driver", specs.driver],

      ["🔇", "Noise Cancellation", specs.noise_cancellation],

      ["🔋", "Battery", specs.battery],

      ["📡", "Connection", specs.connection],

      ["⚖️", "Weight", specs.weight],
    ];

    const detailsGroups = [
      {
        title: "Audio",

        rows: [
          ["Type", specs.type],
          ["Driver", specs.driver],
          ["Frequency Response", specs.frequency_response],
          ["Noise Cancellation", specs.noise_cancellation],
        ],
      },

      {
        title: "Connectivity",

        rows: [
          ["Connection", specs.connection],
          ["Codec", specs.codec],
        ],
      },

      {
        title: "Battery & Design",

        rows: [
          ["Battery", specs.battery],
          ["Charging", specs.charging],
          ["Weight", specs.weight],
          ["Water Resistance", specs.water_resistance],
          ["Microphone", specs.microphone],
        ],
      },
    ];

    boxProduct.innerHTML = `

      ${this.renderHero(product, heroSpecs)}


      ${this.renderDetails(product, detailsGroups, product.description || "")}

    `;
  }

  /* =====================================================
     COMPUTERS
  ===================================================== */

  renderComputers(boxProduct, product) {
    const specs = this.getSpecs(product);

    const storageOptions = Array.isArray(product.storage_options)
      ? product.storage_options
      : [];

    const storageButtons = storageOptions
      .map(
        (storage, index) => `

          <button
            class="storage-btn ${index === 0 ? "active" : ""}"
            type="button"
          >
            ${storage}
          </button>

      `,
      )
      .join("");

    const heroSpecs = [
      ["🖥️", "Display", specs.screen],

      ["⚙️", "Processor", specs.processor],

      ["🧩", "RAM", specs.ram],

      ["💾", "Storage", specs.storage],

      ["🎮", "GPU", specs.gpu],

      ["🧠", "GPU Memory", specs.gpu_memory],
    ];

    const detailsGroups = [
      {
        title: "Display",

        rows: [
          ["Screen", specs.screen],
          ["Resolution", specs.resolution],
          ["Refresh Rate", specs.refresh_rate],
        ],
      },

      {
        title: "Performance",

        rows: [
          ["Processor", specs.processor],
          ["CPU Cores", specs.cores],
          ["RAM", specs.ram],
          ["Storage", specs.storage],
          ["GPU", specs.gpu],
          ["GPU Memory", specs.gpu_memory],
        ],
      },

      {
        title: "System & Connectivity",

        rows: [
          ["Operating System", specs.operating_system],
          ["Ports", specs.ports],
          ["Connectivity", specs.connectivity],
          ["Battery", specs.battery],
          ["Weight", specs.weight],
        ],
      },
    ];

    boxProduct.innerHTML = `

      ${this.renderHero(product, heroSpecs, {
        storage: storageButtons,
      })}


      ${this.renderDetails(product, detailsGroups, product.description || "")}

    `;
  }

  /* =====================================================
     GAMING
  ===================================================== */

  renderGaming(boxProduct, product) {
    const specs = this.getSpecs(product);

    const deviceType = specs.device_type;

    const configurations = {
      "Gaming Monitor": {
        hero: [
          ["🖥️", "Display", specs.display],
          ["📐", "Resolution", specs.resolution],
          ["⚡", "Refresh Rate", specs.refresh_rate],
          ["⏱️", "Response Time", specs.response_time],
          ["🎨", "Panel Type", specs.panel_type],
          ["✨", "HDR", specs.hdr],
        ],

        details: [
          ["Display", specs.display],

          ["Resolution", specs.resolution],

          ["Refresh Rate", specs.refresh_rate],

          ["Response Time", specs.response_time],

          ["Panel Type", specs.panel_type],

          ["HDR", specs.hdr],

          ["Connectivity", specs.connectivity],

          ["Lighting", specs.lighting],
        ],
      },

      "Gaming Keyboard": {
        hero: [
          ["⌨️", "Type", specs.type],
          ["🔌", "Connection", specs.connection],
          ["⌨️", "Switches", specs.switches],
          ["🔤", "Layout", specs.layout],
          ["💻", "Compatibility", specs.compatibility],
          ["💡", "Lighting", specs.lighting],
        ],

        details: [
          ["Type", specs.type],

          ["Connection", specs.connection],

          ["Switches", specs.switches],

          ["Layout", specs.layout],

          ["Compatibility", specs.compatibility],

          ["Lighting", specs.lighting],

          ["Polling Rate", specs.polling_rate],

          ["Warranty", product.warranty],
        ],
      },

      "Gaming Mouse": {
        hero: [
          ["🔌", "Connection", specs.connection],
          ["🎯", "Sensor", specs.sensor],
          ["🎚️", "DPI", specs.dpi],
          ["🔘", "Buttons", specs.buttons],
          ["⚡", "Polling Rate", specs.polling_rate],
          ["🔋", "Battery", specs.battery],
        ],

        details: [
          ["Connection", specs.connection],

          ["Sensor", specs.sensor],

          ["DPI", specs.dpi],

          ["Buttons", specs.buttons],

          ["Polling Rate", specs.polling_rate],

          ["Compatibility", specs.compatibility],

          ["Lighting", specs.lighting],

          ["Battery", specs.battery],
        ],
      },

      "Gaming Headset": {
        hero: [
          ["🔌", "Connection", specs.connection],
          ["💻", "Compatibility", specs.compatibility],
          ["🎙️", "Microphone", specs.microphone],
          ["🔇", "Noise Cancellation", specs.noise_cancellation],
          ["🔋", "Battery", specs.battery],
          ["💡", "Lighting", specs.lighting],
        ],

        details: [
          ["Connection", specs.connection],

          ["Compatibility", specs.compatibility],

          ["Microphone", specs.microphone],

          ["Noise Cancellation", specs.noise_cancellation],

          ["Battery", specs.battery],

          ["Lighting", specs.lighting],

          ["Warranty", product.warranty],
        ],
      },

      "Game Controller": {
        hero: [
          ["🔌", "Connection", specs.connection],
          ["💻", "Compatibility", specs.compatibility],
          ["🔋", "Battery", specs.battery],
          ["🔘", "Buttons", specs.buttons],
          ["〰️", "Vibration", specs.vibration],
          ["📡", "Wireless Range", specs.wireless_range],
        ],

        details: [
          ["Connection", specs.connection],

          ["Compatibility", specs.compatibility],

          ["Battery", specs.battery],

          ["Buttons", specs.buttons],

          ["Vibration", specs.vibration],

          ["Wireless Range", specs.wireless_range],

          ["Lighting", specs.lighting],

          ["Warranty", product.warranty],
        ],
      },

      "Gaming Desktop": {
        hero: [
          ["⚙️", "Processor", specs.processor],
          ["🧩", "Cores", specs.cores],
          ["🧠", "RAM", specs.ram],
          ["💾", "Storage", specs.storage],
          ["🎮", "GPU", specs.gpu],
          ["🧠", "GPU Memory", specs.gpu_memory],
        ],

        details: [
          ["Processor", specs.processor],

          ["Cores", specs.cores],

          ["RAM", specs.ram],

          ["Storage", specs.storage],

          ["GPU", specs.gpu],

          ["GPU Memory", specs.gpu_memory],

          ["Power Supply", specs.power_supply],

          ["Operating System", specs.operating_system],

          ["Connectivity", specs.connectivity],
        ],
      },
    };

    const config = configurations[deviceType];

    if (!config) {
      this.renderNotFound(
        boxProduct,
        "This gaming product type is not supported yet.",
      );

      return;
    }

    const visibleSpecs = config.details.slice(0, 6);

    const extraSpecs = config.details.slice(6);

    const detailGroups = [
      {
        title: "Technical Specifications",

        rows: visibleSpecs.map((item) => [item[1], item[2]]),
      },
    ];

    if (extraSpecs.length) {
      detailGroups.push({
        title: "Additional Information",

        rows: extraSpecs.map((item) => [item[1], item[2]]),
      });
    }

    boxProduct.innerHTML = `

      ${this.renderHero(product, config.hero, {
        showOriginalPrice: false,
      })}


      ${this.renderDetails(
        product,
        detailGroups,
        `Detailed specifications and technical information about this ${deviceType.toLowerCase()}.`,
        extraSpecs.length > 0,
      )}

    `;
  }

  /* =====================================================
     EVENTS
  ===================================================== */

  bindEvents() {
    this.bindViewMore();

    this.bindGallery();

    this.bindColors();

    this.bindStorage();

    this.bindWishlist();

    this.bindCart();

    this.bindComments();
  }

  /* =====================================================
     VIEW MORE
  ===================================================== */

  bindViewMore() {
    const button = this.shadowRoot.querySelector(".btn-view-more");

    const section = this.shadowRoot.querySelector(".product-details-section");

    if (!button || !section) {
      return;
    }

    button.addEventListener("click", () => {
      const expanded = section.classList.toggle("expanded");

      button.setAttribute("aria-expanded", String(expanded));
    });
  }

  /* =====================================================
     GALLERY
  ===================================================== */

  bindGallery() {
    const gallery = this.shadowRoot.querySelector(".product-gallery");

    const mainImage = this.shadowRoot.querySelector(".main-image");

    if (!gallery || !mainImage) {
      return;
    }

    gallery.addEventListener("click", (event) => {
      const thumbnail = event.target.closest(".thumb");

      if (!thumbnail) {
        return;
      }

      const image = thumbnail.querySelector("img");

      if (!image) {
        return;
      }

      mainImage.src = image.src;

      const allThumbs = this.shadowRoot.querySelectorAll(".thumb");

      allThumbs.forEach((thumb) => {
        thumb.classList.remove("active");
      });

      thumbnail.classList.add("active");
    });
  }

  /* =====================================================
     COLORS
  ===================================================== */

  bindColors() {
    const container = this.shadowRoot.querySelector(".color-options");

    if (!container) {
      return;
    }

    container.addEventListener("click", (event) => {
      const button = event.target.closest(".color-dot");

      if (!button) {
        return;
      }

      const buttons = container.querySelectorAll(".color-dot");

      buttons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");
    });
  }

  /* =====================================================
     STORAGE
  ===================================================== */

  bindStorage() {
    const container = this.shadowRoot.querySelector(".storage-selection");

    if (!container) {
      return;
    }

    container.addEventListener("click", (event) => {
      const button = event.target.closest(".storage-btn");

      if (!button) {
        return;
      }

      if (button.classList.contains("disabled")) {
        return;
      }

      const buttons = container.querySelectorAll(".storage-btn");

      buttons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");
    });
  }

  /* =====================================================
     WISHLIST
  ===================================================== */

  bindWishlist() {
    const button = this.shadowRoot.querySelector(".btn-wishlist");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      button.classList.toggle("active");
    });
  }

  /* =====================================================
     CART
  ===================================================== */

  bindCart() {
    const button = this.shadowRoot.querySelector(".btn-cart");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      button.classList.add("added");

      button.textContent = "Added to Cart";
    });
  }

  /* =====================================================
     COMMENTS
  ===================================================== */

  bindComments() {
    const input = document.querySelector(".comment-input");

    const submit = document.querySelector(".send-btn");

    const list = document.querySelector(".comments-list");

    if (!input || !submit || !list) {
      return;
    }

    submit.addEventListener("click", () => {
      const value = input.value.trim();

      if (!value) {
        return;
      }

      const now = new Date();

      const formatted = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now);

      const commentCard = document.createElement("div");

      commentCard.className = "comment-card";

      commentCard.innerHTML = `

          <div class="comment-header">

            <div class="user-info">

              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Anonymous User"
                class="avatar"
              >

              <div>

                <strong class="user-name">
                  Anonymous User
                </strong>

                <div class="stars">
                  ★★★★★
                </div>

              </div>

            </div>


            <span class="comment-date">
              ${formatted}
            </span>

          </div>


          <p class="comment-text"></p>

        `;

      const commentText = commentCard.querySelector(".comment-text");

      commentText.textContent = value;

      list.appendChild(commentCard);

      input.value = "";
    });
  }
}

export { productsDetail };
