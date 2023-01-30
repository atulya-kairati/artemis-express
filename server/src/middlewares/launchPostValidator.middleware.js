function validateLaunch(req, res, next) {
    const launch = req.body

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({success: false, msg: "required properties not found"})
    }

    launch.launchDate = new Date(launch.launchDate)
    if(isNaN(launch.launchDate)){
        return res.status(400).json({success: false, msg: "not a valid date"})
    }

    next()
    
}

module.exports = validateLaunch