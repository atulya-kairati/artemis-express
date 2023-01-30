const { getAllPlanets } = require('../../model/planets.model')

const httpGetAllPlanets = (req, res) => {
    return res.status(200).json(getAllPlanets())
}

module.exports = { httpGetAllPlanets };