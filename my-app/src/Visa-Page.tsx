import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './Visa-Page.css';

function TravelInfoForm() {
  const [fullName, setFullName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [hotelBooking, setHotelBooking] = useState<File | null>(null);
  const [hotelBookingName, setHotelBookingName] = useState('No file chosen');
  const [flightDetail, setFlightDetail] = useState<File | null>(null);
  const [flightDetailName, setFlightDetailName] = useState('No file chosen');
  const [passportFront, setPassportFront] = useState<File | null>(null);
  const [passportFrontName, setPassportFrontName] = useState('No file chosen');
  const [passportBack, setPassportBack] = useState<File | null>(null);
  const [passportBackName, setPassportBackName] = useState('No file chosen');
  const [passportFrontPreview, setPassportFrontPreview] = useState<string | null>(null);
  const [passportBackPreview, setPassportBackPreview] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrData, setQrData] = useState<string>('');

  const hotelBookingInputRef = useRef<HTMLInputElement>(null);
  const flightDetailInputRef = useRef<HTMLInputElement>(null);
  const passportFrontInputRef = useRef<HTMLInputElement>(null);
  const passportBackInputRef = useRef<HTMLInputElement>(null); // Added ref for passport back

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFileChange = (
    setter: React.Dispatch<React.SetStateAction<File | null>>, 
    nameSetter: React.Dispatch<React.SetStateAction<string>>,
    previewSetter: React.Dispatch<React.SetStateAction<string | null>>, 
    event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setter(file);
    nameSetter(file ? file.name : 'No file chosen');

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewSetter(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      previewSetter(null);
    }
  };

  const handleDrop = (
    setter: React.Dispatch<React.SetStateAction<File | null>>, 
    nameSetter: React.Dispatch<React.SetStateAction<string>>, 
    previewSetter: React.Dispatch<React.SetStateAction<string | null>>, 
    inputRef: React.RefObject<HTMLInputElement>,
    event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    setter(file);
    nameSetter(file ? file.name : 'No file chosen');

    if (inputRef.current && file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      inputRef.current.files = dataTransfer.files;

      const changeEvent = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(changeEvent);
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewSetter(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      previewSetter(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!hotelBooking || !flightDetail || !passportFront || !passportBack) {
      alert('Please upload all required files.');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('passportNumber', passportNumber);
    formData.append('hotelBooking', hotelBooking);
    formData.append('flightDetail', flightDetail);
    formData.append('passportFront', passportFront);
    formData.append('passportBack', passportBack);

    fetch('/your-server-endpoint', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
      })
      .finally(() => {
        // Generate QR code regardless of fetch result (for testing)
        setQrData(`Full Name: ${fullName}, Passport Number: ${passportNumber}`);
        setShowQRCode(true);
      });
  };

  const resetForm = () => {
    setFullName('');
    setPassportNumber('');
    setHotelBooking(null);
    setHotelBookingName('No file chosen');
    setFlightDetail(null);
    setFlightDetailName('No file chosen');
    setPassportFront(null);
    setPassportFrontName('No file chosen');
    setPassportBack(null);
    setPassportBackName('No file chosen');
    setPassportFrontPreview(null);
    setPassportBackPreview(null);

    // Resetting file inputs manually
    if (hotelBookingInputRef.current) hotelBookingInputRef.current.value = '';
    if (flightDetailInputRef.current) flightDetailInputRef.current.value = '';
    if (passportFrontInputRef.current) passportFrontInputRef.current.value = '';
    if (passportBackInputRef.current) passportBackInputRef.current.value = ''; // Added passport back reset
  };

  const handleQRCodeClose = () => {
    setShowQRCode(false);
    resetForm(); // Reset the form when the QR code modal is closed
  };

  return (
    <div id="body-pd" className={isExpanded ? 'body-pd' : ''}>
      <div className="form-container">
        <h1 className="visa-title">Visa Application</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name (same as IC):</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="passportNumber">Passport Number:</label>
            <input
              type="text"
              id="passportNumber"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="hotelBooking">Upload Hotel Booking Ticket (PDF):</label>
            <div 
              className="drag-drop-area" 
              onDrop={(e) => handleDrop(setHotelBooking, setHotelBookingName, () => {}, hotelBookingInputRef, e)} 
              onDragOver={handleDragOver}
            >
              <p>{hotelBookingName}</p>
            </div>
            <input
              type="file"
              id="hotelBooking"
              accept=".pdf"
              ref={hotelBookingInputRef}
              onChange={(e) => handleFileChange(setHotelBooking, setHotelBookingName, () => {}, e)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="flightDetail">Upload Flight Detail (PDF):</label>
            <div 
              className="drag-drop-area" 
              onDrop={(e) => handleDrop(setFlightDetail, setFlightDetailName, () => {}, flightDetailInputRef, e)} 
              onDragOver={handleDragOver}
            >
              <p>{flightDetailName}</p>
            </div>
            <input
              type="file"
              id="flightDetail"
              accept=".pdf"
              ref={flightDetailInputRef}
              onChange={(e) => handleFileChange(setFlightDetail, setFlightDetailName, () => {}, e)}
              required
            />
          </div>

          <div className="form-group passport-group">
            <div className="passport-upload">
              <label htmlFor="passportFront">Upload Passport Front Picture:</label>
              <div 
                className="drag-drop-area" 
                onDrop={(e) => handleDrop(setPassportFront, setPassportFrontName, setPassportFrontPreview, passportFrontInputRef, e)} 
                onDragOver={handleDragOver}
              >
                <p>{passportFrontName}</p>
              </div>
              <input
                type="file"
                id="passportFront"
                accept="image/*"
                ref={passportFrontInputRef}
                onChange={(e) => handleFileChange(setPassportFront, setPassportFrontName, setPassportFrontPreview, e)}
                required
              />
              {passportFrontPreview && (
                <img src={passportFrontPreview} alt="Passport Front Preview" className="passport-preview" />
              )}
            </div>

            <div className="passport-upload">
              <label htmlFor="passportBack">Upload Passport Back Picture:</label>
              <div 
                className="drag-drop-area" 
                onDrop={(e) => handleDrop(setPassportBack, setPassportBackName, setPassportBackPreview, passportBackInputRef, e)} 
                onDragOver={handleDragOver}
              >
                <p>{passportBackName}</p>
              </div>
              <input
                type="file"
                id="passportBack"
                accept="image/*"
                ref={passportBackInputRef} // Added ref for passport back
                onChange={(e) => handleFileChange(setPassportBack, setPassportBackName, setPassportBackPreview, e)}
                required
              />
              {passportBackPreview && (
                <img src={passportBackPreview} alt="Passport Back Preview" className="passport-preview" />
              )}
            </div>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>

      {showQRCode && (
        <div className="qr-modal">
          <div className="qr-code-container">
            <QRCodeCanvas value={qrData} size={256} />
            <p>Please screenshot the QR code, or it will disappear after closing this window.</p>
            <button onClick={handleQRCodeClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TravelInfoForm;
