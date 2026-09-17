const template = document.createElement("template");

template.innerHTML = `

<style>

@import "/css/variables.css";
@import "/css/global.css";
@import "/js/component/footer/footer.css";

</style>


<footer class="site-footer">


    <div class="footer-glow glow-one"></div>
    <div class="footer-glow glow-two"></div>


    <div class="footer-top">


        <div class="footer-brand">


            <a href="/index.html" class="footer-logo">

                <span class="logo-tech">TECH</span>
                <span class="logo-verse">VERSE</span>

            </a>


            <p class="brand-description">
                A modern technology marketplace built
                for exploring devices, comparing products,
                and discovering the next generation of tech.
            </p>


            <div class="social-icons">


                <a href="#" class="social-link" aria-label="GitHub">

                    <svg viewBox="0 0 24 24">
                        <path d="M15 22V18.7C15 17.7 15.3 17.1 16 16.5C19.3 16.1 21 14.5 21 11C21 10 20.7 9.2 20 8.5C20.3 7.5 20.3 6.6 20 5.5C20 5.5 19 5.2 17 6.5C15.3 6 13.7 6 12 6C10.3 6 8.7 6 7 6.5C5 5.2 4 5.5 4 5.5C3.7 6.6 3.7 7.5 4 8.5C3.3 9.2 3 10 3 11C3 14.5 4.7 16.1 8 16.5C8.7 17.1 9 17.7 9 18.7V22"/>
                        <path d="M8 16C5 17 5 13 3 13"/>
                    </svg>

                </a>


                <a href="#" class="social-link" aria-label="Instagram">

                    <svg viewBox="0 0 24 24">

                        <rect x="3" y="3" width="18" height="18" rx="5"/>
                        <circle cx="12" cy="12" r="4"/>
                        <circle cx="17.2" cy="6.8" r="1"/>

                    </svg>

                </a>


                <a href="#" class="social-link" aria-label="Twitter">

                    <svg viewBox="0 0 24 24">

                        <path d="M18.9 2H22L15.2 9.8L23.2 22H17L12.1 14.5L5.5 22H2.3L9.6 13.6L1.9 2H8.2L12.6 8.7L18.9 2ZM17.8 19.8H19.5L7.4 4.1H5.6L17.8 19.8Z"/>

                    </svg>

                </a>


                <a href="#" class="social-link" aria-label="Discord">

                    <svg viewBox="0 0 24 24">

                        <path d="M19.5 5.5C17.9 4.8 16.1 4.4 14.2 4.2L13.6 5.4C11.3 5.1 9 5.1 6.7 5.4L6.1 4.2C4.2 4.4 2.4 4.8 0.8 5.5C-0.3 9.1-0.6 12.6 0 16.1C1.9 17.5 3.7 18.3 5.5 18.8L6.8 17C5.8 16.7 4.9 16.3 4.1 15.8L4.7 15.3C8.2 17 15.8 17 19.3 15.3L19.9 15.8C19.1 16.3 18.2 16.7 17.2 17L18.5 18.8C20.3 18.3 22.1 17.5 24 16.1C24.6 12.6 24.3 9.1 19.5 5.5ZM8.1 14C7 14 6.1 13 6.1 11.8C6.1 10.6 7 9.6 8.1 9.6C9.2 9.6 10.1 10.6 10.1 11.8C10.1 13 9.2 14 8.1 14ZM15.9 14C14.8 14 13.9 13 13.9 11.8C13.9 10.6 14.8 9.6 15.9 9.6C17 9.6 17.9 10.6 17.9 11.8C17.9 13 17 14 15.9 14Z"/>

                    </svg>

                </a>


            </div>


        </div>




        <div class="footer-column">

            <h3>Explore</h3>

            <ul>

                <li>
                    <a href="/index.html">
                        Home
                    </a>
                </li>

                <li>
                    <a href="/pages/products.html">
                        Products
                    </a>
                </li>

                <li>
                    <a href="/pages/profile.html">
                        Profile
                    </a>
                </li>

                <li>
                    <a href="/pages/card.html">
                        Shopping Cart
                    </a>
                </li>

            </ul>

        </div>




        <div class="footer-column">

            <h3>Categories</h3>

            <ul>

                <li>
                    <a href="/pages/products.html?category=Phones">
                        Phones
                    </a>
                </li>

                <li>
                    <a href="/pages/products.html?category=SmartWatches">
                        Smart Watches
                    </a>
                </li>

                <li>
                    <a href="/pages/products.html?category=Cameras">
                        Cameras
                    </a>
                </li>

                <li>
                    <a href="/pages/products.html?category=Headphones">
                        Headphones
                    </a>
                </li>

                <li>
                    <a href="/pages/products.html?category=Computers">
                        Computers
                    </a>
                </li>

                <li>
                    <a href="/pages/products.html?category=Gaming">
                        Gaming
                    </a>
                </li>

            </ul>

        </div>




        <div class="footer-column">

            <h3>TechVerse</h3>

            <ul>

                <li>
                    <a href="#">
                        About Us
                    </a>
                </li>

                <li>
                    <a href="#">
                        Contact
                    </a>
                </li>

                <li>
                    <a href="#">
                        Privacy
                    </a>
                </li>

                <li>
                    <a href="#">
                        Terms
                    </a>
                </li>

            </ul>

        </div>


    </div>




    <div class="footer-divider">

        <span></span>

    </div>




    <div class="footer-bottom">


        <p>
            © 2026 TechVerse. All rights reserved.
        </p>


        <div class="system-status">

            <span class="status-dot"></span>

            <span>
                SYSTEM ONLINE
            </span>

        </div>


    </div>


</footer>

`;

class isFooter extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open",
    });

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export { isFooter };
