let allProducts = [];

const gridEl = document.getElementById('product-grid');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error-msg');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');

async function initHome() {
    try {
        // fetch product and category
        const [products, categories] = await Promise.all([
            fetchData('/products'),
            fetchData('/products/categories')
        ]);

        allProducts = products;

        renderCategories(categories);
        renderProducts(allProducts);

        loadingEl.classList.add('d-none');
    } catch (err) {
        loadingEl.classList.add('d-none');
        errorEl.classList.remove('d-none');
    }
}

document.addEventListener('DOMContentLoaded', initHome);