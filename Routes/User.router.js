const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { signAccessToken, verifyToken, signRefreshToken } = require('../helpels/jwt.service');
const { validateUser } = require('../helpels/valiadateRegister');
const UserModel = require('../Models/User.model');

router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = validateUser(req.body);
        if (error) {
            throw (createError(error.details[0].message))
        }
        // if (!email || !password) {
        //     throw (createError.BadRequest('Thieu thong tin'));
        // }
        const isExist = await UserModel.findOne({ email });
        if (isExist) {
            throw (createError.Conflict('Da co tai khoan'));
        }

        const user = new UserModel({
            email, password
        })
        const account = await user.save()
        return res.json({
            status: 'success',
            account
        })

    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = validateUser(req.body);
        if (error) {
            throw (createError(error.details[0].message))
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            throw (createError.NotFound())
        }
        const isValid = await user.isCheckPassword(password);
        if (!isValid) {
            throw (createError.Unauthorized())
        }

        const accessToken = await signAccessToken(user._id);
        const refreshToken = await signRefreshToken(user._id);
        res.send({
            accessToken,
            refreshToken
        })

    }
    catch (error) {
        next(error)
    }
})

router.get('/list', verifyToken, (req, res, next) => {
    res.send('get list')
})
module.exports = {
    userRouter: router
}
