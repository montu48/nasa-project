const {getAllLaunches, addNewLaunch} = require('../../models/launches.model');

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

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch
}
