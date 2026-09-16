# 🚀 TechVerse

TechVerse is a frontend e-commerce project for technology products, built from the ground up with **HTML5, CSS3, and Vanilla JavaScript**.

The project focuses on more than reproducing an e-commerce interface: it is a practical exercise in **component-based architecture, data-driven rendering, URL-driven state, Web Components, Shadow DOM, search, filtering, sorting, pagination, product-detail systems, and frontend application structure**.

> **Current status:** ✅ Main Vanilla JavaScript frontend phase completed

---

## ✨ Features

### 🏠 Home

- Responsive technology-focused landing page
- Animated hero / loading experience
- Reusable navigation, category, product, and footer components
- Category navigation into the catalog
- Featured product presentation
- Responsive and animated UI

### 🛍️ Product Catalog

The catalog is driven by the local `Data/products.json` dataset rather than hard-coded product cards.

Current dataset:

- **600 products**
- **6 categories**
  - Phones
  - Smartwatches
  - Cameras
  - Headphones
  - Computers
  - Gaming

Implemented catalog functionality:

- Product search
- Sorting by:
  - Rating
  - Price: Low to High
  - Price: High to Low
  - Name
- Dynamic filter options generated from available product data
- Pagination
- Empty-search state
- Filter reset functionality
- URL query-parameter based category navigation
- Wishlist demo interaction
- Data-driven product-card rendering

The catalog architecture is based around the idea that the **data/state is the source of truth**, rather than reading application state back from the DOM.

Conceptually:

```text
products.json
      ↓
products state
      ↓
search / filters / sort
      ↓
filteredProducts
      ↓
pagination
      ↓
visibleProducts
      ↓
render
```

---

## 📦 Product Details

Product details are dynamically generated from the selected product.

The product ID is read from the URL, the corresponding product is located in the dataset, and the product category determines the appropriate detail renderer.

Supported categories:

- Phones
- Smartwatches
- Cameras
- Headphones
- Computers
- Gaming

The detail system contains shared rendering primitives for:

- Product gallery
- Thumbnail switching
- Colors
- Storage options
- Specifications
- Description
- Delivery information
- Wishlist
- Cart demo interaction
- Reviews/comments
- Expandable technical details
- Product-not-found state

### Gaming product variations

Gaming products additionally use:

```text
specifications.device_type
```

to support different gaming-device structures through the same component system, including:

- Gaming Monitor
- Gaming Keyboard
- Gaming Mouse
- Gaming Headset
- Game Controller
- Gaming Desktop

This avoids creating an entirely separate page for every gaming product type.

### Product-detail data flow

```text
URL ?id=...
      ↓
Read product ID
      ↓
Find product
      ↓
Read category
      ↓
Select category renderer
      ↓
Render shared detail structure
      ↓
Bind interactions
```

---

## 🛒 Cart

The cart page currently provides a frontend/demo implementation containing:

- Quantity controls
- Item removal
- Clear cart interaction
- Per-item price updates
- Order summary
- Empty-cart state
- Continue-shopping interaction
- Checkout placeholder
- Demo messages

Persistent cart storage and real checkout are intentionally deferred to the backend phase.

---

## 👤 Authentication & Profile

The project includes frontend interfaces for:

- Login
- Registration
- Password visibility controls
- Basic form validation
- Demo authentication feedback
- Profile dashboard
- Profile actions
- Security/account placeholders

The authentication flow is currently a **frontend/demo experience**.

There is no production authentication service, secure session system, or persistent user account database yet.

---

## 💬 Reviews

The product-detail interface includes a review/comment section used for frontend interaction and UI development.

Current functionality includes:

- Comment input
- Submit interaction
- Existing comment cards
- Rating presentation
- Comment images
- View-more interaction

Persistent reviews will require backend storage and authenticated users.

---

# 🧩 Architecture

TechVerse uses a component-oriented Vanilla JavaScript architecture based on:

- **ES Modules**
- **Custom Elements**
- **Web Components**
- **Shadow DOM**
- **DOM APIs**
- Data-driven rendering

Reusable components are organized under:

```text
js/
└── component/
    ├── category/
    ├── footer/
    ├── nav-bar/
    ├── product/
    ├── products-box/
    └── products-detail/
```

Examples of custom elements:

