/* =====================================================
   CART PAGE
===================================================== */

class ShoppingCart {
  constructor() {
    this.cartPage = document.querySelector(".cart-page");

    this.cartItemsSection = document.querySelector(".cart-items-section");

    this.cartItems = document.querySelectorAll(".cart-item");

    this.cartCount = document.querySelector(".cart-count strong");

    this.summarySubtotal = document.querySelector(
      ".summary-row:nth-child(1) strong",
    );

    this.summaryTotal = document.querySelector(".summary-total strong");

    this.clearCartButton = document.querySelector(".clear-cart");

    this.checkoutButton = document.querySelector(".checkout-button");

    this.emptyCart = document.querySelector(".empty-cart");

    this.itemList = document.querySelector(".cart-items-section");

    this.init();
  }

  /* =====================================================
     INIT
  ===================================================== */

  init() {
    this.hideLoader();

    this.bindQuantityButtons();

    this.bindRemoveButtons();

    this.bindClearCart();

    this.bindCheckout();

    this.bindContinueShopping();

    this.updateCart();
  }

  /* =====================================================
     PAGE LOADER
  ===================================================== */

  hideLoader() {
    const loader = document.querySelector(".page-loader");

    if (!loader) {
      return;
    }

    requestAnimationFrame(() => {
      setTimeout(() => {
        loader.classList.add("hidden");

        setTimeout(() => {
          loader.remove();
        }, 500);
      }, 350);
    });
  }

  /* =====================================================
     QUANTITY
  ===================================================== */

