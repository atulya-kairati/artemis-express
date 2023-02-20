const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.on('open', () => {
    console.log("MongoDB connected.");
});

mongoose.connection.on('error', (error) => {
    console.error(error);
});

async function connectToMongoCluster() {
    
    mongoose.set("strictQuery", false); // follows schema strictly when true
    await mongoose.connect(MONGO_URL, {});

}

async function disconnectMongo(){
    await mongoose.disconnect();
}

module.exports = {
    connectToMongoCluster,
    disconnectMongo
}