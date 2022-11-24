// const { createClient } = require('redis');
// const client = createClient();
// client.on('error', (err) => console.log('Redis Client Error', err));

// client.connect();
// client.ping((err, pong) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(pong);
// })
// client.set('key', 'value');
// const value = client.get('key');
// client.disconnect();

// module.exports = client
const redis = require('redis');
const client = redis.createClient();
client.connect();
client.ping().then(data => {
    console.log(data);
})
client.on('error', (err) => {
    console.log('error');
})
client.on('connect', (err) => {
    console.log('connect');
})
client.on('ready', (err) => {
    console.log('ready');
})
// client.disconnect();
module.exports = client