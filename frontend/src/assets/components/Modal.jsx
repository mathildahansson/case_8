import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, children, onSubmit }) => {
  console.log("Modal visibility (inside Modal.jsx):", show);

  if (!show) {
    return null; // Om show är falskt, rendera ingenting
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button 
          onClick={() => {
            console.log("Closing modal");
            onClose();  // Stänger modalen
          }} 
          className="close-button">
          &times;
        </button>
        
        {/* Skicka onSubmit som prop till varje barnkomponent */}
        {React.Children.map(children, child => 
          React.cloneElement(child, { onSubmit }) // Skickar onSubmit till alla barn
        )}
      </div>
    </div>
  );
};

export default Modal;
