const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017/tipsjs');

conn.on('connected', function () {
    console.log(`monggo da ket noi toi: ${this.name}`);
})
conn.on('disconnected', function () {
    console.log(`monggo disconnected ${this.name}`);
})
conn.on('err', function (err) {
    console.log(`monggo err ${JSON.stringify(err)}`);
})

process.on('SIGINT', async() => {
    await conn.close();
    process.exit(0);
})

module.exports= {
    conn
}