const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

/* http://localhost:3000/shop/ */
router.get('/', shopController.index);

/* http://localhost:3000/shop/menu */
router.get('/menu', shopController.menu);

/* http://localhost:3000/shop/:id */
router.get('/:id', shopController.getShopWithMenu);

/* http://localhost:3000/shop/ */
router.post('/', shopController.insert);

module.exports = router;