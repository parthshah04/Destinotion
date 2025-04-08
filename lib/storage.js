const fs = require('fs').promises;
const path = require('path');

// Define the path to your JSON file
const dataFilePath = path.join(process.cwd(), 'data', 'places.json');

// Utility function to read the places data from the file
async function readPlaces() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If the file doesn't exist, return an empty array
      return [];
    }
    throw error;
  }
}

// Utility function to write the places data to the file
async function writePlaces(places) {
  await fs.writeFile(dataFilePath, JSON.stringify(places, null, 2));
}

// Get unvisited places
async function getUnvisitedPlaces() {
  const places = await readPlaces();
  return places.filter(place => place.visited === 'No');
}

// Get visited places
async function getVisitedPlaces() {
  const places = await readPlaces();
  return places.filter(place => place.visited === 'Yes');
}

// Add or update a place
async function addPlace(place) {
  let places = await readPlaces();
  // Use an identifier (e.g., place.id or a slug) to determine if the place exists
  const existingIndex = places.findIndex(p => p.id === place.id);
  if (existingIndex !== -1) {
    places[existingIndex] = place;
  } else {
    places.push(place);
  }
  await writePlaces(places);
}

// Delete a place by its id
async function deletePlace(id) {
  let places = await readPlaces();
  places = places.filter(place => place.id !== id);
  await writePlaces(places);
}

// Get places filtered by tag properties
async function getPlacesByTags(tagsToQuery) {
  const places = await readPlaces();
  return places.filter(place => {
    if (place.visited !== 'No') return false;
    for (let key in tagsToQuery) {
      if (tagsToQuery[key] && place.tags[key] !== tagsToQuery[key]) {
        return false;
      }
    }
    return true;
  });
}

module.exports = {
  getUnvisitedPlaces,
  getVisitedPlaces,
  addPlace,
  deletePlace,
  getPlacesByTags,
};
