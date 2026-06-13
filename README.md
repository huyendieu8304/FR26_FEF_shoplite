# ShopLite — Mini E-Commerce Website

ShopLite is a fully responsive, client-side multi-page shopping website built for the Front-End Foundations (FEF) assignment. The application runs entirely on the browser, fetching product data dynamically from the public `FakeStoreAPI` and managing persistent state (shopping cart) locally using `localStorage`.

- **Deployment Link:** [Click here to view the live demo](https://huyendieu8304.github.io/FR26_FEF_shoplite/)
- **Repository Link:** [https://github.com/huyendieu8304/FR26_FEF_shoplite](https://github.com/huyendieu8304/FR26_FEF_shoplite)

---

## 🚀 Technologies Used

- **HTML5:** Semantic architecture for accessible SEO-friendly structure.
- **CSS3 & Tailwind CSS:** Modern utility-first framework for layout alignment, grid spacing, and utility responsiveness.
- **Vanilla JavaScript (ES6+):** Complete DOM manipulation, asynchronous data processing, and custom client-side form validation.
- **Fetch API:** Asynchronous integration with external services (`https://fakestoreapi.com`).
- **Font Awesome:** Scalable vector icon integration.
- **Local Storage:** State persistence across browser sessions for the cart workflow.

---

## 🛠️ Features Checklist

Here is the breakdown of completed features classified by the assignment grading tiers:

### 🟩 PASS TIER (Grades 5.0 - 6.5)
- [x] **Multi-page Architecture:** Formed 4 semantic pages (`index.html`, `product.html`, `cart.html`, `register.html`) matching the suggested standard directory tree.
- [x] **Home Page Layout:** Grid architecture cleanly organizing product cards with titles, pricing, and functional navigation elements.
- [x] **Asynchronous Fetching:** Seamless async/await integration retrieving live items from `/products`.
- [x] **Loading & Error Safety States:** Dynamic indicators handling UI rendering gracefully during active pending networks or unexpected server fallbacks.
- [x] **Basic Cart Operations:** Add items to cart with proper state synchronization to browser `localStorage`.
- [x] **Navbar Cart Badge:** Persistent responsive counter updating total quantity immediately across all routing pages.

### 🟨 GOOD TIER (Grades 7.0 - 8.5)
- [x] **Interactive Catalog Filtering:** Real-time search query matching product titles alongside custom dropdown filters targeting specific categories dynamically from `/products/categories`.
- [x] **Product Detail Page:** Deep linking with safe URL query parameters (`?id=...`) to grab singular dynamic payload records, featuring error boundaries and clear specifications.
- [x] **Advanced Cart Manipulation:** Incremental control triggers (`+` / `-` buttons) inside the checkout viewport that recalculate totals instantly or remove nodes safely upon zero-threshold counts.
- [x] **Client-side Registration Validation:** Robust evaluation blocking empty strings, ensuring specific string regex restrictions (correct `@` format for emails, 10-digit formats for mobile numbers), and mandatory validation checkboxes.

### 🟦 EXCELLENT TIER (Grades 9.0 - 10.0)
- [x] **Layout Hand-crafted Balance:** Blended utility-first responsive rules with highly strict, custom written layout CSS constraints (e.g., `.product-img-container` using flexbox to control varied image aspects beautifully without warping grid balances).
- [x] **Smooth UI Experience (BFCache Defense):** Implemented targeted listener guards (`pageshow`) preventing frozen loader visual states or data aggregation duplicates when users tap browser back/forward buttons from internal pathways.
- [x] **Elegant Success Notifications:** Modern confirmation feedback keeping interactions tactile and informative.

---

## 📁 Project Directory Structure

```text
fef-shoplite/
├── index.html          # Home & Product Listing Catalog 
├── product.html        # Dynamic Product Detail View
├── cart.html           # Shopping Cart Summary View
├── register.html       # Client Registration Form View
├── css/
│   └── style.css       # Hand-crafted CSS layout rules for image preservation
├── js/
│   ├── api.js          # Unified shared abstract Fetch handler 
│   ├── cart.js         # Centralized Cart engine, counter badge & localStorage actions
│   ├── home.js         # Catalog runtime, rendering filters and loaders
│   ├── product.js      # Parameter extractor and individual specifications logic
│   └── register.js     # Form input interception, state management & validation
└── README.md           # Documentation manual