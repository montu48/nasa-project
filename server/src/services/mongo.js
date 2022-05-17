require('dotenv').config()
const mongoose = require('mongoose');


const MONGO_URL = `mongodb+srv://nasa-api:${process.env.MONGO_CREDENTIALS}@cluster0.3qyyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


mongoose.connection.once('open', () => {
    console.log('connection is ready')
})

const mongoConnect = async () => {
    await mongoose.connect(MONGO_URL);
}

const mongoDisconnect = async () => {
    await mongoose.disconnect(MONGO_URL);
}

module.exports = {
    mongoConnect,
    mongoDisconnect
};