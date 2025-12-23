# E-Commerce Application

A full-stack e-commerce application built with React and Node.js, featuring user authentication, product management, shopping cart, and order processing.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Product Management**: Browse and add products
- **Shopping Cart**: Add, remove, and manage items in cart
- **Order Processing**: Complete checkout and view order history
- **Responsive Design**: Built with TailwindCSS for mobile and desktop
- **Protected Routes**: Secure user-specific pages

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** - Fast build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP requests
- **TailwindCSS** - Styling framework
- **React Toastify** - Toast notifications

### Backend
- **Node.js** with Express 5.2.1
- **MongoDB** with Mongoose 9.0.1
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

## 📁 Project Structure

```
E-commerce-frontend-backend/
├── backend/
│   ├── config/
│   │   └── db.js               # Database configuration
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── cartController.js   # Cart operations
│   │   └── orderController.js  # Order processing
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Product.js          # Product schema
│   │   ├── Cart.js             # Cart schema
│   │   └── Order.js            # Order schema
│   ├── routes/
│   │   ├── auth.js             # Auth routes
│   │   ├── product.js          # Product routes
│   │   ├── carts.js            # Cart routes
│   │   └── orders.js           # Order routes
│   ├── .env                    # Environment variables
│   ├── package.json
│   └── server.js               # Entry point
│
└── frontend/
    ├── public/                 # Static assets
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx      # Navigation header
    │   │   ├── Footer.jsx      # Footer component
    │   │   ├── ProductCard.jsx # Product display card
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── context/
    │   │   └── AuthContext.jsx # Authentication state
    │   ├── pages/
    │   │   ├── Home.jsx        # Landing page
    │   │   ├── Login.jsx       # Login/Register page
    │   │   ├── Products.jsx    # Product listing
    │   │   ├── AddProduct.jsx  # Add new product
    │   │   ├── Cart.jsx        # Shopping cart
    │   │   └── Order.jsx       # Order history
    │   ├── App.jsx             # Main app component
    │   ├── main.jsx            # Entry point
    │   ├── App.css
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    └── index.html
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
SECRET_KEY=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Start the backend server:
```bash
node server.js
```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port)

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Products
- `GET /products` - Get all products
- `POST /products` - Add new product (protected)
- `GET /products/:id` - Get product by ID
- `PUT /products/:id` - Update product (protected)
- `DELETE /products/:id` - Delete product (protected)

### Cart
- `GET /carts` - Get user cart (protected)
- `POST /carts` - Add item to cart (protected)
- `PUT /carts/:id` - Update cart item (protected)
- `DELETE /carts/:id` - Remove from cart (protected)

### Orders
- `GET /orders` - Get user orders (protected)
- `POST /orders` - Create new order (protected)
- `GET /orders/:id` - Get order details (protected)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. After login, the token is stored and included in protected API requests via the Authorization header.

## 🎨 Frontend Pages

- **Home** - Landing page with welcome message
- **Login/Register** - User authentication
- **Products** - Browse all available products
- **Add Product** - Admin page to add new products
- **Cart** - View and manage shopping cart
- **Orders** - View order history

## 📝 Environment Variables

### Backend (.env)
```env
SECRET_KEY=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

## 🚀 Deployment

### Backend Deployment
- Can be deployed to services like Heroku, Railway, Render, or AWS
- Ensure environment variables are set in the hosting platform

### Frontend Deployment
- Build the production version:
```bash
npm run build
```
- Deploy the `dist` folder to Netlify, Vercel, or similar platforms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Manoj V

## 🙏 Acknowledgments

- React documentation
- Express.js documentation
- MongoDB documentation
- TailwindCSS documentation
