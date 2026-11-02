/* Auth page */

class AuthPage {
  constructor() {
    this.form = document.querySelector(".auth-form");

    this.authButton = document.querySelector(".auth-btn");

    this.googleButton = document.querySelector(".fake-login");

    this.passwordInputs = document.querySelectorAll('input[type="password"]');

    /*
      Register-only fields
    */

    this.usernameInput = document.querySelector(".username-input");

    this.emailInput = document.querySelector(".email-input");

    this.passwordInput = document.querySelector(".password-input");

    this.confirmPasswordInput = document.querySelector(".confirm-password-input");

    this.isRegisterPage = Boolean(this.usernameInput);

    this.init();
  }

  /* Init */

  init() {
    this.bindForm();

    this.bindPasswordToggles();

    this.bindGoogleButton();
  }

  /* Form */

  bindForm() {
    if (!this.form) {
      return;
    }

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (this.isRegisterPage) {
        this.register();
      } else {
        this.login();
      }
    });
  }

  /* Login */

  login() {
    const email = this.emailInput?.value.trim();

    const password = this.passwordInput?.value.trim();

    this.clearMessage();

    this.clearErrors();

    if (!email) {
      this.showError("Please enter your email address.");

      this.markError(this.emailInput);

      this.emailInput.focus();

      return;
    }

    if (!this.isValidEmail(email)) {
      this.showError("Please enter a valid email address.");

      this.markError(this.emailInput);

      this.emailInput.focus();

      return;
    }

    if (!password) {
      this.showError("Please enter your password.");

      this.markError(this.passwordInput);

      this.passwordInput.focus();

      return;
    }

    if (password.length < 6) {
      this.showError("Password must contain at least 6 characters.");

      this.markError(this.passwordInput);

      this.passwordInput.focus();

      return;
    }

    this.startDemoProcess(
      "Authentication is not connected yet. This login form is currently running in demo mode.",
    );
  }

  /* Register */

  register() {
    const username = this.usernameInput.value.trim();

    const email = this.emailInput.value.trim();

    const password = this.passwordInput.value.trim();

    const confirmPassword = this.confirmPasswordInput.value.trim();

    this.clearMessage();

    this.clearErrors();

    /* Username */

    if (!username) {
      this.showError("Please enter a username.");

      this.markError(this.usernameInput);

      this.usernameInput.focus();

      return;
    }

    if (username.length < 3) {
      this.showError("Username must contain at least 3 characters.");

      this.markError(this.usernameInput);

      this.usernameInput.focus();

      return;
    }

    /* Email */

    if (!email) {
      this.showError("Please enter your email address.");

      this.markError(this.emailInput);

      this.emailInput.focus();

      return;
    }

    if (!this.isValidEmail(email)) {
      this.showError("Please enter a valid email address.");

      this.markError(this.emailInput);

      this.emailInput.focus();

      return;
    }

    /* Password */

    if (!password) {
      this.showError("Please create a password.");

      this.markError(this.passwordInput);

      this.passwordInput.focus();

      return;
    }

    if (password.length < 6) {
      this.showError("Password must contain at least 6 characters.");

      this.markError(this.passwordInput);

      this.passwordInput.focus();

      return;
    }

    /* Confirm password */

    if (!confirmPassword) {
      this.showError("Please confirm your password.");

      this.markError(this.confirmPasswordInput);

      this.confirmPasswordInput.focus();

      return;
    }

    if (password !== confirmPassword) {
      this.showError("Passwords do not match.");

      this.markError(this.confirmPasswordInput);

      this.confirmPasswordInput.focus();

      return;
    }

    /* Demo register */

    this.startDemoProcess(
      "Account creation is not connected yet. Registration is currently running in demo mode.",
    );
  }

  /* Demo process */

  startDemoProcess(message) {
    if (!this.authButton) {
      return;
    }

    const originalText = this.authButton.textContent;
    this.authButton.classList.add("loading");

    this.authButton.disabled = true;
    this.authButton.textContent = "Processing...";
    setTimeout(() => {
      this.authButton.classList.remove("loading");

      this.authButton.disabled = false;
      this.authButton.textContent = originalText;
      this.showInfo(message);
    }, 900);
  }

  /* Google */

  bindGoogleButton() {
    if (!this.googleButton) {
      return;
    }

    this.googleButton.addEventListener("click", () => {
      this.googleButton.disabled = true;
      this.googleButton.textContent = "Connecting...";
      setTimeout(() => {
        this.googleButton.disabled = false;
        this.googleButton.textContent = "Continue with Google 🚀";
        this.showInfo(
          "Google authentication will be available after the backend authentication system is connected.",
        );
      }, 850);
    });
  }

  /* Password toggles */

  bindPasswordToggles() {
    const toggles = document.querySelectorAll(".password-toggle");

    toggles.forEach((toggle, index) => {
      const input = this.passwordInputs[index];
      if (!input) {
        return;
      }

      toggle.addEventListener("click", () => {
        const shouldShow = input.type === "password";
        input.type = shouldShow ? "text" : "password";
        toggle.textContent = shouldShow ? "🙈" : "👁";
        toggle.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
      });
    });
  }

  /* Email validation */

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* Input error */

  markError(input) {
    if (!input) {
      return;
    }

    const group = input.closest(".input-group");

    if (group) {
      group.classList.add("error");
    }
  }

  /* Clear errors */

  clearErrors() {
    document.querySelectorAll(".input-group.error").forEach((group) => {
      group.classList.remove("error");
    });
  }

  /* Messages */

  showError(message) {
    this.showMessage(message, "error");
  }

  showInfo(message) {
    this.showMessage(message, "info");
  }

  showSuccess(message) {
    this.showMessage(message, "success");
  }

  showMessage(message, type) {
    let box = document.querySelector(".auth-message");

    if (!box) {
      box = document.createElement("div");

      box.className = "auth-message";
      this.form.appendChild(box);
    }

    box.textContent = message;
    box.className = `auth-message show ${type}`;
  }

  /* Clear message */

  clearMessage() {
    const box = document.querySelector(".auth-message");

    if (!box) {
      return;
    }

    box.className = "auth-message";
    box.textContent = "";
  }
}

/* Start */

document.addEventListener("DOMContentLoaded", () => {
  new AuthPage();
});
