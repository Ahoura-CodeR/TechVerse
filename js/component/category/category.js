const template = document.createElement("template");

template.innerHTML = `

<style>

@import "/css/variables.css";
@import "/css/global.css";
@import "/js/component/category/category.css";

</style>


<section class="category-section">

  <header class="category-header">

    <div class="category-heading">
      <span class="category-label">TECHNOLOGY COLLECTION</span>
      <h2>Explore Categories</h2>
      <p>Discover premium devices and smart technology</p>
    </div>

    <div class="category-controls">
      <button class="arrow-btn">
        <svg viewBox="0 0 24 24">
          <path d="M15 18L9 12L15 6"/>
        </svg>
      </button>

      <button class="arrow-btn">
        <svg viewBox="0 0 24 24">
          <path d="M9 18L15 12L9 6"/>
        </svg>
      </button>
    </div>

  </header>

  <div class="category-grid">

    <div class="category-card" data-category="Phones">
      <div class="icon-box">
        <svg viewBox="0 0 24 24">
          <rect x="7" y="2" width="10" height="20" rx="2"/>
          <circle cx="12" cy="18" r="1"/>
        </svg>
      </div>
      <div class="card-content">
        <h3>Phones</h3>
        <p>Smart mobile devices</p>
        <span>Explore →</span>
      </div>
    </div>

    <div class="category-card" data-category="SmartWatches">
      <div class="icon-box">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="7"/>
          <path d="M12 8V12L15 14"/>
        </svg>
      </div>
      <div class="card-content">
        <h3>Smart Watches</h3>
        <p>Wearable technology</p>
        <span>Explore →</span>
      </div>
    </div>

    <div class="category-card" data-category="Cameras">
      <div class="icon-box">
        <svg viewBox="0 0 24 24">
          <path d="M4 7H8L10 4H14L16 7H20V20H4Z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      </div>
      <div class="card-content">
        <h3>Cameras</h3>
        <p>Capture your moments</p>
        <span>Explore →</span>
      </div>
    </div>

    <div class="category-card" data-category="Headphones">
      <div class="icon-box">
        <svg viewBox="0 0 24 24">
          <path d="M4 14V12C4 7 8 4 12 4C16 4 20 7 20 12V14"/>
          <path d="M4 14H7V20H5C4 20 4 18 4 14"/>
          <path d="M20 14H17V20H19C20 20 20 18 20 14"/>
        </svg>
      </div>
      <div class="card-content">
        <h3>Headphones</h3>
        <p>Premium audio</p>
        <span>Explore →</span>
      </div>
    </div>

    <div class="category-card" data-category="Computers">
      <div class="icon-box">
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="13" rx="2"/>
          <path d="M8 21H16"/>
        </svg>
      </div>
      <div class="card-content">
        <h3>Computers</h3>
        <p>Powerful machines</p>
        <span>Explore →</span>
      </div>
    </div>

    <div class="category-card" data-category="Gaming">
      <div class="icon-box">
        <svg viewBox="0 0 24 24">
          <path d="M6 10H18C20 10 21 13 20 17L19 20L15 16H9L5 20L4 17C3 13 4 10 6 10Z"/>
        </svg>
      </div>
      <div class="card-content">
        <h3>Gaming</h3>
        <p>Gaming universe</p>
        <span>Explore →</span>
      </div>
    </div>

  </div>

</section>

`;

class isCategory extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const grid = this.querySelector(".category-grid");

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".category-card");

      if (!card) return;

      const category = card.dataset.category;
      window.location.href = `/pages/products.html?category=${category}`;
    });
  }
}

export { isCategory };