  bindQuantityButtons() {
    const controls = document.querySelectorAll(".quantity-control");

    controls.forEach((control) => {
      control.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) {
          return;
        }

        const quantityElement = control.querySelector("span");

        if (!quantityElement) {
          return;
        }

        let quantity = Number(quantityElement.textContent);

        if (Number.isNaN(quantity)) {
          quantity = 1;
        }

        if (button.textContent.trim() === "+") {
          quantity += 1;
        }

        if (button.textContent.trim() === "−") {
          quantity -= 1;
        }

        /*
          Prevent quantity from becoming zero.
        */

        if (quantity < 1) {
          quantity = 1;
        }

        quantityElement.textContent = quantity;

        const item = control.closest(".cart-item");

        if (item) {
          this.updateItemPrice(item);
        }

        this.updateCart();
      });
    });
  }

  /* =====================================================
     ITEM PRICE
  ===================================================== */

  updateItemPrice(item) {
    const quantityElement = item.querySelector(".quantity-control span");

    const priceElement = item.querySelector(".item-price");

    if (!quantityElement || !priceElement) {
      return;
    }

    const quantity = Number(quantityElement.textContent);

    /*
      Read original base price from data attribute.
    */

    const basePrice = Number(item.dataset.price);

    if (Number.isNaN(basePrice)) {
      return;
    }

    const totalPrice = basePrice * quantity;

    priceElement.textContent = `$${totalPrice.toLocaleString("en-US")}`;
  }

  /* =====================================================
     REMOVE ITEM
  ===================================================== */

  bindRemoveButtons() {
    const buttons = document.querySelectorAll(".remove-item");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.closest(".cart-item");

        if (!item) {
          return;
        }

        this.removeItem(item);
      });
    });
  }

  /* =====================================================
     REMOVE ITEM ANIMATION
  ===================================================== */

  removeItem(item) {
    item.classList.add("removing");

    setTimeout(() => {
      item.remove();

      this.updateCart();
    }, 350);
  }

  /* =====================================================
     CLEAR CART
  ===================================================== */

  bindClearCart() {
    if (!this.clearCartButton) {
      return;
    }

    this.clearCartButton.addEventListener("click", () => {
      const items = document.querySelectorAll(".cart-item");

      if (!items.length) {
        return;
      }

      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("removing");
        }, index * 60);
      });

      setTimeout(() => {
        items.forEach((item) => item.remove());

        this.updateCart();
      }, 450);
    });
  }

  /* =====================================================
     UPDATE CART
  ===================================================== */

  updateCart() {
    const items = document.querySelectorAll(".cart-item");

    let totalItems = 0;

    let subtotal = 0;

    items.forEach((item) => {
      const quantityElement = item.querySelector(".quantity-control span");

      const priceElement = item.querySelector(".item-price");

      if (!quantityElement || !priceElement) {
        return;
      }

      const quantity = Number(quantityElement.textContent);

      const basePrice = Number(
        item.dataset.price || priceElement.textContent.replace("$", ""),
      );

      if (Number.isNaN(quantity) || Number.isNaN(basePrice)) {
        return;
      }

      totalItems += quantity;

      subtotal += basePrice * quantity;
    });

    this.updateCount(totalItems);

    this.updateSummary(subtotal);

    this.updateEmptyState(items.length);
  }

  /* =====================================================
     CART COUNT
  ===================================================== */

  updateCount(count) {
    if (!this.cartCount) {
      return;
    }

    this.cartCount.textContent = count;
  }

  /* =====================================================
     SUMMARY
  ===================================================== */

  updateSummary(subtotal) {
    if (this.summarySubtotal) {
      this.summarySubtotal.textContent = `$${subtotal.toLocaleString("en-US")}`;
    }

    if (this.summaryTotal) {
      this.summaryTotal.textContent = `$${subtotal.toLocaleString("en-US")}`;
    }
  }

  /* =====================================================
     EMPTY STATE
  ===================================================== */

  updateEmptyState(itemCount) {
    if (!this.cartItemsSection || !this.emptyCart) {
      return;
    }

    if (itemCount === 0) {
      this.showEmptyState();

      return;
    }

    this.showCartState();
  }

  /* =====================================================
     SHOW EMPTY
  ===================================================== */

  showEmptyState() {
    const itemsSection = document.querySelector(".cart-items-section");

    const summary = document.querySelector(".order-summary");

    const notice = document.querySelector(".backend-notice");

    if (itemsSection) {
      itemsSection.style.display = "none";
    }

    if (summary) {
      summary.style.display = "none";
    }

    if (notice) {
      notice.style.display = "none";
    }

    this.emptyCart.style.display = "flex";
  }

  /* =====================================================
     SHOW CART
  ===================================================== */

  showCartState() {
    const itemsSection = document.querySelector(".cart-items-section");

    const summary = document.querySelector(".order-summary");

    const notice = document.querySelector(".backend-notice");

    if (itemsSection) {
      itemsSection.style.display = "";
    }

    if (summary) {
      summary.style.display = "";
    }

    if (notice) {
      notice.style.display = "";
    }

    this.emptyCart.style.display = "none";
  }

  /* =====================================================
     CHECKOUT
  ===================================================== */

  bindCheckout() {
    if (!this.checkoutButton) {
      return;
    }

    this.checkoutButton.addEventListener("click", () => {
      const items = document.querySelectorAll(".cart-item");

      if (!items.length) {
        this.showMessage("Your cart is empty.", "warning");

        return;
      }

      this.showMessage(
        "Checkout is not available yet. Backend and payment services are coming later.",
        "info",
      );
    });
  }

  /* =====================================================
     MESSAGE
  ===================================================== */

  showMessage(message, type = "info") {
    const oldMessage = document.querySelector(".cart-message");

    if (oldMessage) {
      oldMessage.remove();
    }

    const messageElement = document.createElement("div");

    messageElement.className = `cart-message cart-message-${type}`;

    messageElement.innerHTML = `
      <span class="message-icon">
        ${type === "warning" ? "!" : "✓"}
      </span>

      <p></p>

      <button
        type="button"
        class="message-close"
        aria-label="Close"
      >
        ×
      </button>
    `;

    const text = messageElement.querySelector("p");

    text.textContent = message;

    document.body.appendChild(messageElement);

    requestAnimationFrame(() => {
      messageElement.classList.add("show");
    });

    const closeButton = messageElement.querySelector(".message-close");

    closeButton.addEventListener("click", () => {
      this.hideMessage(messageElement);
    });

    setTimeout(() => {
      this.hideMessage(messageElement);
    }, 4000);
  }

  /* =====================================================
     HIDE MESSAGE
  ===================================================== */

  hideMessage(message) {
    if (!message) {
      return;
    }

    message.classList.remove("show");

    setTimeout(() => {
      message.remove();
    }, 300);
  }

  /* =====================================================
     CONTINUE SHOPPING
  ===================================================== */

  bindContinueShopping() {
    const link = document.querySelector(".continue-shopping");

    if (!link) {
      return;
    }

    link.addEventListener("click", () => {
      link.classList.add("clicked");
    });
  }
}

/* =====================================================
   DEMO DATA PRICES
===================================================== */

/*
  The current HTML is demo-based.

  We store the real base price in data-price
  instead of relying on the displayed price,
  because displayed price changes with quantity.
*/

function initializeDemoPrices() {
  const items = document.querySelectorAll(".cart-item");

  items.forEach((item) => {
    if (item.dataset.price) {
      return;
    }

    const priceElement = item.querySelector(".item-price");

    if (!priceElement) {
      return;
    }

    const rawPrice = priceElement.textContent
      .replace("$", "")
      .replaceAll(",", "")
      .trim();

    const price = Number(rawPrice);

    if (!Number.isNaN(price)) {
      item.dataset.price = price;
    }
  });
}

/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initializeDemoPrices();

  new ShoppingCart();
});
