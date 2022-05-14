import React, { useState, useCallback, useEffect } from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './store/CartProvider';
import OrderForm from './Components/OrderForm/OrderForm';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [errorAddress, setErrorAddress] = useState(null);
  const [availableAddress, setAvailableAddress] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [fetchHasError, setFetchHasError] = useState(false);
  const FIREBASE_API = `https://react-http-f5133-default-rtdb.asia-southeast1.firebasedatabase.app`;

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  // Fetches available address that can be delivered by the store in Firebase backend
  const availableAddressDelivery = useCallback(async () => {
    try {
      setFetchHasError(false);
      setErrorAddress(null);
      setAddressLoading(true);
      const response = await fetch(`${FIREBASE_API}/address.json`);

      if (!response.ok) {
        setFetchHasError(true);
        throw new Error(`Something went wrong Error Code: ${response.status}`);
      }

      const data = await response.json();

      let addressObj = [];

      // Desturctures data
      for (const provKey in data.province) {
        addressObj.push({ province: provKey, ...data.province[provKey] });
      }

      // Cleans Data for Props Form
      const cleanedAddData = addressObj.map(prov => {
        let cities = [];

        for (const cityKey in prov.city) {
          let barangay = Object.values(...Object.values(prov.city[cityKey]));
          cities.push({ city: cityKey, barangay });
        }

        return { province: prov.province, cities };
      });

      setAvailableAddress(cleanedAddData);
      setAddressLoading(false);
    } catch (err) {
      setErrorAddress(err.message);
    }
    setAddressLoading(false);
  }, [FIREBASE_API]);

  useEffect(() => {
    availableAddressDelivery();
  }, [availableAddressDelivery]);

  return (
    <CartProvider>
      {showModal && <Cart onHideModal={hideModalHandler} />}
      <Header onShowModal={showModalHandler} />
      <main>
        <OrderForm
          address={availableAddress}
          isLoading={addressLoading}
          errMsg={errorAddress}
          fetchHasError={fetchHasError}
        />
        {/* DEV PURPOSES */}
        {/* <Meals /> */}
      </main>
    </CartProvider>
  );
}

export default App;
