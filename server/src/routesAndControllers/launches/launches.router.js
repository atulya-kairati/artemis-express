const launchesRouter = require('express').Router()
const launchExists = require('../../middlewares/launchExists.middleware')
const validateLaunch = require('../../middlewares/launchPostValidator.middleware')
const { httpGetAllLaunches, httpPostNewLaunch, httpAbortLaunch } = require('./launches.controller')

launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.post('/',validateLaunch, httpPostNewLaunch)
launchesRouter.delete('/:id', launchExists, httpAbortLaunch)

module.exports = launchesRouter