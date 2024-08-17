// WalletConnection.tsx
import React from 'react';
import './WalletConnection.css'; // Import the CSS file

const WalletConnection: React.FC = () => {
  return (
    <div className="wallet-page">
      <div className="balance-header">
        <div className="balance-details">
          <img src="path/to/flag-icon.png" alt="Flag" className="flag-icon" />
          <div>
            <h2>EUR balance</h2>
            <p>IBAN: BE12 3456 7891 0123</p>
          </div>
        </div>
        <h1>EUR</h1>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <div className="action-button">
          <i className="bx bx-plus-circle"></i>
          <p>Add</p>
        </div>
        <div className="action-button">
          <i className="bx bx-transfer"></i>
          <p>Convert</p>
        </div>
        <div className="action-button">
          <i className="bx bx-up-arrow"></i>
          <p>Send</p>
        </div>
        <div className="action-button receive">
          <i className="bx bx-down-arrow"></i>
          <p>Receive</p>
        </div>
        <div className="action-button">
          <i className="bx bx-dots-horizontal-rounded"></i>
          <p>More</p>
        </div>
      </div>

      {/* Balance Information */}
      <div className="balance-info">
        <h3>Balance information</h3>
        <div className="balance-item">
          <p><i className="bx bx-wallet"></i> Cash</p>
          <span>Explore ways to grow your money.</span>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="transactions">
        <h3>Transactions</h3>
        <div className="transactions-filters">
          <input type="text" placeholder="Search" className="search-bar" />
          <button className="filters-button">Filters</button>
          <button className="download-button">Download</button>
        </div>
        <p>Needs your attention</p>
      </div>
    </div>
  );
};

export default WalletConnection;
