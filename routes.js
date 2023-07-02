// const express = require('express');
// const router = express.Router();

// //middleware 선언 && 호출
// const productController = require("./controller/products");
// router.get('/', productController.hello);

// module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require("./controller/products");

router.get('/', productController.createProduct);

module.exports = router;
