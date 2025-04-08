import React, { useState } from 'react';
import { EventBus, defaultPlace, logout } from '../utils';
import { Head, Nav, AuthForm, PlaceForm, PlacePicker, WantToGo, BeenThere } from '../components';

const Home = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // We no longer use Firebase authentication so we assume the user is always authenticated.
  const [authed] = useState(true);
  // Removed auth modal state since auth isn’t implemented now.
  const [placeToEdit, setPlaceToEdit] = useState(defaultPlace);

  const openModal = (place = defaultPlace) => {
    document.body.classList.add('freeze');
    setPlaceToEdit(place);
    setIsModalShown(true);
  };

  const closeModal = () => {
    document.body.classList.remove('freeze');
    setIsModalShown(false);
  };

  // Register event listeners via the EventBus.
  EventBus.on('addPlace', () => {
    // Since auth is assumed true, just open the modal.
    setIsEditing(false);
    openModal();
  });

  EventBus.on('editPlace', place => {
    setIsEditing(true);
    openModal(place);
  });

  // Removed the 'login' and 'closeAuthModal' events because we no longer handle authentication.
  EventBus.on('closePlaceModal', () => closeModal());
  EventBus.on('logout', async () => await logout());

  return (
    <div>
      <Head title="Time to Have More Fun" />

      <Nav authed={authed} />

      <div className="container mx-auto px-4 pt-20">
        {/* Removed AuthForm as authentication isn’t implemented */}
        {isModalShown && (
          <PlaceForm isEditing={isEditing} placeToEdit={placeToEdit} authed={authed} />
        )}

        <PlacePicker />

        <WantToGo />

        <BeenThere />
      </div>
    </div>
  );
};

export default Home;
