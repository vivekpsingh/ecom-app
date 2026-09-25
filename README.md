# E-Shop - Modern E-commerce Website

A fully responsive e-commerce website built with HTML, CSS, and JavaScript, featuring a modern UI, user authentication, shopping cart functionality, and admin dashboard.

## 🎯 Task Objectives

- Create a responsive e-commerce website
- Implement user authentication (customer and admin roles)
- Develop product management functionality
- Create shopping cart and checkout process
- Build category-based product filtering
- Design an admin dashboard for product management
- Ensure a modern and intuitive user interface

## ✨ Features

- **User Authentication**
  - Customer and Admin roles
  - Secure login/register system
  - Role-based access control

- **Product Management**
  - Product listing with filters
  - Category-based organization


- **Shopping Cart**
  - Add/remove products
 

- **Admin Dashboard**
  - Product management (CRUD operations)
  - Order management
  

- **Responsive Design**
  - Mobile-first approach
  - Smooth animations
  - Modern UI components

## 🚀 Getting Started

### Prerequisites

- Modern web browser
- Text editor (VS Code recommended)
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shrinivas5/E-commerce-Website
   
   ```

2. No additional installation needed as the project uses CDN for dependencies:
   - Tailwind CSS
   - Bootstrap
   - Font Awesome
   - AOS Animation Library

3. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

## 🛠️ Project Structure

```
e-shop/
├── index.html
├── admin.html
├── checkout.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── admin.js
│   └── checkout.js
└── README.md
```

## 💻 Usage

### Customer Access
1. Open `index.html`
2. Browse products by category
3. Use filters to find specific products
4. Add items to cart
5. Register/Login to checkout

### Admin Access
1. Login with admin credentials:
   - Email: admin@example.com
   - Password: admin123
2. Access admin dashboard
3. Manage products and orders

## 🎨 Customization

### Colors
- Primary: Indigo (#4f46e5)
- Secondary: Purple (#7c3aed)
- Modify in `style.css` or using Tailwind classes

### Adding Products
```javascript
const product = {
    id: uniqueId,
    name: "Product Name",
    price: 99.99,
    category: "Category",
    description: "Product description",
    image: "image-url"
};
```

## 🔒 Security Features

- Role-based authentication
- Protected admin routes
- Secure checkout process
- Input validation

## 🌟 Best Practices

- Semantic HTML
- Mobile-first approach
- Clean and commented code
- Modular JavaScript
- Responsive design
- Optimized animations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [AOS Library](https://michalsnik.github.io/aos/) 
