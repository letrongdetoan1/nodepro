const mongoose = require('mongoose');
function newConnection(uri) {
    const conn = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    conn.on('connected', function () {
        console.log(`monggo da ket noi toi: ${this.name}`);
    })
    conn.on('disconnected', function () {
        console.log(`monggo disconnected ${this.name}`);
    })
    conn.on('err', function (err) {
        console.log(`monggo err ${JSON.stringify(err)}`);
    })

    process.on('SIGINT', async () => {
        await conn.close();
        process.exit(0);
    })
    return conn;

}
const testConnection = newConnection(process.env.URI_MONGODB_TEST)
const useConnection = newConnection(process.env.URI_MONGODB_USER)
module.exports = {
    testConnection,
    useConnection
}
