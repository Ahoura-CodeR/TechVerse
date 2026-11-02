/* Methods mixed into <products-detail> (see detail.js). */

export class DetailInteractions {
  /* Events */

  bindEvents() {
    this.bindViewMore();

    this.bindGallery();

    this.bindColors();

    this.bindStorage();

    this.bindWishlist();

    this.bindCart();

    this.bindComments();
  }

  /* View more */

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

  /* Gallery */

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

  /* Colors */

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

  /* Storage */

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

  /* Wishlist */

  bindWishlist() {
    const button = this.shadowRoot.querySelector(".btn-wishlist");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      button.classList.toggle("active");
    });
  }

  /* Cart */

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

  /* Comments */

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
