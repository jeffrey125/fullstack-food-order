import React, { useState } from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './store/CartProvider';
import OrderForm from './Components/OrderForm/OrderForm';

function App() {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <CartProvider>
      {showModal && <Cart onHideModal={hideModalHandler} />}
      <Header onShowModal={showModalHandler} />
      <main>
        <OrderForm></OrderForm>
        {/* DEV PURPOSES */}
        {/* <Meals /> */}
      </main>
    </CartProvider>
  );
}

export default App;
