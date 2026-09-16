let template = document.createElement("template");

let eventSvgHandler = (page) => {
  window.location.href = `/ThchVerse/pages/${page}`;
};

template.innerHTML = `
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<link rel="stylesheet" href="/ThchVerse/js/component/nav-bar/nav-bar.css">
</head>
<nav class="nav-container">

    <!-- BRAND -->
    <div class="brand-section">

        <div class="brand-core">
            TV
        </div>


        <div class="brand-info">

            <strong>
                TECH<span>VERSE</span>
            </strong>

            <small>
                DIGITAL STORE
            </small>

        </div>

    </div>



    <!-- SEARCH -->

    <div class="search-box">


        <svg 
            class="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
        >

            <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                stroke-width="1.5"
            />

            <path
                d="M20 20L16 16"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
            />

        </svg>


        <input 
            class="input-nav"
            placeholder="Search products..."
        >


    </div>




    <!-- LINKS -->

    <ul class="nav-links">


        <li>
            <a href="../pages/home.html">
                Home
            </a>
        </li>


        <li>
            <a href="/ThchVerse/pages/products.html">
                Products
            </a>
        </li>


        <li>
            <a href="/ThchVerse/pages/card.html">
                Store
            </a>
        </li>


        <li>
            <a href="/ThchVerse/pages/profile.html">
                Account
            </a>
        </li>
        
        <li>
            <a href="/ThchVerse/pages/login.html">
                Login
            </a>
        </li>

    </ul>




    <!-- ACTIONS -->

    <div class="nav-actions">


        <button class="nav-action favorite">

            <svg viewBox="0 0 24 24">

                <path 
                d="M20.8 4.6C19 2.7 16 2.8 14.3 4.7L12 7.2L9.7 4.7C8 2.8 5 2.7 3.2 4.6C1 7 2 10.5 4 12.8L12 21L20 12.8C22 10.5 23 7 20.8 4.6Z"
                />

            </svg>


        </button>



        <button class="nav-action cart"
        onclick="eventSvgHandler('card.html')">


            <svg viewBox="0 0 24 24">

                <path
                d="M3 4H5L7 17H20L22 7H7"
                />

                <circle cx="9" cy="21" r="1"/>
                <circle cx="18" cy="21" r="1"/>


            </svg>


        </button>




        <button class="nav-action profile"
        onclick="eventSvgHandler('profile.html')">


            <svg viewBox="0 0 24 24">

                <circle 
                cx="12"
                cy="8"
                r="4"
                />

                <path
                d="M4 22C4 17 8 15 12 15C16 15 20 17 20 22"
                />


            </svg>


        </button>


    </div>


</nav>
  `;

class isNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const favIcon = this.shadowRoot.querySelector(".nav-action.favorite");
    const buyIcon = this.shadowRoot.querySelector(".nav-action.cart");
    const profileIcon = this.shadowRoot.querySelector(".nav-action.profile");

    buyIcon?.addEventListener("click", () => eventSvgHandler("card.html"));
    profileIcon?.addEventListener("click", () =>
      eventSvgHandler("profile.html"),
    );
    favIcon?.addEventListener("click", () => {
      favIcon.classList.toggle("liked");
    });
  }
}

export { isNav };
