const { getAllLaunches, addNewLaunch, abortLaunch } = require("../../model/launches.model")

function httpGetAllLaunches(req, res) {
    res.status(200).json(getAllLaunches())
}

function httpPostNewLaunch(req, res){
    
    const newLaunch = addNewLaunch(req.body)
    res.status(201).json(newLaunch)
}

function httpAbortLaunch(req, res){
    const id = +req.params.id

    const abortedLaunch = abortLaunch(id)

    return res.status(200).json(abortedLaunch)
}


module.exports = {
    httpGetAllLaunches,
    httpPostNewLaunch,
    httpAbortLaunch
}