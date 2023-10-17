const {
  getAllLaunches,
  addNewLaunch,
  deleteLaunch,
  launchIsExist,
} = require("../../modal/launches.modal");

function httpGetAllLaunches(req, res) {
  res.json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({ error: "all fields are required" });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "invalid Date" });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpDeleteLaunch(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "id is mandatory" });
  }

  if (!launchIsExist(id)) {
    return res.status(404).json({ error: "launch is not found" });
  }

  const updatedLaunch = deleteLaunch(id);
  res.status(200).json(updatedLaunch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunch,
};
