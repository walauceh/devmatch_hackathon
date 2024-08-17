import React from 'react';
import { Link } from 'react-router-dom';
import './visahomepage.css';

const VisaHomePage: React.FC = () => {
  return (
    <div id="body-pd" className="home-container">
      <div className="logo-container">
        <img src="logo512.png" alt="Logo" className="logo-image" />
      </div>

      <div className="l-navbar" id="navbar">
        <nav className="nav">
          <div>
            <div className="nav__brand">
              <i className="bx bx-menu nav__toggle" id="nav-toggle"></i>
            </div>
            <div className="nav__list">
              <Link to="#" className="nav__link active">
                <i className='bx bx-wallet'></i>
                <span className="nav__name">My Wallet</span>
              </Link>
              <Link to="#" className="nav__link">
                <i className='bx bxs-credit-card-alt'></i>
                <span className="nav__name">View Card</span>
              </Link>
              <Link to="/visa-application" className="nav__link">
                <i className='bx bxs-file'></i>
                <span className="nav__name">Visa Application</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="content-container">
        <h1>Visa Management</h1>
        <div className="block-container">
          <Link to="/submit-visa" className="block-item">
            <h2>Submit Visa Application</h2>
            <p>Apply for a new visa or update your existing visa application.</p>
          </Link>
          <Link to="/my-visa" className="block-item">
            <h2>My Current Visa</h2>
            <p>View details and status of your current visa.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VisaHomePage;
