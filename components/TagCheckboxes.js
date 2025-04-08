import React from 'react';
import PropTypes from 'prop-types';
import { defaultTags } from '../utils/constants';

const TagCheckboxes = ({ handleChange, defaultCheckedItems }) => {
  const categories = Object.keys(defaultTags);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
      {categories.map((category) => {
        const options = Object.keys(defaultTags[category]);
        return (
          <div key={category} className="flex flex-col">
            <div className="mb-2 text-destinationBlue text-sm font-bold tracking-wide uppercase">
              {category}
            </div>
            <div className="space-y-2">
              {options.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center text-gray-700 transition-colors duration-200 hover:text-destinationOrange"
                >
                  <input
                    type="radio"
                    name={category}
                    onChange={handleChange}
                    value={`tag-${tag}`}
                    defaultChecked={
                      defaultCheckedItems ? defaultCheckedItems[category] === tag : false
                    }
                    className="mr-2"
                  />
                  <span className="capitalize">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

TagCheckboxes.propTypes = {
  handleChange: PropTypes.func.isRequired,
  defaultCheckedItems: PropTypes.object,
};

export default TagCheckboxes;
