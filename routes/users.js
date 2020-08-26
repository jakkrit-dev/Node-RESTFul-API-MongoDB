const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const passportJWT = require('../middleware/passportJWT');

/* GET users listing. */
/* http://localhost:3000/user/ */
router.get('/', userController.index);

/* http://localhost:3000/user/login */
router.post('/login', userController.login);

/* http://localhost:3000/user/register */
router.post('/register', [
    body('name').not().isEmpty().withMessage('กรุณาป้อนข้อมูลชื่อสกุลด้วย'),
    body('email').not().isEmpty().withMessage('กรุณากรอกอีเมล์ด้วย').isEmail().withMessage('รูปแบบอีเมล์ไม่ถูกต้อง'),
    body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่านด้วย').isLength({min: 3}).withMessage('รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป')
] ,userController.register);


/* GET users listing. */
/* http://localhost:3000/user/me */
router.get('/me', [passportJWT.isLogin] , userController.me);

module.exports = router;
