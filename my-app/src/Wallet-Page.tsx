import React, { useState } from 'react';
import './Wallet-Page.css';

interface WalletPageProps {
  balance: string | null;
  walletAddress: string | null;
}

const HomePage: React.FC<WalletPageProps> = ({ balance, walletAddress }) => {
  const [inputValue, setInputValue] = useState<number>(1); // State to manage the input value

  // Define the exchange rates
  const exchangeRates = {
    MYR: 11615.52,
    SGD: 3435.30,
    CNY: 18695.47,
  };

  // Function to handle input value change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setInputValue(isNaN(value) ? 0 : value); // Handle invalid numbers
  };

  return (
    <div className="homepage">
      <header className="balance-section">
        <div className="balance-info">
          <h2>Total balance</h2>
          <div className="balance-amount">
            <span>{balance ? `${parseFloat(balance).toFixed(3)} ETH` : '0.00 ETH'}</span>
          </div>
          <div className="balance-actions">
            <button className="action-button">Send</button>
            <button className="action-button">Add money</button>
            <button className="action-button">Request</button>
          </div>
        </div>
      </header>

      <section className="currency-cards">
        <div className="currency-card">
          <div className="currency-info">
            <img src="EthereumIcon.webp" alt="MYR" />
            <span>Ethereum</span>
          </div>
          <div className="currency-balance">{balance ? `${parseFloat(balance).toFixed(3)}` : '0.00'}</div>
        </div>
        <div className="currency-card">
          <div className="currency-info">
            <img src="Malaysia.jpg" alt="MYR" />
            <span>MYR</span>
          </div>
          <div className="currency-balance">{balance ? `${(parseFloat(balance) * 11615.52).toFixed(3)}` : '0.00'}</div>
        </div>
        <div className="currency-card">
          <div className="currency-info">
            <img src="Singapore.avif" alt="SGD" />
            <span>SGD</span>
          </div>
          <div className="currency-balance">0.00</div>
        </div>
        <div className="currency-card">
          <div className="currency-info">
            <img src="China.webp" alt="CNY" />
            <span>CNY</span>
          </div>
          <div className="currency-balance">0.00</div>
        </div>
      </section>

      <section className="transactions-section">
        <div className="transactions-header">
          <h3>Transactions</h3>
          <a href="#see-all" className="see-all-link">See all</a>
        </div>
        <ul className="transactions-list">
          <li className="transaction-item">
            <div className="transaction-info">
              <img src="FoodMerchant.png" alt="The Food Merchant" />
              <div>
                <h4>The Food Merchant</h4>
                <span>Sun, 11 Aug</span>
              </div>
            </div>
            <span className="transaction-amount">59.70 MYR</span>
          </li>
          <li className="transaction-item">
            <div className="transaction-info">
              <img src="Guardian.png" alt="Guardian" />
              <div>
                <h4>Guardian</h4>
                <span>4 Aug</span>
              </div>
            </div>
            <span className="transaction-amount">6.50 MYR</span>
          </li>
          <li className="transaction-item">
            <div className="transaction-info">
              <img src="MR-DIY.png" alt="Mr. DIY" />
              <div>
                <h4>Mr. DIY</h4>
                <span>4 Aug</span>
              </div>
            </div>
            <span className="transaction-amount">22 MYR</span>
          </li>
        </ul>
      </section>

      {/* New Exchange Rates Section */}
      <section className="exchange-rates-section">
        <div className="exchange-rates-header">
          <h3>Exchange rates</h3>
          <a href="#edit" className="edit-link">Edit</a>
        </div>
        <div className="exchange-rates-box">
          <input
            type="number"
            placeholder="You send"
            className="exchange-input"
            value={inputValue}
            onChange={handleInputChange}
          />
          <ul className="exchange-list">
            <li className="exchange-item">
              <div className="exchange-info">
                <img src="Malaysia.jpg" alt="ETH to MYR" />
                <span>ETH → MYR</span>
              </div>
              <div className="exchange-rate">{(inputValue * exchangeRates.MYR).toFixed(2)} MYR</div>
              <button className="exchange-action">Send</button>
            </li>
            <li className="exchange-item">
              <div className="exchange-info">
                <img src="Singapore.avif" alt="ETH to SGD" />
                <span>ETH → SGD</span>
              </div>
              <div className="exchange-rate">{(inputValue * exchangeRates.SGD).toFixed(2)} SGD</div>
              <button className="exchange-action">Send</button>
            </li>
            <li className="exchange-item">
              <div className="exchange-info">
                <img src="China.webp" alt="ETH to CNY" />
                <span>ETH → CNY</span>
              </div>
              <div className="exchange-rate">{(inputValue * exchangeRates.CNY).toFixed(2)} CNY</div>
              <button className="exchange-action">Send</button>
            </li>
          </ul>
          <p className="exchange-footer">These amounts don't include fees. Last updated: Saturday, 17 August 2024 at 18:35</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
