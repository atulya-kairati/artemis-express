const express = require("express")

const cors = require('cors')
const path = require('path') 
const morgan = require('morgan')

const apiV1 = require('./routesAndControllers/api.v1')

const app = express()

app.use(cors({
    origin: "http://localhost:3000" // url of the client
}))
app.use(morgan('tiny'))

app.use( express.static(path.resolve(__dirname, '..', 'public')))

app.use(express.json())
app.use('/v1', apiV1)

// Keep this at the end since it will return the frontend app for 
// all routes 
app.use('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})



module.exports = app