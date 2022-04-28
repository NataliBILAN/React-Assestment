const filename = "../data/locations.json";
let locations = require(filename);
const helper = require("../helpers/helper.js");

function getLocations() {
  return new Promise((resolve, reject) => {
    if (locations.length === 0) {
      reject({
        message: "no locations available",
        status: 202,
      });
    }
    resolve(locations);
  });
}

function getLocationById(id) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(locations, id)
      .then((location) => resolve(location))
      .catch((err) => reject(err));
  });
}

function updateLocation(id, newLocation) {
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(locations, id)
      .then((location) => {
        const index = locations.findIndex((p) => p.id == location.id);
        id = { id: location.id };
        const date = {
          createdAt: location.createdAt,
          updatedAt: helper.newDate(),
        };
        locations[index] = { ...id, ...date, ...newLocation };
        helper.writeJSONFile(filename, locations);
        resolve(locations[index]);
      })
      .catch((err) => reject(err));
  });
}

function addLocation(newLocation) {
  return new Promise((resolve, reject) => {
    const id = { id: helper.getNewId(locations) };
    const date = {
      createdAt: helper.newDate(),
      updatedAt: helper.newDate(),
    };
    newLocation = { ...id, ...date, ...newLocation };
    locations.push(newLocation);
    helper.writeJSONFile(filename, locations);
    resolve(newLocation);
  });
}

module.exports = {
  getLocations,
  getLocationById,
  updateLocation,
  addLocation,
};
