import React, { useState, useEffect } from 'react';
import './App.css';
import Profile from './profile';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateWalletModal from './CreateWalletModal';
import Visa from './Visa-Page';
import Card from './CardPage';
import Walletpage from './Wallet-Page';
import { InfuraProvider, formatEther, BrowserProvider } from 'ethers';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [balance, setBalance] = useState<string | null>(null); // State to store wallet balance

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
      fetchWalletBalance(storedWalletAddress); // Fetch balance on load
    }
  }, []);
  
  const fetchWalletBalance = async (walletAddress: string) => {
    try {
      const provider = new InfuraProvider('sepolia', process.env.REACT_APP_INFURA_PROJECT_ID); // Use only the project ID
      const balanceInWei = await provider.getBalance(walletAddress);
      const balanceInEth = formatEther(balanceInWei);
      setBalance(balanceInEth);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const connectWallet = async () => {
    try {
      if ((window as any).ethereum) {
        const provider = new BrowserProvider((window as any).ethereum); // Updated to use BrowserProvider
        const accounts = await provider.send('eth_requestAccounts', []);
        const account = accounts[0];
        sessionStorage.setItem('walletAddress', account);
        setWalletAddress(account);
        fetchWalletBalance(account); // Fetch balance after connection

        toast.success(`Wallet connected: ${account}`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("MetaMask is not installed.", {
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
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

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
        return <Card />; // Replace with your component
      case 'document':
        return <Visa />; // Replace with your component
      default:
        return <Walletpage balance={balance} walletAddress={walletAddress} />; // Pass the balance and walletAddress as props
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
                <span className="nav__name">Visa Application</span>
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
          walletAddress ? (
            <div className="flex flex-col items-center">
              <span className="font-bold">Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}</span>
              <div className="font-bold">Balance: {balance ? `${parseFloat(balance).toFixed(3)} ETH` : 'Loading...'}</div>
              <button
                onClick={clearWalletAddress}
                className="Connect-Wallet-Button mt-4"
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <button
                className="Connect-Wallet-Button"
                onClick={openModal}
              >
                Create Wallet
              </button>
              <button
                className="Connect-Wallet-Button mt-4"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            </div>
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
      <ToastContainer className="custom-toast-container"/>
    </div>
  );
}

export default App;
