const axios = require('axios');
const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongoose');

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

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';
saveLaunch(launch);

const populateLaunches = async()=>{
  const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination:false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    });

    const launchData = response.data.docs;
    for (const launchDoc of launchData) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload)=>{
            return payload['customers'];
        })

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }

        console.log(launch)
    }
}

const loadLaunchesData = async () => {
  const firstLauch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission:'FalconSat',
  });
  if(firstLauch){
    console.log('Launch Data already exist');
  }else{
    await populateLaunches()
  }
    

}

const findLaunch = async(filter)=>{
  return await launchesDatabase.findOne(filter);
}

const existLaunchWithId = async (launchId) => {
    return await findLaunch({
      flightNumber: launchId,
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
    scheduleNewLaunch,
    loadLaunchesData,
}