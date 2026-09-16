# 🚀 TechVerse

TechVerse is a frontend e-commerce project focused on technology products. It was built from the ground up with **HTML, CSS, and Vanilla JavaScript**, with an emphasis on component-based architecture, data-driven rendering, responsive UI, and understanding how the pieces of a real frontend application fit together.

The project is intentionally frontend-only for this stage. Authentication, persistent cart/wishlist data, orders, reviews, payments, and other server-side features are left for a future backend phase.

---

## ✨ Features

### 🏠 Home

- Responsive hero section and technology-focused landing page
- Reusable navigation, category, product, and footer components
- Category navigation to the product catalog
- Featured product presentation
- Animated page/product loading states

### 🛍️ Product Catalog

- Data-driven product rendering from `Data/products.json`
- Six product categories:
  - Phones
  - Smartwatches
  - Cameras
  - Headphones
  - Computers
  - Gaming
- Product search
- Sorting by:
  - Rating
  - Price: Low to High
  - Price: High to Low
  - Name
- Dynamic sidebar filters generated from the available product data
- Pagination
- Empty-search state and reset functionality
- Wishlist UI interaction
- Product navigation through URL query parameters

### 📦 Product Details

Product details are rendered dynamically from the selected product rather than being hard-coded into separate pages.

The product ID is read from the URL, the corresponding product is found in the dataset, and its category determines which detail structure is rendered.

Supported categories:

- Phones
- Smartwatches
- Cameras
- Headphones
- Computers
- Gaming

Gaming products additionally use `specifications.device_type` to support multiple product types through a shared rendering system, including:

- Gaming Monitor
- Gaming Keyboard
- Gaming Mouse
- Gaming Headset
- Game Controller
- Gaming Desktop

Product-detail interactions include:

- Image gallery / thumbnail switching
- Color selection
- Storage selection where supported
- Wishlist interaction
- Add-to-cart demo interaction
- Expandable technical details
- Product-not-found state

### 🛒 Cart

The cart page currently provides a frontend/demo experience with:

- Quantity controls
- Item removal
- Clear cart interaction
- Price recalculation
- Order summary
- Empty-cart state
- Checkout placeholder

Cart persistence and real checkout are intentionally deferred to the backend stage.

### 👤 Authentication & Profile

The project includes frontend interfaces for:

- Login
- Registration
- Profile
- Password visibility controls
- Form validation
- Demo authentication feedback

There is currently no real authentication service or persistent user account system.

### 💬 Reviews

The product page contains a review/comment interface for frontend interaction testing. Comments are currently handled in the browser only and are not persisted.

A real review system will require authenticated users, persistent storage, and eventually a relationship between users, products, and orders.

---

## 🧩 Architecture

TechVerse uses a component-oriented architecture built with **Vanilla JavaScript, ES Modules, Custom Elements, and Shadow DOM**.

Reusable components include:

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

Examples of custom elements used by the application:

```html
<nav-bar></nav-bar>
<category-component></category-component>
<product-category></product-category>
<products-detail></products-detail>
<footer-site></footer-site>
```

The product-detail system follows a data-driven flow:

```text
URL ?id=...
      ↓
Find product by ID
      ↓
Read product category
      ↓
Select category-specific renderer
      ↓
Render shared product-detail structure
      ↓
Bind interactions
```

Gaming products add one more layer:

```text
Product
  ↓
category = gaming
  ↓
specifications.device_type
  ↓
Gaming-specific configuration
  ↓
Shared renderer
```

This keeps the page structure reusable while allowing different product categories to expose different specifications.

---

## 🔄 Product Catalog Data Flow

The catalog follows a state-driven flow rather than using the DOM as the source of truth:

```text
products.json
     ↓
products state
     ↓
search / filters / sort
     ↓
filteredProducts
     ↓
currentPage
     ↓
visible products
     ↓
render
```

When search, sorting, or filters change, the current page is reset and the visible product list is rendered again.

---

## 🛠️ Technologies

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- ES Modules
- DOM API
- Custom Elements
- Web Components
- Shadow DOM

### Tooling

- Git
- GitHub
- Vite
- npm

### Data

- Local JSON product dataset
- 600 product records
- Six product categories

---

## 📁 Project Structure

```text
ThchVerse/
│
├── Data/
│   └── products.json
│
├── assets/
│   └── images/
│
├── css/
│   ├── card/
│   ├── home/
│   ├── login/
│   ├── products/
│   ├── products-details/
│   ├── profile/
│   ├── animations.css
│   ├── global.css
│   └── variables.css
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
│   ├── nav.js
│   ├── products-detail.js
│   ├── products.js
│   └── profile.js
│
├── pages/
│   ├── card.html
│   ├── home.html
│   ├── login.html
│   ├── products-details.html
│   ├── products.html
│   ├── profile.html
│   └── register.html
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── package.json
├── package-lock.json
└── README.md
```

---

## ▶️ Running the Project

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The application pages are located under the `pages/` directory.

If the project is kept inside the repository's `ThchVerse/` directory, the application uses paths such as:

```text
/ThchVerse/pages/home.html
/ThchVerse/pages/products.html
/ThchVerse/pages/products-details.html?id=1
```

---

## 🎯 Project Scope

The goal of this project was not simply to reproduce an e-commerce UI. It was built as a practical environment for learning and applying frontend engineering concepts:

- Component-based UI architecture
- Web Components and Shadow DOM
- Dynamic rendering
- State-driven interfaces
- URL-driven application state
- Search, filtering, sorting, and pagination
- Data-driven product detail pages
- Event delegation
- Modular JavaScript
- Responsive CSS architecture
- Loading and empty states
- Git/GitHub workflow
- Separating UI concerns from product data

---

## 🚧 Current Limitations

TechVerse is a **frontend project**, not a complete production e-commerce system yet.

The following features are intentionally deferred to a future backend phase:

- Real authentication and authorization
- Persistent user accounts
- Database integration
- Persistent cart and wishlist
- Orders and order history
- Real product management
- Persistent reviews and ratings
- Payment processing
- Server-side validation
- API-based product data

The current demo interactions are therefore designed to demonstrate frontend behavior and architecture rather than production persistence.

---

## 🔮 Future Development

The planned evolution of TechVerse is:

```text
Vanilla JavaScript Frontend
          ↓
      React
          ↓
    TypeScript
          ↓
   Node.js / Backend
          ↓
       Database
          ↓
 Authentication / Cart / Orders / Reviews
```

The current frontend will serve as the foundation for a later full-stack version rather than being discarded and rebuilt from zero.

---

## 📌 Project Status

> ✅ **Frontend phase completed**

The current stage represents the completion of the main Vanilla JavaScript frontend implementation. The next learning phase is **React**, followed later by backend development and persistent application features.

---

## 📜 License

This project is currently intended for educational and personal development purposes.
