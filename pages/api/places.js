// pages/api/places.js
import { 
    getUnvisitedPlaces, 
    getVisitedPlaces, 
    addPlace, 
    deletePlace, 
    getPlacesByTags 
  } from '../../lib/storage';
  
  export default async function handler(req, res) {
    if (req.method === 'GET') {
      const { visited } = req.query;
      let places;
      if (visited === 'Yes') {
        places = await getVisitedPlaces();
      } else if (visited === 'No') {
        places = await getUnvisitedPlaces();
      } else {
        places = await getUnvisitedPlaces(); // default or modify as needed
      }
      res.status(200).json({ places });
    } else if (req.method === 'POST') {
      // Expecting JSON body with place data
      const place = req.body;
      await addPlace(place);
      res.status(201).json({ message: 'Place added/updated successfully' });
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await deletePlace(id);
      res.status(200).json({ message: 'Place deleted successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  