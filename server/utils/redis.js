const {createClient} = require('redis');

let client;

module.exports.connect = async () => {
    client = createClient({url: process.env.REDIS_URL});
    await client.connect();
};

module.exports.client = client;
