const http = require('http');
const app = require('./app');

const { loadAllPlanets } = require('./model/planets.model')

const { connectToMongoCluster } = require('./services/mongo.connect');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);


async function startServer() {

    connectToMongoCluster();
    await loadAllPlanets()
    // loading data before starting the server 

    server.listen(PORT, () => {
        console.log(`Listening at ${PORT}...`);
    });
}

startServer()

