const axios = require('axios');

const launchesdb = require('./launches.mongo');
const { doesPlanetExist } = require('./planets.model');

const SPACEX_API = "https://api.spacexdata.com/v4/launches/query";


async function saveLaunch(launch, fromSpaceX = false) {


    if (!fromSpaceX) {
        const planetExist = await doesPlanetExist(launch.target);

        if (!planetExist) {
            throw new Error("Target planet doesn't exist");
        }
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


async function doesLaunchExist(flightNumber) {
    return !! await launchesdb.findOne({ flightNumber });
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

    const abortedLaunchResult = await launchesdb.updateOne({ flightNumber }, {
        upcoming: false,
        success: false,
    });

    return abortedLaunchResult.acknowledged && abortedLaunchResult.modifiedCount === 1;
}

async function getLatestFlightNumber() {

    // Sort in descending order then find the top flight num
    const launchFlight = await launchesdb.findOne().sort('-flightNumber') // '-' signifies descending order

    // if there was no filghtNumber meaning there are no launches scheduled yet
    if (!launchFlight) {
        return 68; // first flightNumber
    }

    return launchFlight.flightNumber;
}

async function getSpacexData() {
    const response = await axios.post(SPACEX_API, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1,
                    }
                },
                {
                    path: "payloads",
                    select: {
                        customers: 1,
                    }
                }
            ]
        }
    });

    if(response.status !== 200){
        console.log("SpaceX data not loaded...");
        throw new Error("Wasn't able to fetch data from SpaceX Api");
    }

    return response.data.docs;
}

function parseSpaceXLaunch(spacexLaunch) {
    const customers = spacexLaunch.payloads.flatMap((e) => e.customers);
    return {
        flightNumber: spacexLaunch.flight_number,
        mission: spacexLaunch.name,
        rocket: spacexLaunch.rocket.name,
        launchDate: new Date(spacexLaunch.date_local),
        target: 'Not applicable',
        customers: customers,
        upcoming: spacexLaunch.upcoming,
        success: spacexLaunch.success,
    };
}

async function loadSpaceXData() {
    console.log("Loading SpaceX data...");

    const spacexData = await getSpacexData()

    for (const spacexLaunch of spacexData) {

        const launch = parseSpaceXLaunch(spacexLaunch)

        saveLaunch(launch, fromSpaceX=true);
    }
}


module.exports = {
    doesLaunchExist,
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    loadSpaceXData
}