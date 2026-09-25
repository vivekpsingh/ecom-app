// Initialize AOS Animation Library
AOS.init({
    duration: 800,
    once: true
});

// Sample Product Data
const products = [
    {
        id: 1,
        name: "Kanha Ji Poshak",
        price: 500.00,
        image: "https://myladdugopal.com/wp-content/uploads/2025/11/winter-collection.png",
        category: "Laddu Gopal Dresses",
        description: "Garam Poshaak Crafted from warm wool or velvet materials to protect the deity during colder months."
    },
    {
        id: 2,
        name: "Laddu Gopal Dresses",
        price: 400.00,
        image: "https://i.etsystatic.com/28680422/r/il/c27cf4/4244260316/il_1080xN.4244260316_l9de.jpg",
        category: "Dresses",
        description: "Krishna poshak is a traditional, handcrafted outfit designed for Krishna idols"
    },
    {
        id: 3,
        name: "Poshak",
        price: 550.00,
        image: "https://www.shrikrishnastore.com/wp-content/uploads/2020/12/17.jpg",
        category: "Dresses",
        description: "Comfortable and handcrafted outfit designed for Krishna"
    },
    {
        id: 4,
        name: "Poshak",
        price: 450.00,
        image: "https://tse1.mm.bing.net/th/id/OIP.JorxLjyN1ynBX-yebp9ZFQHaHP?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        category: "Dresses",
        description: "A Laddu Gopal dress is a traditional, handcrafted outfit designed for infant Krishna idols"
    },
    {
        id: 5,
        name: "Laddu Gopal Dresses",
        price: 699.00,
        image: "https://kanhahouse.in/cdn/shop/files/velvetdressforladdugopalji8_620x.webp?v=1732715310",
        category: "Dresses",
        description: "A Laddu Gopal dress is a traditional, handcrafted outfit designed for infant Krishna idols"
    },
    {
        id: 6,
        name: "Laddu Gopal Dresses",
        price: 490.00,
        image: "https://i.etsystatic.com/26655021/r/il/28baeb/5455924398/il_1588xN.5455924398_3hjh.jpg",
        category: "Dresses",
        description: "A Laddu Gopal dress is a traditional, handcrafted outfit designed for infant Krishna idols"
    }
];

