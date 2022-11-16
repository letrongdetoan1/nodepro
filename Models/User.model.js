const mongoose = require('mongoose');
const { testConnection, useConnection } = require('../helpels/connections_mutil_mongodb');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const UserSchema = new schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

UserSchema.pre('save', async function (next) {
    try {
        console.log(this.email, this.password);
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(this.password, salt);
        this.password = hashPass;
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isCheckPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {

    }
}

module.exports = testConnection.model('users', UserSchema)