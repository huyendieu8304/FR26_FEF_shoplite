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

        if (categoryFilter && categories) {
            renderCategories(categories);
        }

        if (gridEl && allProducts) {
            renderProducts(allProducts);
        }

    } catch (err) {
        if (errorEl) {
            errorEl.classList.remove('hidden');
        }
    } finally {
        // success or not,  hidden loading
        if (loadingEl) {
            loadingEl.classList.add('hidden');
        }
    }
}

// render category select
function renderCategories(categories) {
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categoryFilter.appendChild(option);
    });
}

function renderProducts(products) {
    gridEl.innerHTML = '';
    if (products.length === 0) {
        gridEl.innerHTML = `<div class="col-span-full text-center text-gray-500 my-4">No products found.</div>`;
        return;
    }

    products.forEach(prod => {
        const col = document.createElement('div');
        col.className = 'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transform hover:-translate-y-1 hover:shadow-md transition duration-200';
        col.innerHTML = `
            <div class="product-img-container border-b border-gray-50">
                <img src="${prod.image}" alt="${prod.title}">
            </div>
            <div class="p-4 flex flex-col flex-grow">
                <h5 class="text-sm font-bold text-gray-800 truncate mb-1" title="${prod.title}">${prod.title}</h5>
                <p class="text-base font-extrabold text-red-500 mb-4">$${prod.price.toFixed(2)}</p>
                <div class="mt-auto flex gap-2">
                    <a href="product.html?id=${prod.id}" class="w-1/2 text-center bg-gray-100 text-gray-700 text-xs font-semibold py-2 rounded-lg hover:bg-gray-200 transition">Details</a>
                    <button class="w-1/2 bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg hover:bg-blue-700 transition btn-add" data-id="${prod.id}">+ Cart</button>
                </div>
            </div>
        `;
        gridEl.appendChild(col);
    });

    // add to cart event
    gridEl.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pId = parseInt(e.target.getAttribute('data-id'));
            const productFound = allProducts.find(p => p.id === pId);
            if (productFound) {
                // check whether the function exist
                if (typeof addToCart === 'function') {
                    addToCart(productFound);
                } else {
                    alert(`Product: ${productFound.title} (Can not connect to server to get product's details)`);
                }
            }
        });
    });
}

// search and filter
function filterAndSearch() {
    const keyword = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filtered = allProducts.filter(prod => {
        const matchesSearch = prod.title.toLowerCase().includes(keyword);
        const matchesCategory = selectedCategory === "" || prod.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
}

// add event listener to search and filter
searchInput.addEventListener('input', filterAndSearch);
categoryFilter.addEventListener('change', filterAndSearch);

document.addEventListener('DOMContentLoaded', initHome);