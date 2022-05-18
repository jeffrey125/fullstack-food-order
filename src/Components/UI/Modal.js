import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onHideModal} />;
};

const ModalOverlay = props => {
  return (
    <div
      className={`${classes.modal} ${props.className} ${props.modalMediaQuery}`}
    >
      {props.children}
    </div>
  );
};

const Modal = props => {
  const modalMediaQuery = props.showSuccessModal
    ? classes.modalSuccessQuery
    : `${props.cartFlex} ${props.modalQuery}`;

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onHideModal={props.onHideModal} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          className={props.className}
          modalMediaQuery={modalMediaQuery}
        >
          {props.children}
        </ModalOverlay>,
        document.getElementById('modal-root')
      )}
    </>
  );
};

export default Modal;