// Initialize localStorage with sample data if empty
function initializeData() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(products));
    }
    if (!localStorage.getItem('users')) {
        const users = [
            {
                id: 1,
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'admin123', // In a real app, this should be hashed
                role: 'admin'
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
}

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const checkoutBtn = document.getElementById('checkoutBtn');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const priceRange = document.getElementById('priceRange');

// DOM Elements for Auth
const guestControls = document.getElementById('guestControls');
const userControls = document.getElementById('userControls');
const adminControls = document.getElementById('adminControls');
const userName = document.getElementById('userName');
const adminName = document.getElementById('adminName');
const userLogoutBtn = document.getElementById('userLogoutBtn');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');

// Initialize the application
function init() {
    initializeData();
    displayProducts();
    setupEventListeners();
    updateCartCount();
    checkAuthStatus();
}

// Check Authentication Status
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    // Hide all controls first
    guestControls.classList.add('hidden');
    userControls.classList.add('hidden');
    adminControls.classList.add('hidden');

    if (user) {
        if (user.role === 'admin') {
            // Show admin controls
            adminControls.classList.remove('hidden');
            adminName.textContent = `Admin: ${user.name}`;
        } else {
            // Show user controls
            userControls.classList.remove('hidden');
            userName.textContent = `Welcome, ${user.name}`;
        }
    } else {
        // Show guest controls
        guestControls.classList.remove('hidden');
    }
}

// Filter by Category
function filterByCategory(category) {
    categoryFilter.value = category;
    handleFilters();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Handle Filters
function handleFilters() {
    const filters = {
        category: categoryFilter?.value,
        search: searchInput?.value,
        sort: sortSelect?.value,
        maxPrice: parseFloat(priceRange?.value)
    };
    displayProducts(filters);
}

// Display Products with Filters
function displayProducts(filters = {}) {
    const productsContainer = document.querySelector('#products .grid');
    productsContainer.innerHTML = '';

    let filteredProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Apply category filter
    if (filters.category && filters.category !== 'All') {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }

    // Apply search filter
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    // Apply price filter
    if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
    }

    // Apply sorting
    if (filters.sort) {
        switch (filters.sort) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
    }

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-span-full text-center py-8">
                <p class="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-xl';
    card.setAttribute('data-aos', 'fade-up');

    card.innerHTML = `
        <div class="relative overflow-hidden group">
            <img src="${product.image}" alt="${product.name}" 
                class="w-full h-64 object-cover transform transition duration-300 group-hover:scale-110">
            <span class="category-badge">${product.category}</span>
        </div>
        <div class="p-4">
            <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
            <p class="text-gray-600 mb-4 h-12 overflow-hidden">${product.description}</p>
            <div class="flex justify-between items-center">
                <span class="price-tag">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                        data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    return card;
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart Modal
    cartBtn.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
        cartModal.classList.add('flex');
        updateCartDisplay();
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.add('hidden');
        cartModal.classList.remove('flex');
    });

    // Login Modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.remove('hidden');
        loginModal.classList.add('flex');
    });

    closeLogin.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        loginModal.classList.remove('flex');
    });

    // Register Modal
    registerBtn.addEventListener('click', () => {
        registerModal.classList.remove('hidden');
        registerModal.classList.add('flex');
    });

    closeRegister.addEventListener('click', () => {
        registerModal.classList.add('hidden');
        registerModal.classList.remove('flex');
    });

    // Add to Cart
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
        }
    });

    // Filter event listeners
    categoryFilter?.addEventListener('change', handleFilters);
    searchInput?.addEventListener('input', handleFilters);
    sortSelect?.addEventListener('change', handleFilters);
    priceRange?.addEventListener('input', handleFilters);

    // Forms
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    checkoutBtn.addEventListener('click', handleCheckout);

    // Auth event listeners
    userLogoutBtn.addEventListener('click', handleLogout);
    adminLogoutBtn.addEventListener('click', handleLogout);
}

// Add to Cart
function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showToast('Product added to cart!');
    }
}

// Update Cart Display
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-4';
        itemElement.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                <div>
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <button class="quantity-btn bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300" data-id="${item.id}" data-action="decrease">-</button>
                <span class="font-semibold">${item.quantity}</span>
                <button class="quantity-btn bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300" data-id="${item.id}" data-action="increase">+</button>
                <button class="remove-item text-red-500 hover:text-red-700" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        // Add event listeners for quantity buttons and remove button
        const decreaseBtn = itemElement.querySelector('[data-action="decrease"]');
        const increaseBtn = itemElement.querySelector('[data-action="increase"]');
        const removeBtn = itemElement.querySelector('.remove-item');

        decreaseBtn.addEventListener('click', () => updateQuantity(item.id, -1));
        increaseBtn.addEventListener('click', () => updateQuantity(item.id, 1));
        removeBtn.addEventListener('click', () => removeFromCart(item.id));

        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            updateCartCount();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
    showToast('Product removed from cart!');
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.classList.add('cart-badge');
    setTimeout(() => cartCount.classList.remove('cart-badge'), 500);
}

// Show Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector('[type="email"]').value;
    const password = e.target.querySelector('[type="password"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showToast(`Welcome back, ${user.name}!`);
        loginModal.classList.add('hidden');
        loginModal.classList.remove('flex');
        checkAuthStatus();
    } else {
        showToast('Invalid credentials!');
    }
}

// Handle Register
function handleRegister(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = {
        id: users.length + 1,
        name: e.target.querySelector('[type="text"]').value,
        email: e.target.querySelector('[type="email"]').value,
        password: e.target.querySelector('[type="password"]').value,
        role: 'customer'
    };

    if (users.some(u => u.email === newUser.email)) {
        showToast('Email already exists!');
        return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    showToast('Registration successful!');
    registerModal.classList.add('hidden');
    registerModal.classList.remove('flex');
    checkAuthStatus();
}

// Handle Checkout
function handleCheckout() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        showToast('Please login to checkout!');
        loginModal.classList.remove('hidden');
        loginModal.classList.add('flex');
        return;
    }

    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }

    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Handle Logout
function handleLogout() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const role = user?.role || 'guest';
    
    localStorage.removeItem('currentUser');
    showToast('Logged out successfully!');
    checkAuthStatus();

    // Redirect admin to home page if logging out from admin panel
    if (role === 'admin' && window.location.pathname.includes('admin.html')) {
        window.location.href = 'index.html';
    }
}

// Initialize the application
init(); 