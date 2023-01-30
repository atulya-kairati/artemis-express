const launchesRouter = require('express').Router()
const validateLaunch = require('../../middlewares/launchPostValidator.middleware')
const { httpGetAllLaunches, httpPostNewLaunch } = require('./launches.controller')

launchesRouter.get('/launches', httpGetAllLaunches)
launchesRouter.post('/launches',validateLaunch, httpPostNewLaunch)

module.exports = launchesRouter