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
  const {
    REACT_APP_FIREBASE_API_URL: FIREBASE_URL,
    REACT_APP_FIREBASE_API_KEY: FIREBASE_KEY,
  } = process.env;

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
      const response = await fetch(
        `${FIREBASE_URL}/address.json?key=${FIREBASE_KEY}`
      );

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
  }, [FIREBASE_URL, FIREBASE_KEY]);

  useEffect(() => {
    availableAddressDelivery();
  }, [availableAddressDelivery]);

  // Sends Food Data in Backend Server
  const sendFoodDataHandler = useCallback(
    async (foodData, orderId) => {
      try {
        // Data is sending (Loader)
        setOrderId('');
        setOrderFormIsSending(true);
        // Order Submitted!
        setShowSuccessModal(true);

        const response = await fetch(
          `${FIREBASE_URL}/orders/${orderId}.json?key=${FIREBASE_KEY}`,
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
          throw new Error(
            `Something went wrong Error Code: ${response.status}`
          );
        }

        // Order Id to be sent in modal
        setOrderId(orderId);
      } catch (err) {
        setOrderFormError(err.message);
        setShowSuccessModal(true);
      }
      setOrderFormIsSending(false);
    },
    [FIREBASE_KEY, FIREBASE_URL]
  );

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

  // State persist for Order Form
  useEffect(() => {
    const formState = JSON.parse(sessionStorage.getItem('formState'));
    setShowForm(formState);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('formState', JSON.stringify(showForm));
  }, [showForm]);

  // TODO Make a Order tracker
  return (
    <CartProvider>
      {showModal && (
        <Cart
          onHideModal={hideModalHandler}
          onShowForm={showOrderFormHandler}
          showForm={showForm}
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
            showModal={showSuccessModal}
          />
        )}
        {mainContent}
      </main>
    </CartProvider>
  );
}

export default App;
