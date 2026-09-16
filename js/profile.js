/* =====================================================
   PROFILE PAGE
===================================================== */

class ProfilePage {
  constructor() {
    this.backButton = document.querySelector(".back-home");

    this.editButton = document.querySelector(".edit-profile");

    this.dashboardCards = document.querySelectorAll(".dashboard-card");

    this.init();
  }

  /* =====================================================
     INIT
  ===================================================== */

  init() {
    this.bindBackButton();

    this.bindEditProfile();

    this.bindDashboardCards();

    this.hidePageLoader();
  }

  /* =====================================================
     BACK HOME
  ===================================================== */

  bindBackButton() {
    if (!this.backButton) {
      return;
    }

    this.backButton.addEventListener("click", () => {
      this.backButton.classList.add("clicked");

      setTimeout(() => {
        window.location.href = "../pages/home.html";
      }, 180);
    });
  }

  /* =====================================================
     EDIT PROFILE
  ===================================================== */

  bindEditProfile() {
    if (!this.editButton) {
      return;
    }

    this.editButton.addEventListener("click", () => {
      this.editButton.classList.add("clicked");

      setTimeout(() => {
        this.showMessage(
          "Profile editing will be available after the backend and authentication system are connected.",
        );

        this.editButton.classList.remove("clicked");
      }, 160);
    });
  }

  /* =====================================================
     DASHBOARD CARDS
  ===================================================== */

  bindDashboardCards() {
    this.dashboardCards.forEach((card) => {
      const button = card.querySelector("button");

      if (!button) {
        return;
      }

      button.addEventListener("click", () => {
        this.handleCardAction(card, button);
      });
    });
  }

  /* =====================================================
     CARD ACTION
  ===================================================== */

  handleCardAction(card, button) {
    const titleElement = card.querySelector("h3");

    if (!titleElement) {
      return;
    }

    const title = titleElement.textContent.trim();

    button.classList.add("clicked");

    setTimeout(() => {
      button.classList.remove("clicked");

      switch (title) {
        case "My Cart":
          window.location.href = "../pages/card.html";
          break;

        case "Wishlist":
          this.showMessage(
            "Wishlist is ready for the frontend UI, but persistent wishlist data needs the backend.",
          );
          break;

        case "Orders":
          this.showMessage(
            "There are no real orders yet. Order history will be connected to the backend later.",
          );
          break;

        case "Reviews":
          this.showMessage(
            "Review history will be available once user accounts and backend storage are connected.",
          );
          break;

        case "Settings":
          this.showMessage(
            "Settings will be connected to the user account system later.",
          );
          break;

        case "Security":
          this.showMessage(
            "Authentication and security services are not connected yet.",
          );
          break;

        default:
          this.showMessage("This feature is currently running in demo mode.");
      }
    }, 140);
  }

  /* =====================================================
     MESSAGE
  ===================================================== */

  showMessage(message) {
    const existing = document.querySelector(".profile-message");

    if (existing) {
      existing.remove();
    }

    const messageBox = document.createElement("div");

    messageBox.className = "profile-message";

    messageBox.innerHTML = `
      <div class="profile-message-icon">
        ✓
      </div>

      <div class="profile-message-content">
        <strong>
          Demo Mode
        </strong>

        <p></p>
      </div>

      <button
        type="button"
        class="profile-message-close"
        aria-label="Close message"
      >
        ×
      </button>
    `;

    const text = messageBox.querySelector(".profile-message-content p");

    text.textContent = message;

    document.body.appendChild(messageBox);

    requestAnimationFrame(() => {
      messageBox.classList.add("show");
    });

    const close = messageBox.querySelector(".profile-message-close");

    close.addEventListener("click", () => {
      this.hideMessage(messageBox);
    });

    setTimeout(() => {
      this.hideMessage(messageBox);
    }, 4500);
  }

  /* =====================================================
     HIDE MESSAGE
  ===================================================== */

  hideMessage(messageBox) {
    if (!messageBox) {
      return;
    }

    messageBox.classList.remove("show");

    setTimeout(() => {
      messageBox.remove();
    }, 300);
  }

  /* =====================================================
     PAGE LOADER
  ===================================================== */

  hidePageLoader() {
    const loader = document.querySelector(".page-loader");

    if (!loader) {
      return;
    }

    setTimeout(() => {
      loader.classList.add("hidden");

      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 450);
  }
}

/* =====================================================
   START
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  new ProfilePage();
});
