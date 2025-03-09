const express = require('express');
const router = express.Router();
const { ShopOrderNow } = require('../../controllers/admin/CreateOrder');

router.post("/shopOrder", ShopOrderNow);

module.exports = router;