const launches = new Map();

const launch = {
    flightNumber : 100,
    mission : 'Keepler Exploration X',
    rocket : 'Exploration IS1',
    launchDate : new Date('March 28, 2022'),
    target : 'Kepler-442 b',
    customer : ['ZTM','NASA'],
    upcoming : true,
    success: true,
}

launches.set(launch.flightNumber, launch);
module.exports = {
    launches,
}