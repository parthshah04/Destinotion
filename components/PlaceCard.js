import React from 'react';
import PropTypes from 'prop-types';
import { EventBus } from '../utils';
import { Tag } from '../components';

const PlaceCard = ({ place }) => {
  const editPlace = () => {
    EventBus.emit('editPlace', place);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      editPlace();
    }
  };

  return (
    <div
      className="flex flex-col justify-between w-full h-full rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105 cursor-pointer"
      onClick={editPlace}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
      <div>
        {place.img && (
          <div className="w-full bg-gray-200">
            <img
              className="w-full h-48 object-cover"
              src={place.img}
              alt={place.name}
            />
          </div>
        )}
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-2 text-xl font-bold text-destinationBlue">
            {place.name}
          </div>
          {place.description && (
            <p className="text-gray-600 text-base">{place.description}</p>
          )}
          {place.visited === 'Yes' && place.visitedDate && (
            <p className="text-gray-500 text-xs uppercase tracking-wide font-bold">
              {place.visitedDate}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center px-6 py-4 bg-gray-50">
        {place.tags &&
          Object.keys(place.tags).map((category, i) =>
            place.tags[category] ? (
              <Tag tag={place.tags[category]} key={i} isFlight={category === 'flight'} />
            ) : null
          )}
      </div>
    </div>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
};

export default PlaceCard;
