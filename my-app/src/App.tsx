// App.tsx
import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import WalletConnection from './WalletConnection'; // Ensure this import is correct

function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`App ${isExpanded ? 'expanded' : ''}`}>
      <Sidebar isExpanded={isExpanded} toggleNav={toggleNav} />
      <div className="body-pd">
        <WalletConnection /> {/* Ensure this component is properly rendered */}
        {/* Other content */}
      </div>
    </div>
  );
}

export default App;
