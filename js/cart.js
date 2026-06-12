// update amount on Badge Navbar
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

// get cảt from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('shoplite_cart')) || [];
}

//save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('shoplite_cart', JSON.stringify(cart));
    updateCartBadge();
}

// add a product to cart
function addToCart(product) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart(cart);
    alert(`Added "${product.title}" to cart successfully!`);
}

// FOR RENDER CART PAGE
const itemsContainer = document.getElementById('cart-items-container');
const emptyMsg = document.getElementById('empty-cart-msg');
const totalEl = document.getElementById('cart-total');

function renderCartPage() {
    if (!itemsContainer) return;

    const cart = getCart();
    itemsContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyMsg.classList.remove('hidden');
        totalEl.textContent = '$0.00';
        return;
    }

    emptyMsg.classList.add('hidden');
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const itemRow = document.createElement('div');
        itemRow.className = 'bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4';
        itemRow.innerHTML = `
            <div class="flex items-center gap-4 w-full sm:w-auto">
                <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain flex-shrink-0 bg-white p-1 border rounded">
                <div class="min-w-0 flex-grow">
                    <h6 class="text-sm font-bold text-gray-800 truncate" style="max-width: 280px;">${item.title}</h6>
                    <small class="text-red-500 font-extrabold text-sm">$${item.price.toFixed(2)}</small>
                </div>
            </div>
            <div class="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0">
                <div class="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                    <button class="px-2.5 py-1 text-gray-600 hover:text-black font-bold btn-minus" data-id="${item.id}">-</button>
                    <span class="px-3 font-bold text-sm text-gray-800">${item.quantity}</span>
                    <button class="px-2.5 py-1 text-gray-600 hover:text-black font-bold btn-plus" data-id="${item.id}">+</button>
                </div>
                <button class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition btn-remove" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        itemsContainer.appendChild(itemRow);
    });

    totalEl.textContent = `$${totalPrice.toFixed(2)}`;
    attachCartEvents();
}

function attachCartEvents() {
    let cart = getCart();

    // increase amount
    itemsContainer.querySelectorAll('.btn-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            const item = cart.find(i => i.id === id);
            if (item) item.quantity += 1;
            saveCart(cart);
            renderCartPage();
        });
    });

    // decrease ammount
    itemsContainer.querySelectorAll('.btn-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.id !== id);
                }
            }
            saveCart(cart);
            renderCartPage();
        });
    });

    // delete all cart
    itemsContainer.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            cart = cart.filter(i => i.id !== id);
            saveCart(cart);
            renderCartPage();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // update badge on cart right after load page successful
    updateCartBadge();

    // if in cart.html. render cart page
    if (itemsContainer) {
        renderCartPage();
    }
});

// document.addEventListener('DOMContentLoaded', updateCartBadge);
//
// document.addEventListener('DOMContentLoaded', renderCartPage);

