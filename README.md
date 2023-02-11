### Practice nodejs backend for a react frontend

was created on windows. And would hove to change few things in the (package.json)s' script. 

![Architecture](./arch.jpg)

#### Connecting to MongoDB Atlas

##### Create a DB on Atlas
- Create a account and chose the free tier.
- Create a DB.
- In, Security -> DB access -> Add a new DB user and create a user name and pswd.
- In, Security -> Network Access -> Add ip address. Either enter you ip or click on current ip or allow all.
- In, Database -> click on Connect.
- Select "Connect your App." since we are using Node.js.
- Choose node version.
- Use the provided URL.

##### Connect to DB from Node
- Install Mongoose `npm install mongoose`.
- Import mongoose.
- And connect.

```js
const MONGO_URL = "mongodb+srv://DB_USER_NAME:PASSWORD@artemis-db.l7qnj9a.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true, // set how the MONGO_URL will be parsed
    useFindAndmodify: false, // For disabling the outdated way of updating mongo data 
    userCreateIndex: true, // Will use newer way to create index ?
    useUnifiedTopology: true // So mongoose use updated way to communicate with clusters
});

// For mongo >= 6.0 those params are set by default and we don't need to set them

mongoose.set("strictQuery", false); // follows schema strictly when true (set this for mongo >= v7)
mongoose.connect(MONGO_URL, {});
```
- Listen for connection.
```js
mongoose.connection.once('open', () => {
    console.log("MongoDB connected.");
});
```
- Listen for errors.
```js
mongoose.connection.on('error', (error) => {
    console.error(error);
});
```

#### Creating Schema

```js 
const launchSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        min: 69,
        max: 420,
    },
    mission: {
        type: String,
        required: true
    },
    ...
    ...
});
```

##### Creating model from schema
```js
// connects launchSchema with "launches" collection
const launchesModel = mongoose.model('Launch', launchSchema); // The name given is lowercased then pluralized by mongo
```