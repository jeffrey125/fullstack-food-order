import React, { useState, useCallback, useEffect } from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './store/CartProvider';
import OrderForm from './Components/OrderForm/OrderForm';
import OrderFormSuccess from './Components/OrderForm/OrderFormSucces';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderFormIsSending, setOrderFormIsSending] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderFormError, setOrderFormError] = useState(null);
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

  const hideOrderFormHandler = () => {
    setShowForm(false);
  };

  const showOrderFormHandler = () => {
    setShowForm(true);
  };

  const hideSuccessModalHandler = () => {
    setShowSuccessModal(false);
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

  // Sends Food Data in Backend Server
  const sendFoodDataHandler = async (foodData, orderId) => {
    try {
      // Data is sending (Loader)
      setOrderId('');
      setOrderFormIsSending(true);
      // Order Submitted!
      setShowSuccessModal(true);

      const response = await fetch(
        `https://react-http-f5133-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${orderId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(foodData),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      // Error Handling and Success UI
      if (!response.ok) {
        throw new Error(`Something went wrong Error Code: ${response.status}`);
      }

      // Order Id to be sent in modal
      setOrderId(orderId);
    } catch (err) {
      setOrderFormError(err.message);
      setShowSuccessModal(true);
    }
    setOrderFormIsSending(false);
  };

  const mainContent = showForm ? (
    <OrderForm
      address={availableAddress}
      isLoading={addressLoading}
      errMsg={errorAddress}
      fetchHasError={fetchHasError}
      onHideForm={hideOrderFormHandler}
      onSendFoodOrderData={sendFoodDataHandler}
    />
  ) : (
    <Meals />
  );

  // TODO Make a Order tracker
  return (
    <CartProvider>
      {showModal && (
        <Cart
          onHideModal={hideModalHandler}
          onShowForm={showOrderFormHandler}
        />
      )}
      <Header onShowModal={showModalHandler} />
      <main>
        {showSuccessModal && (
          <OrderFormSuccess
            onHideModal={hideSuccessModalHandler}
            orderFormSending={orderFormIsSending}
            orderFormError={orderFormError}
            orderId={orderId}
          />
        )}
        {mainContent}
      </main>
    </CartProvider>
  );
}

export default App;
