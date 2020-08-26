const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');

/* http://localhost:3000/company/ */
router.get('/', [
    passportJWT.isLogin,
    checkAdmin.isAdmin
], companyController.index);

module.exports = router;
