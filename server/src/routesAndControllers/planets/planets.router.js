const planetsRouter = require('express').Router()
const {httpGetAllPlanets} = require('./planets.controller')

planetsRouter.get('/planets', httpGetAllPlanets)

module.exports = planetsRouter