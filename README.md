# Lintech Spine

Lintech Spine is the backend of an e-commerce platform for selling computer parts. It is built using Express.js and follows a RESTful API structure to manage products, orders, users, and payments.

## Features
- User authentication (JWT-based)
- Product management (CRUD operations)
- Order processing
- Admin panel support
- Cart and wishlist functionalities
- Secure API with role-based access control

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JWT for authentication
- Stripe/Razorpay for payments
- Multer for file uploads

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/labani26/lintech-spine.git
   cd lintech-spine
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CUST_SECRET=your customer secret
   ```

4. Start the server:
   ```sh
   npm run dev
   ```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
