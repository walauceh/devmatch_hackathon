import React, { useState } from 'react';
import './App.css';

function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div id="body-pd" className={isExpanded ? 'body-pd' : ''}>
      <div className="logo-container">
        <img src="LogoConfirm.png" alt="Logo" className="logo-image" />
      </div>

      <div className={`l-navbar ${isExpanded ? 'expander' : ''}`} id="navbar">
        <nav className="nav">
          <div>
            <div className="nav__brand">
              <i className="bx bx-menu nav__toggle" id="nav-toggle" onClick={toggleNav}></i>
            </div>
            <div className="nav__list">
              <a href="#" className="nav__link active">
              <i className='bx bx-wallet'></i>
                <span className="nav__name">My Wallet</span>
              </a>
              <a href="#" className="nav__link">
              <i className='bx bxs-credit-card-alt'></i>
                <span className="nav__name">View Card</span>
              </a>

              <a href="#" className="nav__link">
              <i className ='bx bxs-file'></i>
                <span className="nav__name">Document</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;