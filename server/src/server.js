const express = require('express');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000;
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const MONGO_URL = "mongodb+srv://nasa-api:<password>@cluster0.3qyyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connection.once('open',()=>{
    console.log('connection is ready')
})

// mongoose.connection.error('error',(err)=>{
//     console.error(err)
// })

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

startServer()



