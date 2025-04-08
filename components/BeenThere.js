import React, { useState, useEffect } from 'react';
import { PlaceCard } from '../components';

const BeenThere = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/places?visited=Yes');
        const data = await response.json();
        setPlaces(data.places);
      } catch (error) {
        console.error('📣: fetchData -> error', error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="py-12 animate-fadeIn">
      <h2 className="mb-8 text-center text-destinationBlue font-display text-3xl md:text-4xl font-bold">
        Places we've been
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {places.length > 0 ? (
          places.map((place, i) => (
            <div key={i} className="transition-transform transform hover:scale-105">
              <PlaceCard place={place} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center p-3 text-lg text-gray-700">
            Haven't been anywhere yet...
          </p>
        )}
      </div>
    </section>
  );
};

export default BeenThere;
