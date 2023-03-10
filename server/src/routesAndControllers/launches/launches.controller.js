const { getAllLaunches, addNewLaunch, abortLaunch } = require("../../model/launches.model")
const { getPagination } = require("../../services/pagination")

async function httpGetAllLaunches(req, res) {
    const {skip, limit} = getPagination(req.query);
    res.status(200).json(await getAllLaunches(skip, limit));
}

async function httpPostNewLaunch(req, res) {

    try {
        const newLaunch = await addNewLaunch(req.body)
        res.status(201).json(newLaunch)
    } catch (error) {
        res.status(400).json({success: false, msg: error.message});
    }

}

async function httpAbortLaunch(req, res) {
    const id = +req.params.id

    const wasAborted = await abortLaunch(id)

    if(wasAborted){
        return res.status(200).json({success: true, msg: "launch was aborted"});
    }

    return res.status(400).json({success: false, msg: "launch was not aborted"});
}


module.exports = {
    httpGetAllLaunches,
    httpPostNewLaunch,
    httpAbortLaunch
}