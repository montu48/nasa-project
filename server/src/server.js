const express = require('express');

const PORT = process.env.PORT || 5000;
const app = require('./app');
const { mongoConnect } = require('./services/mongo')

const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchesData();

    app.listen(PORT, () => {
      
        console.log(`Listening on port ${PORT}`)
    })
}

startServer()



