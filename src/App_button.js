import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const ExpandableInput = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  if (isExpanded) {
    return ReactDOM.createPortal(
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        zIndex: 9999,
      }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text"
        />
      </div>,
      document.body
    );
  }

  return (
    <button style={{ zIndex: 999 }} onClick={toggleExpand}>Toggle Input</button>
  );
};

export default ExpandableInput;
