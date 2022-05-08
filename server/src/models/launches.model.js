const launches = new Map();

let latestFlightNumber = 100;

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

const getAllLaunches = ()=>{
    return Array.from(launches.values());
}

const addNewLaunch = (launch) => {
    latestFlightNumber++;
    launches.set(latestFlightNumber,Object.assign(launch,{
        success:true,
        upcoming:true,
        customers: ['Zero to Mastery','Nasa'],
        flightNumber:latestFlightNumber
    }))
}

module.exports = {
    launches,
    getAllLaunches,
    addNewLaunch
}