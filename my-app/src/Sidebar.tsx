import React from 'react';

interface SidebarProps {
  isExpanded: boolean;
  toggleNav: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleNav }) => {
  return (
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
            <a href="#" className="nav__link active">
              <i className="bx bx-wallet"></i>
              <span className="nav__name">My Wallet</span>
            </a>
            <a href="#" className="nav__link">
              <i className="bx bxs-credit-card-alt"></i>
              <span className="nav__name">View Card</span>
            </a>
            <a href="#" className="nav__link">
              <i className="bx bxs-file"></i>
              <span className="nav__name">Document</span>
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
  );
};

export default Sidebar;
