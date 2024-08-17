import React, { useState, useRef } from 'react';
import './App.css';
import './visapage.css';

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

  const hotelBookingInputRef = useRef<HTMLInputElement>(null);
  const flightDetailInputRef = useRef<HTMLInputElement>(null);
  const passportFrontInputRef = useRef<HTMLInputElement>(null);

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
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
      });
  };

  return (
    <div id="body-pd" className={isExpanded ? 'body-pd' : ''}>
      <div className="logo-container">
        <img src="logo512.png" alt="Logo" className="logo-image" />
      </div>

      <div className={`l-navbar ${isExpanded ? 'expander' : ''}`} id="navbar">
        <nav className="nav">
          <div>
            <div className="nav__brand">
              <i className="bx bx-menu nav__toggle" id="nav-toggle" onClick={toggleNav}></i>
            </div>
            <div className="nav__list">
              <a href="#" className="nav__link active">
                <i className='bx bx-wallet'></i>
                <span className="nav__name">My Wallet</span>
              </a>
              <a href="#" className="nav__link">
                <i className='bx bxs-credit-card-alt'></i>
                <span className="nav__name">View Card</span>
              </a>
              <a href="#" className="nav__link">
                <i className ='bx bxs-file'></i>
                <span className="nav__name">Visa Application</span>
              </a>
            </div>
          </div>
        </nav>
      </div>

      <div className="form-container">
        <h1>Visa Application</h1>
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
                onDrop={(e) => handleDrop(setPassportBack, setPassportBackName, setPassportBackPreview, flightDetailInputRef, e)} 
                onDragOver={handleDragOver}
              >
                <p>{passportBackName}</p>
              </div>
              <input
                type="file"
                id="passportBack"
                accept="image/*"
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
    </div>
  );
}

export default TravelInfoForm;
