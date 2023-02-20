const http = require('http');

require('dotenv').config() // called before all other local imports so the process.env is populated fo them too

const app = require('./app');

const { loadAllPlanets } = require('./model/planets.model')
const { loadSpaceXData } = require('./model/launches.model')

const { connectToMongoCluster } = require('./services/mongo.connect');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);


async function startServer() {

    connectToMongoCluster();
    await loadAllPlanets()
    await loadSpaceXData();
    // loading data before starting the server 

    server.listen(PORT, () => {
        console.log(`Listening at ${PORT}...`);
    });
}

startServer()

