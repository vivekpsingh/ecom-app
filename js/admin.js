// Check if user is logged in as admin
function checkAdminAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'admin') {
        showToast('Access denied. Admin privileges required.');
        window.location.href = 'index.html';
    } else {
        document.getElementById('adminName').textContent = `Admin: ${user.name}`;
    }
}

// Initialize admin dashboard
function init() {
    checkAdminAuth();
    loadProducts();
    loadOrders();
    setupEventListeners();
}

// Load products from localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <img src="${product.image}" alt="${product.name}" class="h-16 w-16 object-cover rounded-lg">
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${product.name}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">$${product.price.toFixed(2)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    ${product.category}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900 mr-4" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-600 hover:text-red-900" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        productsList.appendChild(row);
    });
}

// Load orders from localStorage
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';

    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'bg-gray-50 p-4 rounded-lg';
        orderElement.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div>
                    <span class="font-semibold">Order #${order.id}</span>
                    <span class="ml-4 text-gray-600">${new Date(order.date).toLocaleDateString()}</span>
                </div>
                <span class="px-2 py-1 rounded-full text-xs ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                }">
                    ${order.status}
                </span>
            </div>
            <div class="text-sm text-gray-600">
                Customer: ${order.customerName}<br>
                Total: $${order.total.toFixed(2)}
            </div>
            <div class="mt-2">
                <button class="text-sm text-indigo-600 hover:text-indigo-900" onclick="updateOrderStatus(${order.id}, 'Completed')">
                    Mark as Completed
                </button>
            </div>
        `;
        ordersList.appendChild(orderElement);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    const productForm = document.getElementById('productForm');
    const logoutBtn = document.getElementById('logoutBtn');

    productForm.addEventListener('submit', handleProductSubmit);
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
}

// Handle Product Form Submit
function handleProductSubmit(e) {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const newProduct = {
        id: products.length + 1,
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
    e.target.reset();
    showToast('Product added successfully!');
}

// Edit Product
function editProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productImage').value = product.image;
        
        // Remove the old product
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
        }
    }
}

// Delete Product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const filteredProducts = products.filter(p => p.id !== productId);
        localStorage.setItem('products', JSON.stringify(filteredProducts));
        loadProducts();
        showToast('Product deleted successfully!');
    }
}

// Update Order Status
function updateOrderStatus(orderId, status) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
        showToast('Order status updated!');
    }
}

// Show Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Initialize the dashboard
init(); 