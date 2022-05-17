import React from 'react';
import Modal from '../UI/Modal';
import classes from './OrderFormSuccess.module.css';
import Spinner from '../UI/Spinner';

const OrderFormSuccess = props => {
  let content, title, loader;
  const hideModalhandler = props.onHideModal;
  const orderFormSending = props.orderFormSending;
  const orderFormError = props.orderFormError;
  const orderId = props.orderId;
  const showModal = props.showModal;

  if (orderFormSending) {
    title = 'Order is Sending';
    loader = <Spinner className={classes.content}>Sending Order Form</Spinner>;
  }

  if (orderFormError) {
    title = 'Error';
    content = <p className={classes.content}>{orderFormError}</p>;
  }

  if (orderId) {
    title = 'Congratulations';
    content = (
      <p className={classes.content}>
        {`Order Form Sent your order id is: ${orderId}`}
      </p>
    );
  }

  return (
    <Modal onHideModal={hideModalhandler} showSuccessModal={showModal}>
      <div className={classes.successContainer}>
        <h1 className={classes.header}>{title}</h1>
        {content}
        {loader}
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.button}
            onClick={hideModalhandler}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderFormSuccess;
