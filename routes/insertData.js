// const fs = require("fs");
// const mysql = require("mysql");
// const fastcsv = require("fast-csv");

const express = require('express');
const { upload } = require('../config/multer.config');
const router = express.Router();
const productController = require("../controllers/Products");
const detailController = require("../controllers/Detail");
const cuponController = require("../controllers/Cupons");
const imageController = require("../controllers/Images");

router.post('/products',
  upload("file"),
  productController.import,
);

router.post('/detail',
  upload("file"),
  detailController.import,
)

router.post('/images',

  upload("file"),
  imageController.import,
)

router.post('/cupon',
  upload("file"),
  cuponController.import,
)

module.exports = router;
