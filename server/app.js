require('dotenv').config();

process.env.SECRET_KEY = process.env.SECRET_KEY || 'secret';

const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const {connect} = require('./utils/redis');

const app = express();
// noinspection JSCheckFunctionSignatures
app.use(cors());
app.use(express.static('../client/dist'));
app.use(express.json());
app.use('/api', routes);
app.use((req, res) => {
    res.sendFile(require('path').join(__dirname, '../client/dist/index.html'))
});

const startServer = async () => {
    await connect();
    if (process.env.NODE_ENV !== 'test') console.log('Connected to Redis');
    await app.listen(process.env.PORT || 3000);
    if (process.env.NODE_ENV !== 'test') console.log(`Server started on port ${process.env.PORT || 3000}`);
    if (process.env.NODE_ENV === 'test') app.emit('ready');
};

startServer().catch((err) => {
    console.error(err);
    process.exit(1);
});

module.exports = app;
