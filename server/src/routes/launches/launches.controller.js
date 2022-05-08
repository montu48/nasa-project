const {getAllLaunches, addNewLaunch,existLaunchWithId, abortLaunchById} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res){
    let launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        res.status(400).json({
            error:"Missing Required Property"
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        res.status(400).json({
            error:"Invalid Launch Date"
        })
    }

    addNewLaunch(launch);
    return res.status(201).json(launch)
}

function httpAbortLaunch(req,res) {
    const launchId = +req.params.id;

    if (!existLaunchWithId(launchId)) {
        return res.status(404).json({
            error: 'Launch Not Found'
        })
    }
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
    
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}
