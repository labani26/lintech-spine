const express = require('express');
const router = express.Router();
const { customerSignUp, customerSignIn } = require('../../controllers/customer/authController');


router.post("/signup", customerSignUp);
router.post("/signin", customerSignIn);

module.exports = router;