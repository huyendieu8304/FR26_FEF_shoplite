const detailContainer = document.getElementById('product-detail');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error-msg');
let currentProduct = null;

async function initProductDetail() {
    // get id from  query string
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError();
        return;
    }

    try {
        currentProduct = await fetchData(`/products/${productId}`);
        renderDetail(currentProduct);
    } catch (err) {
        showError();
    }
}

function showError() {
    loadingEl.classList.add('d-none');
    errorEl.classList.remove('d-none');
}

function renderDetail(prod) {
    document.getElementById('detail-img').src = prod.image;
    document.getElementById('detail-img').alt = prod.title;
    document.getElementById('detail-category').textContent = prod.category;
    document.getElementById('detail-title').textContent = prod.title;
    document.getElementById('detail-price').textContent = `$${prod.price.toFixed(2)}`;
    document.getElementById('detail-desc').textContent = prod.description;
    document.getElementById('detail-rating').textContent = `${prod.rating?.rate || 0} / 5`;

    loadingEl.classList.add('d-none');
    detailContainer.classList.remove('d-none');
}

// Add to cart
document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    if (currentProduct) {
        addToCart(currentProduct);
    }
});

document.addEventListener('DOMContentLoaded', initProductDetail);