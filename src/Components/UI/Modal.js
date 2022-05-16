import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onHideModal} />;
};

const ModalOverlay = props => {
  return (
    <div className={`${classes.modal} ${props.className}`}>
      {props.children}
    </div>
  );
};

const Modal = props => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onHideModal={props.onHideModal} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.className}>
          {props.children}
        </ModalOverlay>,
        document.getElementById('modal-root')
      )}
    </>
  );
};

export default Modal;
