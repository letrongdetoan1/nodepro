const JWT = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const playload = {
            userId
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: '1h'
        }
        JWT.sign(playload, secret, options, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

const verifyToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized());
    }
    const authHeader = req.headers['authorization'];
    const bearerTolen = authHeader.split(' ');
    const token = bearerTolen[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return next(createError.Unauthorized());
        }
        req.playload = payload;
        next();
    })
}

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const playload = {
            userId
        }
        const secret = process.env.REFRESH_TOKEN_SECRET
        const options = {
            expiresIn: '1y'
        }
        JWT.sign(playload, secret, options, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

module.exports = {
    signAccessToken,
    verifyToken,
    signRefreshToken
}
