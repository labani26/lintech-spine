const express = require('express');
const router = express.Router();
const { customerSignUp, customerSignIn, getCustomerDetails } = require('../../controllers/customer/authController');
const { authenticateToken } = require('../../middlewares/authMiddleware');



router.post("/signup", customerSignUp);
router.post("/signin", customerSignIn);
router.get("/getCustomer", authenticateToken , getCustomerDetails);

module.exports = router;