import React, { useState } from 'react';
import { defaultTagField } from '../utils/constants';
import { TagCheckboxes, PlaceCard } from '../components';

const filterPlacesByTags = (places, tagsToQuery) => {
  return places.filter(place => {
    if (place.visited !== 'No') return false;
    for (const key in tagsToQuery) {
      if (tagsToQuery[key] && place.tags && place.tags[key] !== tagsToQuery[key]) {
        return false;
      }
    }
    return true;
  });
};

const PlacePicker = () => {
  const [tagsToQuery, setTagsToQuery] = useState(defaultTagField);
  const [showError, setShowError] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const [destination, setDestination] = useState(null);
  const [destinationLoading, setDestinationLoading] = useState(false);

  const handleChange = (e) => {
    setShowError(false);
    setShowClearButton(true);
    setTagsToQuery(prevTags => {
      const { name, value } = e.target;
      return { ...prevTags, [name]: value.substring(4) };
    });
  };

  const queryPlaces = async () => {
    try {
      setShowError(false);
      setDestinationLoading(true);
      setDestination(null);
      const response = await fetch('/api/places?visited=No');
      const data = await response.json();
      let places = data.places;
      places = filterPlacesByTags(places, tagsToQuery);
      if (!places.length) {
        console.warn('No places returned!');
        setTimeout(() => {
          setShowError(true);
          setDestinationLoading(false);
          setDestination(null);
        }, 1000);
        return;
      }
      const placeToGo = places[Math.floor(Math.random() * places.length)];
      setTimeout(() => {
        setDestinationLoading(false);
        setDestination(placeToGo);
      }, 4500);
    } catch (error) {
      console.error(error);
    }
  };

  const clearFilters = () => {
    const filters = document.querySelectorAll('input[type="radio"]');
    filters.forEach(filter => (filter.checked = false));
    setTagsToQuery(defaultTagField);
  };

  return (
    <section className="py-12 md:flex md:justify-between animate-fadeIn">
      <div className="lg:w-1/2">
        <h2 className="mb-5 text-4xl text-destinationBlue font-display font-bold">
          This year we're going to...
        </h2>
        <div className="w-full py-4">
          <TagCheckboxes handleChange={handleChange} />
        </div>
        <div className="flex justify-center md:justify-start mt-10">
          <button
            className="inline-flex items-center px-6 py-3 rounded-lg shadow bg-destinationBlue hover:bg-destinationOrange transition-colors duration-200 focus:outline-none text-white font-medium tracking-wide"
            onClick={queryPlaces}
          >
            Tell me already!!!
          </button>
          {showClearButton && (
            <button
              className="ml-6 text-destinationBlue hover:text-destinationOrange transition-colors duration-200 focus:outline-none"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
      <div className="lg:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
        {destination ? (
          <PlaceCard place={destination} />
        ) : showError ? (
          <div className="flex justify-center items-center h-full rounded-lg bg-gray-50 text-gray-700 p-4">
            <p>Sorry, nothing matched those tags!</p>
          </div>
        ) : destinationLoading ? (
          <img src="/plane.gif" alt="Plane taking off" className="rounded-lg" />
        ) : (
          <img src="/plane.png" alt="Plane" className="rounded-lg" />
        )}
      </div>
    </section>
  );
};

export default PlacePicker;
