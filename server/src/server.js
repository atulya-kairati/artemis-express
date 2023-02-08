const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const { loadAllPlanets } = require('./model/planets.model')

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const MONGO_URL = "mongodb+srv://DB_USER_NAME:PASSWORD@artemis-db.l7qnj9a.mongodb.net/?retryWrites=true&w=majority";

async function startServer() {

    mongoose.set("strictQuery", false); // follows schema strictly when true
    mongoose.connect(MONGO_URL, {});

    await loadAllPlanets()
    // loading data before starting the server 

    server.listen(PORT, () => {
        console.log(`Listening at ${PORT}...`);
    });
}

startServer()

mongoose.connection.on('open', () => {
    console.log("MongoDB connected.");
});

mongoose.connection.on('error', (error) => {
    console.error(error);
});
