//generate qr code in react
import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const App: React.FC = () => {
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);

  const handleGenerateQRCode = () => {
    const data = "Hello, World!";
    setQrCodeValue(data);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>
      {qrCodeValue && (
        <div style={{ marginTop: '20px' }}>
          <QRCode value={qrCodeValue} />
        </div>
      )}
    </div>
  );
};

export default App;
