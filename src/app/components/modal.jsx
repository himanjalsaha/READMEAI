import React from 'react';
import { X } from 'lucide-react'; // Import the close icon from Lucide React

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render anything if modal is closed

  const handleOverlayClick = (event) => {
    // Close modal if overlay is clicked
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50" 
      onClick={handleOverlayClick} // Attach click event to overlay
    >
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg relative max-w-lg w-full">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-white focus:outline-none"
          aria-label="Close modal" // Accessibility improvement
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
