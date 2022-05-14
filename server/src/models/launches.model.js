const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongoose');

const launches = new Map();
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'Keepler Exploration X',
    rocket: 'Exploration IS1',
    launchDate: new Date('March 28, 2022'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

const saveLaunch = async (launch) => {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });
    if (!planet) {
        throw new Error('No matching planet found');
    }
    await launchesDatabase.findOneAndUpdate(
        {
            flightNumber: launch.flightNumber,
        },
        launch,
        {
            upsert: true,
        }
    );
};

saveLaunch(launch);

const existLaunchWithId = async (launchId) => {
    return await launchesDatabase.findOne({
        flightNumber: launchId
    })
}

const getLatestFlightNumber = async () => {
    const latestLaunch = await launchesDatabase.
        findOne().
        sort('-flightNumber')

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
    }

    return latestLaunch.flightNumber;
}

const getAllLaunches = async () => {
    return await launchesDatabase.find({}, {
        '_id': 0, '__v': 0
    })
}

const scheduleNewLaunch = async () => {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'Nasa'],
        flightNumber: newFlightNumber
    })

    await saveLaunch(newLaunch)
}

const abortLaunchById = async (launchId) => {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false,
    })

    return aborted.modifiedCount === 1;

}

module.exports = {
    getAllLaunches,
    existLaunchWithId,
    abortLaunchById,
    scheduleNewLaunch
}