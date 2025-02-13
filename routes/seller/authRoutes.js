const express = require("express");
const {
    sellerSignUp,
    sellerSignIn,
    sellerSignOut
} = require("../../controllers/seller/authController");

const router = express.Router();

// Seller Sign-Up Route
router.post("/signup", sellerSignUp);

// Seller Sign-In Route
router.post("/signin", sellerSignIn);

// Seller Sign-Out Route
router.post("/signout", sellerSignOut);

module.exports = router;