import React from 'react';
import './Loading.css'

function Loading() {
  return (
    <div className="loader-container">
      <div className="loader">
        {/* Replace 'Loading...' with a symbol, for example, a spinner */}
        <i className="fas fa-spinner fa-spin"></i> {/* Example of using Font Awesome spinner */}
      </div>
    </div>
  );
}

export default Loading;
