import React, { useState } from 'react';
import { toast } from 'react-toastify';

function MintVisa() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [error, setError] = useState('');

  const mintVisaCertificate = async () => {
    console.log("Minting visa with data:", { name, country, year });

    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/certificate/mint-certificate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, country, year }),
      });

      if (!response.ok) {
        throw new Error('Failed to mint visa certificate');
      }

      const result = await response.json();
      const transactionHash = result.transactionHash || 'Minting successful!';
      setTransactionHash(transactionHash);

      // Show a success toast notification
      toast.success(`Minting successful! Transaction Hash: ${transactionHash}`, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      console.error('Error minting visa certificate:', error);
      setError('Minting failed. Please try again.');

      // Show an error toast notification
      toast.error('Error minting visa certificate', {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mint-container">
      <h2>Mint Your Visa Certificate</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={mintVisaCertificate} disabled={isLoading}>
        {isLoading ? 'Minting...' : 'Submit'}
      </button>

      {transactionHash && (
        <p>Transaction successful! Transaction Hash: {transactionHash}</p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default MintVisa;
