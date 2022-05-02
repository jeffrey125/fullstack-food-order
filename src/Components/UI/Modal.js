import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
  return <div className={classes.backdrop} onClick={props.onHideModal} />;
};

const ModalOverlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
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
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('modal-root')
      )}
    </>
  );
};

export default Modal;
