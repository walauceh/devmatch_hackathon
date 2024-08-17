import React, { useState } from "react";

interface CreateWalletModalProps {
  onSubmit: (data: { name: string; email: string; ic: string; walletName: string }) => void;
  onClose: () => void;
}

const CreateWalletModal: React.FC<CreateWalletModalProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ic, setIc] = useState("");
  const [walletName, setWalletName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, email, ic, walletName });
  };

  return (
    <div className="form-container">
      <h2 className="text-2xl font-bold mb-8">Create Wallet</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="ic">IC</label>
        <input
          type="text"
          id="ic"
          value={ic}
          onChange={(e) => setIc(e.target.value)}
          required
        />
        <label htmlFor="walletName">Wallet Name</label>
        <input
          type="text"
          id="walletName"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          required
        />
        <div className="form-buttons">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateWalletModal;
