import React, { useState } from 'react';
import { EventBus, login } from '../utils';

const AuthForm = () => {
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsErrorShown(false);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => EventBus.emit('closeAuthModal');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs); // Simulated login
      closeModal();
    } catch (error) {
      console.error('📣: AuthForm -> error', error);
      setIsErrorShown(true);
    }
  };

  return (
    <div role="dialog" className="modal fixed top-0 left-0 right-0 bottom-0 w-full h-full z-50">
      {/* Semi-transparent overlay */}
      <div
        className="modal-overlay absolute top-0 left-0 w-full h-full bg-destinationGray opacity-50 cursor-pointer"
        onClick={closeModal}
      ></div>

      {/* Modal container with slideUp animation */}
      <div className="relative w-full max-w-md h-screen max-h-screen mx-auto flex items-center justify-center">
        <div className="modal-inner w-full md:w-9/12 md:max-w-2xl m-6 bg-white rounded-lg shadow-2xl overflow-y-auto animate-slideUp">
          <form className="relative bg-white rounded p-8" onSubmit={onSubmit}>
            <button
              type="button"
              className="flex items-center justify-center absolute top-0 right-0 h-12 w-12 rounded-full text-3xl leading-none text-destinationBlue hover:opacity-75 focus:outline-none"
              onClick={closeModal}
            >
              &times;
            </button>

            <div className="mb-4">
              <label
                className="block text-destinationBlue text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-destinationBlue text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="******************"
                onChange={handleChange}
              />
            </div>

            {isErrorShown && (
              <p className="text-red-500 text-xs italic">
                Something went wrong!
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                className="inline-flex items-center px-6 py-2 rounded shadow bg-destinationBlue hover:bg-destinationOrange hover:shadow-xl focus:outline-none focus:bg-destinationOrange text-white font-medium tracking-wide transition-colors duration-200"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
