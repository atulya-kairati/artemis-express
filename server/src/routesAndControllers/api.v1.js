const express = require('express');

const apiV1 = express.Router()

const planetsRouter = require('./planets/planets.router')
const launchesRouter = require('./launches/launches.router')

apiV1.use('/planets', planetsRouter);
apiV1.use('/launches', launchesRouter);

module.exports = apiV1;