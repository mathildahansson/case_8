import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, children, onSubmit }) => {
  // console.log("Modal visibility (inside Modal.jsx):", show);

  if (!show) {
    return null; // om show är falskt, rendera ingenting
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button 
          onClick={() => {
            console.log("Closing modal");
            onClose();  // stänger modalen
          }} 
          className="close-button">
          &times;
        </button>
        
        {/* skicka onSubmit som prop till varje barnkomponent */}
        {React.Children.map(children, child => 
          React.cloneElement(child, { onSubmit }) // skickar onSubmit till alla barn
        )}
      </div>
    </div>
  );
};

export default Modal;
