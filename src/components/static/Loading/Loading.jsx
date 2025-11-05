import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
  
    <div className="loading-container">
      <div className="spinner"></div>
      {/* <div className="loading-text">
        Creating your account
        <span className="dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div> */}
      {/* <div className="loading-subtext">This will only take a moment</div> */}
    </div>
    
  );
};

export default Loading;