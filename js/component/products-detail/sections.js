/* Methods mixed into <products-detail> (see detail.js). */

export class DetailSections {
  /* Common data */

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

  /* Product not found */

  renderNotFound(boxProduct, message = "We couldn't find the product you're looking for.") {
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
          href="pages/products.html"
          class="back-to-products"
        >
          Back to Products
        </a>

      </div>

    `;
  }

  /* Gallery html */

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

  /* Colors html */

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

  /* Delivery html */

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
              ${Number(product.stock) > 0 ? `${product.stock} available` : "Currently unavailable"}
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

  /* Action buttons */

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

  /* Generic hero */

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

  /* Details html */

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
}
