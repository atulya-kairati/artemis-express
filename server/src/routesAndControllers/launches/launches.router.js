const launchesRouter = require('express').Router()
const launchExists = require('../../middlewares/launchExists.middleware')
const validateLaunch = require('../../middlewares/launchPostValidator.middleware')
const { httpGetAllLaunches, httpPostNewLaunch, httpAbortLaunch } = require('./launches.controller')

launchesRouter.get('/launches', httpGetAllLaunches)
launchesRouter.post('/launches',validateLaunch, httpPostNewLaunch)
launchesRouter.delete('/launches/:id', launchExists, httpAbortLaunch)

module.exports = launchesRouter