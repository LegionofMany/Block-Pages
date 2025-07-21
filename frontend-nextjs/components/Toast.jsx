// ...existing code from frontend/src/components/Toast.jsx...

import React, { useEffect } from "react";
import PropTypes from "prop-types";

function Toast({ message, type = "info", onClose, duration = 3000 }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white transition-all toast-${type}`}
      role="alert"
      aria-live="assertive"
    >
      {message}
      <button
        onClick={onClose}
        className="ml-4 text-white font-bold focus:outline-none"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["info", "success", "error"]),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

export default Toast;
