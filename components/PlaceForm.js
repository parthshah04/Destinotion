import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EventBus } from '../utils';
import { TagCheckboxes } from '../components';

const PlaceForm = ({ isEditing, placeToEdit, authed }) => {
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [inputs, setInputs] = useState(placeToEdit);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsErrorShown(false);
    const isTag = value.substring(0, 4) === 'tag-';

    if (!isTag) {
      setInputs((prev) => ({ ...prev, [name]: value }));
    } else {
      const tagVal = value.substring(4);
      const tags = {
        type: name === 'type' ? tagVal : inputs.tags.type,
        temperature: name === 'temperature' ? tagVal : inputs.tags.temperature,
        flight: name === 'flight' ? tagVal : inputs.tags.flight,
      };
      setInputs((prev) => ({ ...prev, tags }));
    }
  };

  const closeModal = () => EventBus.emit('closePlaceModal');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });
      if (!response.ok) throw new Error('Failed to add/update place');
      closeModal();
    } catch (error) {
      console.error('📣: PlaceForm -> error', error);
      setIsErrorShown(true);
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this place?')) return;
    try {
      const response = await fetch(`/api/places?id=${inputs.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete place');
      closeModal();
    } catch (error) {
      console.error('📣: PlaceForm -> error', error);
      setIsErrorShown(true);
    }
  };

  return (
    <div
      role="dialog"
      className="modal fixed inset-0 w-full h-full z-50 overflow-y-auto" // Ensure modal is on top and scrollable
    >
      {/* Overlay */}
      <div
        className="modal-overlay absolute inset-0 bg-destinationGray opacity-50 cursor-pointer"
        onClick={closeModal}
      ></div>

      {/* Center container with some top padding to avoid immediate overlap if desired */}
      <div className="relative min-h-screen flex items-start justify-center pt-10 animate-slideUp">
        <div className="modal-inner w-full md:w-9/12 md:max-w-2xl mx-4 bg-white rounded-lg shadow-2xl overflow-y-auto">
          <form className="relative w-full py-10 px-6 md:p-10" onSubmit={onSubmit}>
            <h2 className="flex justify-between mb-10 text-destinationBlue font-display text-2xl md:text-3xl font-bold">
              {isEditing ? 'Edit place' : 'Add a new place'}
            </h2>
            <button
              type="button"
              className="flex items-center justify-center absolute top-0 right-0 mt-4 mr-4 pb-1 h-12 w-12 rounded-full text-3xl leading-none text-destinationBlue hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Name */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block mb-2 text-destinationBlue text-sm font-bold tracking-wide uppercase"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="appearance-none block w-full py-3 px-4 bg-gray-100 text-gray-800 border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-destinationBlue transition-colors duration-200"
                  type="text"
                  placeholder="Budapest"
                  value={inputs.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block mb-2 text-destinationBlue text-sm font-bold tracking-wide uppercase"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="appearance-none block w-full bg-gray-100 text-gray-800 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-destinationBlue transition-colors duration-200"
                  rows="3"
                  placeholder="We want to go here"
                  value={inputs.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Image URL */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="flex justify-between mb-2 text-destinationBlue text-sm font-bold tracking-wide uppercase"
                  htmlFor="img"
                >
                  <span>Image URL</span>
                  {inputs.img && (
                    <span className="text-destinationOrange font-medium">
                      <a href={inputs.img} target="_blank" rel="noopener noreferrer">
                        Preview
                      </a>
                    </span>
                  )}
                </label>
                <input
                  id="img"
                  name="img"
                  className="appearance-none block w-full py-3 px-4 bg-gray-100 text-gray-800 border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-destinationBlue transition-colors duration-200"
                  type="url"
                  placeholder="https://images.unsplash.com/photo-abc123"
                  value={inputs.img}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Been there & Visited Date */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block mb-2 text-destinationBlue text-sm font-bold tracking-wide uppercase"
                  htmlFor="visited"
                >
                  Been there?
                </label>
                <div className="relative">
                  <select
                    id="visited"
                    name="visited"
                    className="block appearance-none w-full bg-gray-100 border border-gray-300 text-gray-800 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-destinationBlue transition-colors duration-200"
                    value={inputs.visited}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block mb-2 text-destinationBlue text-sm font-bold tracking-wide uppercase"
                  htmlFor="visitedDate"
                >
                  Visited Date
                </label>
                <input
                  id="visitedDate"
                  name="visitedDate"
                  className="appearance-none block w-full py-3 px-4 bg-gray-100 text-gray-800 border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-destinationBlue transition-colors duration-200"
                  type="text"
                  placeholder="1/1/2020"
                  value={inputs.visitedDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <div className="block mb-2 text-destinationBlue text-sm font-bold tracking-wide uppercase">
                  Tags
                </div>
                <TagCheckboxes handleChange={handleChange} defaultCheckedItems={inputs.tags} />
              </div>
            </div>

            {isErrorShown && (
              <div className="relative px-4 py-3 bg-red-100 border border-red-400 rounded text-red-700" role="alert">
                <strong className="font-bold mr-1">Oh no!</strong>
                <span className="block sm:inline">Something bad happened!</span>
              </div>
            )}

            {authed ? (
              <div className="flex justify-between mt-10">
                {isEditing && (
                  <button
                    className="px-6 py-3 bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 focus:outline-none rounded-lg text-gray-600 font-medium tracking-wide transition-colors duration-200"
                    onClick={onDelete}
                  >
                    Delete
                  </button>
                )}
                <button
                  className="px-6 py-3 bg-destinationBlue hover:bg-destinationOrange focus:outline-none focus:bg-destinationOrange rounded-lg text-white font-medium tracking-wide transition-colors duration-200"
                  type="submit"
                >
                  {isEditing ? 'Save' : 'Add'}
                </button>
              </div>
            ) : (
              <button
                className="px-6 py-3 bg-destinationBlue hover:bg-destinationOrange focus:outline-none focus:bg-destinationOrange rounded-lg text-white font-medium tracking-wide transition-colors duration-200"
                onClick={() => EventBus.emit('login')}
              >
                Sign in to edit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

PlaceForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  placeToEdit: PropTypes.object.isRequired,
  authed: PropTypes.bool.isRequired,
};

export default PlaceForm;
