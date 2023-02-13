const planetsRouter = require('express').Router()
const {httpGetAllPlanets} = require('./planets.controller')

planetsRouter.get('/', httpGetAllPlanets)

module.exports = planetsRouter