```html
<nav-bar></nav-bar>
<category-component></category-component>
<product-data></product-data>
<product-category></product-category>
<products-detail></products-detail>
<footer-site></footer-site>
```

The goal is to keep page-specific logic separate from reusable UI components.

---

## 🧱 Web Components

Several parts of TechVerse are implemented as custom elements.

For example:

```js
window.customElements.define("nav-bar", isNav);
```

This allows HTML such as:

```html
<nav-bar></nav-bar>
```

to represent a reusable application component.

The project therefore uses the browser's native Web Components model instead of depending on a frontend framework for the current phase.

---

## 🌑 Shadow DOM

The product-related components use Shadow DOM to encapsulate component markup and styles.

Conceptually:

```text
Page
 │
 ├── Component
 │      │
 │      ├── Shadow DOM
 │      │     ├── HTML
 │      │     └── CSS
 │      │
 │      └── Component logic
 │
 └── Other components
```

This gives components a degree of style and DOM encapsulation and creates a useful foundation for understanding how framework components work internally.

---

# 🔄 State & URL Architecture

One of the main architectural ideas developed during the project is separating **application state** from the rendered DOM.

For the catalog, the conceptual pipeline is:

```text
URL
 ↓
category
 ↓
products
 ↓
search
 ↓
filters
 ↓
sort
 ↓
filteredProducts
 ↓
totalPages
 ↓
currentPage
 ↓
visibleProducts
 ↓
render
```

URL query parameters are also used to represent navigation state, for example:

```text
products.html?category=phones
```

and product-detail navigation:

```text
products-details.html?id=1
```

This makes the URL part of the application's navigation/state model rather than relying exclusively on temporary DOM state.

---

# 🔎 Search / Filter / Sort

The catalog supports a data-driven search and filtering architecture.

Filtering is generated from the information actually available in the dataset.

This is important because the UI should not pretend that a filter exists when the underlying data cannot meaningfully support it.

For example, a filter such as `brand` is only useful when the dataset contains sufficiently varied and meaningful brand information.

The project therefore treats the dataset itself as an architectural constraint.

---

# 📄 Pagination

Pagination was implemented as a state-driven catalog mechanism.

The basic model is:

```text
filteredProducts.length
        ↓
    totalPages
        ↓
   currentPage
        ↓
 calculate slice
        ↓
 visibleProducts
        ↓
    render cards
```

The page size is currently designed around a fixed number of products per page.

Pagination also interacts with search, filtering, and sorting, meaning that changing the underlying product collection must affect the pagination state and visible results.

This became one of the more substantial logic sections of the frontend because pagination is not simply a visual group of buttons; it is coupled to the current dataset and rendering state.

---

# 🎨 Styling Architecture

CSS is separated into global, page-specific, component-specific, and animation-related files.

```text
css/
├── animations.css
├── global.css
├── variables.css
├── card/
├── home/
├── login/
├── products/
├── products-details/
└── profile/
```

The project also uses the **Inter** typeface and a shared variable system for maintaining visual consistency.

The UI emphasizes:

- Dark / technology-oriented visual design
- Responsive layouts
- Reusable visual patterns
- Animations
- Hover states
- Layering and positioning
- Component-level styling

---

# 🗂️ Project Structure

```text
TechVerse/
│
├── Data/
│   └── products.json
│
├── assets/
│   └── images/
│
├── css/
│   ├── animations.css
│   ├── global.css
│   ├── variables.css
│   ├── card/
│   ├── home/
│   ├── login/
│   ├── products/
│   ├── products-details/
│   └── profile/
│
├── js/
│   ├── component/
│   │   ├── category/
│   │   ├── footer/
│   │   ├── nav-bar/
│   │   ├── product/
│   │   ├── products-box/
│   │   └── products-detail/
│   │
│   ├── auth.js
│   ├── card.js
│   ├── home.js
│   ├── mose.js
│   ├── nav.js
│   ├── products.js
│   ├── products-detail.js
│   └── profile.js
│
├── pages/
│   ├── card.html
│   ├── home.html
│   ├── login.html
│   ├── products.html
│   ├── products-details.html
│   ├── profile.html
│   └── register.html
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   ├── counter.js
│   ├── main.js
│   └── style.css
│
├── package.json
├── package-lock.json
└── README.md
```

> The `src/` directory contains the original Vite starter structure that remains in the repository alongside the application's main frontend structure.

