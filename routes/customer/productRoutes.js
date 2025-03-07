const express = require('express');
const { getAllProducts, getProductByCategory, getProductByVendor, getProductByModel, getProductById } = require('../../controllers/customer/productController');
const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getProdByCategory/:name", getProductByCategory);
router.get("/getProductByVendor/:vendor", getProductByVendor)
router.get("/getProductByModel/:model", getProductByModel)
router.get("/getProductById/:id", getProductById)

module.exports = router;