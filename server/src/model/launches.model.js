const launches = new Map()

let newflightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: "Manus Explorer Z",
    rocket: "Pointy halal rocket",
    launchDate: new Date('April 1, 2069'),
    target: 'Kepler-442 b',
    customer: ["colgate", "pepsi"],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    newflightNumber++;

    launch.launchDate = new Date(launch.launchDate)
    launches.set(
        newflightNumber,
        Object.assign(launch, {
            flightNumber: newflightNumber,
            customer: ["colgate", "pepsi"],
            upcoming: true,
            success: true,
        })
    )
    console.log(launches);
}

module.exports = { getAllLaunches, addNewLaunch }