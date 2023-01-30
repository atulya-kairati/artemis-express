const { getAllLaunches, addNewLaunch } = require("../../model/launches.model")

function httpGetAllLaunches(req, res) {
    res.status(200).json(getAllLaunches())
}

function httpPostNewLaunch(req, res){
    
    addNewLaunch(req.body)
    res.status(200).json({success: true})
}


module.exports = {
    httpGetAllLaunches,
    httpPostNewLaunch
}