---

# 🛠️ Technologies

## Core

- HTML5
- CSS3
- Vanilla JavaScript
- ECMAScript Modules
- DOM API
- Web Components
- Custom Elements
- Shadow DOM
- URLSearchParams
- JSON

## Tooling

- Vite
- npm
- Git
- GitHub
- VS Code / Zed configuration files

## External resources

The project also uses external image/font resources where present in the implementation.

---

# ▶️ Running the Project

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The application pages are located under:

```text
pages/
```

---

# 🎯 Project Goals

TechVerse was built as a practical environment for learning frontend engineering rather than simply completing a tutorial.

Major concepts practiced during development include:

- Component architecture
- Web Components
- Custom Elements
- Shadow DOM
- ES Modules
- Dynamic rendering
- Data-driven UI
- State-driven UI
- URL-driven state
- Search
- Filtering
- Sorting
- Pagination
- Event handling
- Event delegation
- Responsive CSS
- CSS architecture
- Loading states
- Empty states
- Error / not-found states
- Refactoring
- Separation of concerns
- Git/GitHub workflow

---

# 🚧 Current Scope & Limitations

TechVerse is currently a **frontend application / demo e-commerce system**.

The following features are not yet backed by a real server:

- Authentication
- Authorization
- User sessions
- Database persistence
- Persistent cart
- Persistent wishlist
- Orders
- Order history
- Product management
- Persistent reviews
- Real ratings
- Payment processing
- Server-side validation
- Production API
- Backend security
- Real inventory management

These are intentional boundaries of the current frontend phase.

---

# 🔮 Planned Evolution

The project is intended to evolve from the current Vanilla JavaScript implementation into a larger full-stack application.

Planned learning/development path:

```text
TechVerse — Vanilla JavaScript
          ↓
       React
          ↓
    TypeScript
          ↓
   Backend / API
          ↓
       Database
          ↓
 Authentication & Authorization
          ↓
 Cart / Wishlist / Orders
          ↓
 Reviews / Payments / Inventory
          ↓
 Testing / Deployment / Monitoring
```

The purpose of this progression is not to throw away the current project.

The current Vanilla JavaScript implementation acts as a foundation for understanding what the framework and backend layers will later automate, abstract, or replace.

---

# 🧭 Future Backend Architecture

When backend development begins, the frontend-only demo can evolve toward a structure similar to:

```text
Client
  ↓
Frontend Application
  ↓
HTTP / API
  ↓
Backend Server
  ├── Authentication
  ├── Users
  ├── Products
  ├── Categories
  ├── Cart
  ├── Wishlist
  ├── Orders
  ├── Reviews
  └── Payments
        ↓
     Database
```

Additional production concerns will eventually include:

- Authentication and authorization
- Password hashing
- Session / token management
- API validation
- Database constraints
- Transactions
- Concurrency
- Inventory consistency
- Payment idempotency
- Error handling
- Logging
- Testing
- Security
- Caching
- Deployment
- Monitoring / observability

These belong to the future backend/full-stack phase and are **not currently implemented** in the repository.

---

# 🧠 Architecture Philosophy

A major purpose of TechVerse is learning to think about a frontend as a system rather than a collection of pages.

For example:

```text
Feature
  ↓
State
  ↓
Transformation
  ↓
Rendering
  ↓
Interaction
  ↓
State update
  ↓
Re-render
```

The project deliberately moves toward predictable relationships between data, state, UI, and user interaction.

This foundation is intended to make the transition to React and TypeScript meaningful rather than simply learning a new syntax.

---

# 📌 Project Status

### ✅ Completed

- Main frontend pages
- Responsive UI
- Component-based Vanilla JS structure
- Navigation
- Product categories
- Product catalog
- Product search
- Product filtering
- Product sorting
- Pagination
- Product details
- Product-detail category renderers
- Cart demo
- Login/register UI
- Profile UI
- Reviews UI
- Loading/empty/not-found states
- Git/GitHub project workflow

### 🚧 Future

- React migration / rebuild
- TypeScript
- Backend API
- Database
- Authentication
- Persistent user data
- Persistent cart/wishlist
- Orders
- Reviews
- Payments
- Inventory
- Testing
- Deployment
- Monitoring

---

## 📜 License

This project is currently intended for educational and personal development purposes.
