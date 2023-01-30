const launches = new Map()

const launch = {
    flightNumber: 100,
    mission: "Manus Explorer Z",
    rocket: "Pointy halal rocket",
    launchDate: new Date('April 1, 2069'),
    destination: 'Kepler-442 b',
    customer: ["colgate", "pepsi"],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)