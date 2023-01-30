const { doesLaunchExist } = require("../model/launches.model");

function launchExists(req, res, next) {

    const id = +req.params.id
    console.log(id);
    if (! doesLaunchExist(id)) {
        return res.status(400).json({success: false, msg: "id not found"})
    }
    next()
}

module.exports = launchExists