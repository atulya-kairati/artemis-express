const planetsRouter = require('express').Router()
const planetsController = require('./planets.controller')

planetsRouter.get('/planets', planetsController.getAllPlanets)

module.exports = planetsRouter