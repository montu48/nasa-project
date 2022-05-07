const express = require('express');
const PORT = process.env.PORT || 5000;
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');


async function startServer() {
    await loadPlanetsData();

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}

startServer()



