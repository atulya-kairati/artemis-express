const launchesdb = require('./launches.mongo');
const { doesPlanetExist } = require('./planets.model');

const launches = new Map()


const launch = {
    flightNumber: 100,
    mission: "Manus Explorer Z",
    rocket: "Pointy halal rocket",
    launchDate: new Date('April 1, 2069'),
    target: 'Kepler-442 b',
    customers: ["colgate", "pepsi"],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)

async function saveLaunch(launch) {

    const planetExist = await doesPlanetExist(launch.target);

    if  (! planetExist) { 
        throw new Error("Target planet doesn't exist");
    }

    await launchesdb.findOneAndUpdate(
        {
            flightNumber: launch.flightNumber,
        },
        launch,
        {
            upsert: true,
        }
    )
}

saveLaunch(launch);

async function doesLaunchExist(flightNumber) {
    return !! await launchesdb.findOne({flightNumber});
}

async function getAllLaunches() {
    return await launchesdb.find({}, { _id: 0, __v: 0 });
}

async function addNewLaunch(launch) {

    launch.launchDate = new Date(launch.launchDate)

    await saveLaunch(
        Object.assign(launch, {
            flightNumber: await getLatestFlightNumber() + 1,
            customers: ["colgate", "pepsi"],
            upcoming: true,
            success: true,
        })
    );

    return launch
}

async function abortLaunch(flightNumber) {

    const abortedLaunchResult = await launchesdb.updateOne({flightNumber}, {
        upcoming: false,
        success: false,
    });

    return abortedLaunchResult.acknowledged && abortedLaunchResult.modifiedCount === 1;
}

async function getLatestFlightNumber(){

    // Sort in descending order then find the top flight num
    const launchFlight = await launchesdb.findOne().sort('-flightNumber') // '-' signifies descending order

    // if there was no filghtNumber meaning there are no lauches scheduled yet
    if(! launchFlight) {
        return 69; // first flightNumber
    }

    return launchFlight.flightNumber;
}



module.exports = {
    doesLaunchExist,
    getAllLaunches,
    addNewLaunch,
    abortLaunch
}