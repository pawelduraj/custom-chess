require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const {connect} = require('./utils/redis');

const app = express();
app.use(cors());
app.use(express.static('../client/dist'));
app.use(express.json());
app.use('/api', routes);
app.use((req, res) => {
    res.sendFile(require('path').join(__dirname, '../client/dist/index.html'))
});

const startServer = async () => {
    await connect();
    console.log('Connected to Redis');
    await app.listen(process.env.PORT || 3000);
    console.log(`Server started on port ${process.env.PORT || 3000}`);
};

startServer().catch((err) => {
    console.error(err);
    process.exit(1);
});
