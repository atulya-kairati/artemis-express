const { doesLaunchExist } = require("../model/launches.model");

async function launchExists(req, res, next) {

    const id = +req.params.id
    console.log(id);
    if (await doesLaunchExist(id)) next(); 
    else {
        return res.status(400).json({success: false, msg: "id not found"})
    }
}

module.exports = launchExists