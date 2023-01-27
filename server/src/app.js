const express = require("express");
const cors = require('cors');
const planetsRouter = require('./routesAndControllers/planets/planets.router')


const app = express()

app.use(cors({
    origin: "http://localhost:3000" // url of the client
}))

app.use(express.json())
app.use(planetsRouter)

module.exports = app