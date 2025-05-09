import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ tag, isFlight }) => (
  <span className="flex items-center mr-2 mb-2 px-3 py-1 bg-destinationGray rounded-full text-sm text-destinationBlue font-medium capitalize hover:scale-105 transition-transform duration-200">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className="inline-block w-4 mr-1 fill-current"
    >
      <path
        className="heroicon-ui"
        d="M2.59 13.41A1.98 1.98 0 0 1 2 12V7a5 5 0 0 1 5-5h4.99c.53 0 1.04.2 1.42.59l8 8a2 2 0 0 1 0 2.82l-8 8a2 2 0 0 1-2.82 0l-8-8zM20 12l-8-8H7a3 3 0 0 0-3 3v5l8 8 8-8zM7 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
      />
    </svg>
    <span>
      {tag}
      {isFlight && ' Flight'}
    </span>
  </span>
);

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  isFlight: PropTypes.bool,
};

export default Tag;
