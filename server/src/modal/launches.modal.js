const launches = new Map();

let flightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(newLaunch) {
  flightNumber++;
  launches.set(
    flightNumber,
    Object.assign(newLaunch, {
      flightNumber,
      customers: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function deleteLaunch(id) {
  const abortedLaunch = launches.get(Number(id));
  abortedLaunch.success = false;
  abortedLaunch.upcoming = false;
  return abortedLaunch;
}

function launchIsExist(id) {
  return launches.has(Number(id));
}

module.exports = { getAllLaunches, addNewLaunch, deleteLaunch, launchIsExist };
