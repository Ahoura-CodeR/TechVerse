const template = document.createElement('template')

template.innerHTML = `
  <link rel="stylesheet" href="../js/component/footer/footer.css">
  <footer class="site-footer">
   
      <span class="dash dash-top"></span>
   
      <div class="footer-grid">
   
          <div class="footer-brand">
              <h2 class="logo">cyber</h2>
              <p>We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
   
              <div class="social-icons">
                  <a href="#" aria-label="Twitter">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 4.9c-.8.4-1.7.6-2.6.8 1-.6 1.7-1.5 2-2.6-.9.5-1.9.9-3 1.1a4.6 4.6 0 00-7.9 4.2A13 13 0 011.6 3.2a4.6 4.6 0 001.4 6.2c-.7 0-1.4-.2-2-.6v.1c0 2.2 1.6 4.1 3.7 4.5-.7.2-1.4.2-2 .1.6 1.9 2.3 3.2 4.3 3.3A9.3 9.3 0 010 19.5 13 13 0 007 21.5c8.4 0 13-7 13-13v-.6c.9-.6 1.6-1.4 2.2-2.3-.8.3-1.7.6-2.6.7z"/></svg>
                  </a>
                  <a href="#" aria-label="Facebook">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21.5v-8.2h2.7l.4-3.2h-3.1V8c0-.9.3-1.5 1.7-1.5h1.5V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.4H7.3v3.2h2.5v8.2h3.7z"/></svg>
                  </a>
                  <a href="#" aria-label="TikTok">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2h-3v13.5a2.7 2.7 0 11-2.3-2.7v-3a5.7 5.7 0 105.3 5.7V9.2a7.6 7.6 0 004 1.2V7.3a4.6 4.6 0 01-4-2.6V2z"/></svg>
                  </a>
                  <a href="#" aria-label="Instagram">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
                  </a>
              </div>
          </div>
   
          <div class="footer-col">
              <h3>Services</h3>
              <ul>
                  <li><a href="#">Bonus program</a></li>
                  <li><a href="#">Gift cards</a></li>
                  <li><a href="#">Credit and payment</a></li>
                  <li><a href="#">Service contracts</a></li>
                  <li><a href="#">Non-cash account</a></li>
                  <li><a href="#">Payment</a></li>
              </ul>
          </div>
   
          <div class="footer-col">
              <h3>Assistance to the buyer</h3>
              <ul>
                  <li><a href="#">Find an order</a></li>
                  <li><a href="#">Terms of delivery</a></li>
                  <li><a href="#">Exchange and return of goods</a></li>
                  <li><a href="#">Guarantee</a></li>
                  <li><a href="#">Frequently asked questions</a></li>
                  <li><a href="#">Terms of use of the site</a></li>
              </ul>
          </div>
   
      </div>
   
      <span class="dash dash-mid"></span>
      <span class="dash dash-bottom"></span>
   
  </footer>
  `

class isFooter extends HTMLElement {
  constructor() {
    super ()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  connectedCallback() {
    
  }
}
export {isFooter}