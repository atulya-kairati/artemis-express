const express = require("express")
const cors = require('cors')
const planetsRouter = require('./routesAndControllers/planets/planets.router')
const path = require('path') 
const morgan = require('morgan')


const app = express()

app.use(cors({
    origin: "http://localhost:3000" // url of the client
}))
app.use(morgan('tiny'))

app.use( express.static(path.resolve(__dirname, '..', 'public')))
console.log(__dirname);
console.log(path.resolve(__dirname, '..', 'public'));

app.use(express.json())
app.use(planetsRouter)
app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})



module.exports = app