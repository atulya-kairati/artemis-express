const mongoose = require('mongoose');

const MONGO_URL = "mongodb+srv://DB_USER_NAME:PASSWORD@artemis-db.l7qnj9a.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.on('open', () => {
    console.log("MongoDB connected.");
});

mongoose.connection.on('error', (error) => {
    console.error(error);
});

function connectToMongoCluster() {
    
    mongoose.set("strictQuery", false); // follows schema strictly when true
    mongoose.connect(MONGO_URL, {});

}

module.exports = {
    connectToMongoCluster,
}