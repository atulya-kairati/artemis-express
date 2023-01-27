const path = require('path')
const fs = require("fs")
const { parse } = require("csv-parse")


const habitablePlanets = []



async function loadAllPlanets() {
    const promise = new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'KOI_data.csv'))

        fileStream.pipe(parse({
            comment: '#',
            columns: true
        }))


        fileStream.on("data", (data) => {
            if (isHabitable(data)) {
                habitablePlanets.push(data)
            }
        })
            .on('end', () => {
                console.log(`${habitablePlanets.length} habitable planets loaded!`)
                resolve()
            })
            .on('error', (err) => {
                console.log(err)
                reject()
            })
    })

    return promise
}




const isHabitable = (planet) =>
    planet['koi_disposition'] === "CONFIRMED" &&
    planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6


module.exports = { planets: habitablePlanets, loadAllPlanets }