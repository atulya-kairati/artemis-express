const path = require('path')
const fs = require("fs")
const { parse } = require("csv-parse")
const planets = require('./planets.mongo')


async function loadAllPlanets() {
    const promise = new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'KOI_data.csv'))

        fileStream.pipe(parse({
            comment: '#',
            columns: true
        })).on("data", async (data) => {
            if (isHabitable(data)) {
                await savePlanet(data);
            }
        })
            .on('end', async () => {
                const noOfPlanets = (await getAllPlanets()).length;
                console.log(`${noOfPlanets} habitable planets loaded!`)
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
    planet['koi_prad'] < 1.6;

async function getAllPlanets() {
    return await planets.find({}, {
        // excluding data we don't need
        _id: 0,
        __v: 0,
    });
}

async function savePlanet(planet){
    await planets.updateOne(
        { keplerName: planet.kepler_name }, 
        { keplerName: planet.kepler_name }, 
        { upsert: true } // upsert means new data will only be inserted or updated if it doesn't exist
    );
}

module.exports = { getAllPlanets, loadAllPlanets }