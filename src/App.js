import React, { useState } from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';

function App() {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal ? <Cart onHideModal={hideModalHandler} /> : ''}
      <Header onShowModal={showModalHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
