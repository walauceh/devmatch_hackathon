import React, { useState, useEffect } from 'react';
import './App.css';
import Profile from './profile';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateWalletModal from './CreateWalletModal';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const goToPage = (page: string) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Check if a wallet address is already stored in sessionStorage
    const storedWalletAddress = sessionStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  const openModal = () => setIsModalOpen(true); // Function to open the modal
  const closeModal = () => setIsModalOpen(false); // Function to close the modal

  const handleCreateWallet = async (walletData: { name: string; email: string; ic: string; walletName: string }) => {
    console.log("Creating wallet with data:", walletData);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/wallet/create-user`,
        {
          method: "POST",
          headers: {
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            "Content-Type": "application/json",
          }as HeadersInit,
          body: JSON.stringify(walletData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      const walletAddress = result.result.wallet.wallet_address;
      // Store the wallet address in sessionStorage
      sessionStorage.setItem("walletAddress", walletAddress);
      setWalletAddress(walletAddress);

      if (!walletAddress) {
        throw new Error("Wallet address not found in the response");
      }

      // Show a success toast notification
      toast.success(`Wallet created: ${walletAddress}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Close the modal after wallet creation
      closeModal();
    } catch (error) {
      console.error("Error creating wallet:", error);
      toast.error("Error creating wallet", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const clearWalletAddress = () => {
    sessionStorage.removeItem('walletAddress');
    setWalletAddress(null);
    toast.info("Wallet disconnected", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile />;
      case 'viewCard':
        return <div>View Card Page</div>;
      case 'document':
        return <div>Document Page</div>;
      default:
        return <div>Home Page</div>;
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

          {/*Connect Wallet Button*/}
          


          {/* Wallet Button Container at the Bottom */}
          <div className="wallet-container">
            <i className="bx bx-link"></i>
            {isExpanded && (
              walletAddress ? (
                <div className="flex flex-col items-center">
                  <span className="font-bold">Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                  <button
                    onClick={clearWalletAddress}
                    className="Connect-Wallet-Button mt-4"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                <button
                  className="Connect-Wallet-Button"
                  onClick={openModal} // Open the modal when clicked
                >
                  Create Wallet
                </button>
              )
            )}
          </div>
        </nav>
      </div>

      {/* Main content rendering */}
      <div className="content">
        {renderPage()}
      </div>

      {/* Conditionally render the CreateWalletModal */}
      {isModalOpen && (
        <CreateWalletModal onSubmit={handleCreateWallet} onClose={closeModal} />
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default App;
