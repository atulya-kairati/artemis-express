// Load planets and return as JSON.
const URL = "http://localhost:8000"

async function httpGetPlanets() {
  const res = await fetch(`${URL}/planets`)
  return await res.json()
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const res = await fetch(`${URL}/launches`)
  const fetchedLauches = await res.json()

  return fetchedLauches.sort((a, b) => {
    return a.flightNumber - b.flightNumber
  })
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};