import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, children, onSubmit }) => {
  console.log("Modal visibility:", show); // kontrollera om show är true/false

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={() => { console.log("Closing modal"); onClose(); }} className="close-button">
          &times;
        </button>
        {React.cloneElement(children, { onSubmit })} {/* här vidarebefordras onSubmit */}
      </div>
    </div>
  );
};

export default Modal;