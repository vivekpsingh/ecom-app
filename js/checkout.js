// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('userName').textContent = user.name;
        document.getElementById('email').value = user.email;
    }
}

// Initialize checkout page
function init() {
    checkAuth();
    loadOrderSummary();
    setupStripe();
    setupEventListeners();
}

// Load order summary
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItems = document.getElementById('orderItems');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    orderItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center';
        itemElement.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                <div>
                    <h4 class="font-semibold">${item.name}</h4>
                    <p class="text-gray-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
            </div>
            <span class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderItems.appendChild(itemElement);
        subtotal += item.price * item.quantity;
    });

    const shipping = 10; // Fixed shipping cost
    const total = subtotal + shipping;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Setup Stripe
function setupStripe() {
    // Replace with your Stripe publishable key
    const stripe = Stripe('your_publishable_key');
    const elements = stripe.elements();

    // Create card element
    const card = elements.create('card');
    card.mount('#card-element');

    // Handle validation errors
    card.addEventListener('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });
}

// Setup Event Listeners
function setupEventListeners() {
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
}

// Handle Checkout Submit
async function handleCheckoutSubmit(e) {
    e.preventDefault();
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';

    try {
        // In a real application, you would:
        // 1. Send card information to Stripe to get a payment token
        // 2. Send the token and order information to your backend
        // 3. Process the payment on your backend
        // 4. Create the order in your database

        // For this demo, we'll simulate a successful payment
        await simulatePaymentProcessing();
        
        // Create order
        const order = createOrder();
        
        // Show success modal
        showSuccessModal(order.id);
        
        // Clear cart
        localStorage.setItem('cart', JSON.stringify([]));
        
    } catch (error) {
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
        submitButton.disabled = false;
        submitButton.textContent = 'Place Order';
    }
}

// Simulate payment processing
function simulatePaymentProcessing() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000); // Simulate 2 second processing time
    });
}

// Create order
function createOrder() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const user = JSON.parse(localStorage.getItem('currentUser'));

    const newOrder = {
        id: generateOrderId(),
        userId: user.id,
        customerName: user.name,
        items: cart,
        total: calculateTotal(),
        status: 'Pending',
        date: new Date().toISOString(),
        shippingAddress: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postalCode').value,
            country: document.getElementById('country').value
        }
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    return newOrder;
}

// Generate Order ID
function generateOrderId() {
    return 'ORD' + Date.now().toString().slice(-6);
}

// Calculate Total
function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return subtotal + 10; // Add shipping cost
}

// Show Success Modal
function showSuccessModal(orderId) {
    const modal = document.getElementById('successModal');
    const orderNumber = document.getElementById('orderNumber');
    orderNumber.textContent = orderId;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Initialize the checkout page
init(); 