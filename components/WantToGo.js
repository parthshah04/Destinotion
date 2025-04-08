import React, { useState, useEffect } from 'react';
import { PlaceCard } from '../components';

const WantToGo = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/places?visited=No');
        const data = await response.json();
        setPlaces(data.places);
      } catch (error) {
        console.error('📣: fetchData -> error', error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="pt-20 pb-12 animate-fadeIn"> 
      {/* pt-20 ensures content is below the nav */}
      <h2 className="mb-8 text-center text-destinationBlue font-display text-3xl md:text-4xl font-bold">
        Places we want to go
      </h2>

      {places.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
          {places.map((place, index) => (
            <div key={index} className="transition-transform transform hover:scale-105">
              <PlaceCard place={place} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center p-4 text-lg text-gray-600">
          Add some places you want to go!
        </p>
      )}
    </section>
  );
};

export default WantToGo;
