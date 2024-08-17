import React, { useState } from 'react';
import './App.css';
import Profile from './profile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const goToPage = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile />;
      case 'viewCard':
        return <div>View Card Page</div>; // Replace with your component
      case 'document':
        return <div>Document Page</div>; // Replace with your component
      default:
        return <div>Home Page</div>; // Replace with your home component
    }
  };

  return (
    <div id="body-pd" className={isExpanded ? 'body-pd' : ''}>
      {/* Sidebar component merged into App.tsx */}
      <div className={`l-navbar ${isExpanded ? 'expander' : ''}`} id="navbar">
        <nav className="nav">
          <div>
            <div className="logo-container">
              <img src="logo-image.png" alt="Logo" className="logo-image" />
              <h1 className={`nav__logo ${isExpanded ? 'visible' : ''}`}>MetaLink</h1>
            </div>
            <div className="nav__brand">
              <i className="bx bx-menu nav__toggle" id="nav-toggle" onClick={toggleNav}></i>
            </div>
            <div className="nav__list">
              <a
                href="#"
                className={`nav__link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => goToPage('home')}
              >
                <i className="bx bx-wallet"></i>
                <span className="nav__name">My Wallet</span>
              </a>
              <a
                href="#"
                className={`nav__link ${currentPage === 'viewCard' ? 'active' : ''}`}
                onClick={() => goToPage('viewCard')}
              >
                <i className="bx bxs-credit-card-alt"></i>
                <span className="nav__name">View Card</span>
              </a>
              <a
                href="#"
                className={`nav__link ${currentPage === 'document' ? 'active' : ''}`}
                onClick={() => goToPage('document')}
              >
                <i className="bx bxs-file"></i>
                <span className="nav__name">Document</span>
              </a>
              <a
                href="#"
                className={`nav__link ${currentPage === 'profile' ? 'active' : ''}`}
                onClick={() => goToPage('profile')}
              >
                <i className="bx bxs-user"></i>
                <span className="nav__name">Profile</span>
              </a>
            </div>
          </div>

          {/* Wallet Button Container at the Bottom */}
          <div className="wallet-container">
            <i className="bx bx-link"></i>
            {isExpanded && (
              <button className="Connect-Wallet-Button">Connect Wallet</button>
            )}
          </div>
        </nav>
      </div>

      {/* Main content rendering */}
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;