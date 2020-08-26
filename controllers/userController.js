const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

exports.index = (req, res, next) => {
    return res.status(200).json({
        data: [
            {id: 1, name: 'John'},
            {id: 2, name: 'Mary'}
        ]
    });
}

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        //check email ซ้ำ
        const existEmail = await User.findOne({email: email});
        if (existEmail) {
            const error = new Error('อีเมล์ซ้ำ มีผู้ใช้งานแล้ว ลองใหม่อีกครั้ง');
            error.statusCode = 400;
            throw error;
        }
    
        let user = new User();
        user.name = name;
        user.email = email;
        user.password = await user.encryptPassword(password);
    
        await user.save();
    
        return res.status(201).json({
            message: 'ลงทะเบียนเรียบร้อย'
        });  
    } catch (error) {
       next(error); 
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //check ว่ามีอีเมล์นี้ไม่ระบบหรือไม่
        const user = await User.findOne({email: email});
        if (!user) {
            const error = new Error('ไม่พบผู้ใช้งานในระบบ');
            error.statusCode = 404;
            throw error;
        }

        //ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่ ถ้าไม่ตรง (false) ให้โยน error ออกไป
        const isValid = await user.checkPassword(password);
        if (!isValid) {
            const error = new Error('รหัสผ่านไม่ถูกต้อง');
            error.statusCode = 401;
            throw error;
        }

        //สร้าง token
        const token = await jwt.sign({
            id: user._id,
            role: user.role
        }, config.JWT_SECRET , { expiresIn: '5 days' });

        //decode วันหมดอายุ
        const expires_in = jwt.decode(token);

        return res.status(200).json({
            access_token: token,
            expires_in: expires_in.exp,
            token_type: 'Bearer'
        }); 

    } catch (error) {
       next(error); 
    }
}

//get profile
exports.me = (req, res, next) => {
    const {_id, name, email, role } = req.user;

    return res.status(200).json({
        user: {
            id: _id,
            name: name,
            email: email,
            role: role
        }
    });
}

