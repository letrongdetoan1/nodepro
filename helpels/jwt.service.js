const JWT = require('jsonwebtoken');

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

module.exports = {
    signAccessToken
}
