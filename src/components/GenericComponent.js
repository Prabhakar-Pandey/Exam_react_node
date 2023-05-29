import React from 'react';
import './GenericComponent.css'; // Import custom CSS file for styling
import {getLocalStorageItem} from '../utilityMethods';

const GenericComponent = ({msg="Exam will start in a while", status}) => {
    
    return (
      <div className="result-container">
        <h2 className="result-title">{status}</h2>
        <div className="result-content">
          {/* Display the result value */}
          <p className="result-value">{msg}</p>
        </div>
      </div>
    );
  };
  
  export default GenericComponent;