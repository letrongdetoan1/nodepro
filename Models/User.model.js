const mongoose = require('mongoose');
const { testConnection, useConnection } = require('../helpels/connections_mutil_mongodb');
const schema = mongoose.Schema();

const UserSchema = new schema({
    username: {
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
const UserSchema1 = new schema({
    username: {
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

module.exports = {
    test: testConnection.model('user', UserSchema),
    user: useConnection.model('user', UserSchema1),
}