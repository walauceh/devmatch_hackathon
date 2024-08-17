import React, { useState } from 'react';
import './profilePage.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('current');
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Just Dreamy In A Winter Soul;');
  const [profilePicture, setProfilePicture] = useState('profilePic.jpg');
  const [status, setStatus] = useState('online');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfilePicture(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-avatar-container">
          <div className="avatar-wrapper">
            <img
              src={profilePicture}
              alt="Profile Avatar"
              className="profile-avatar"
              onError={(e) => {
                e.currentTarget.src = `${process.env.PUBLIC_URL}/profilePic.png`;
              }}
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                className="upload-input"
                onChange={handleProfilePictureChange}
              />
            )}
          </div>
        </div>
        <div className="profile-info">
          <h1>
            Wint3r{' '}
            <span className={`status ${status}`}>
              {status === 'invisible' ? (
                <span>
                  <span role="img" aria-label="invisible">
                    👻
                  </span>{' '}
                  Invisible
                </span>
              ) : status === 'doNotDisturb' ? (
                <span>
                  <span role="img" aria-label="do not disturb">
                    🛑
                  </span>{' '}
                  Do Not Disturb
                </span>
              ) : status === 'away' ? (
                <span>
                  <span role="img" aria-label="away">
                    🌙
                  </span>{' '}
                  Away
                </span>
              ) : (
                <span>
                  <span role="img" aria-label="online">
                    ✅
                  </span>{' '}
                  Online
                </span>
              )}
            </span>
          </h1>

          {isEditing ? (
            <textarea
              value={bio}
              onChange={handleBioChange}
              className="bio-input"
            />
          ) : (
            <p>{bio}</p>
          )}
          <div className="status-select">
            <label htmlFor="status">Change Status:</label>
            <select
              id="status"
              value={status}
              onChange={handleStatusChange}
              className="status-dropdown"
            >
              <option value="online">Online</option>
              <option value="away">Away</option>
              <option value="doNotDisturb">Do Not Disturb</option>
              <option value="invisible">Invisible</option>
            </select>
          </div>
          <div className="button-container">
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            {isEditing && (
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => setActiveTab('current')}
        >
          Current Visa {activeTab === 'current' && '(2)'}
        </button>
        <button
          className={`tab ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Visa {activeTab === 'past' && '(3)'}
        </button>
      </div>

      <hr className="tabs-divider" />

      {activeTab === 'current' && <CurrentVisa />}
      {activeTab === 'past' && <PastVisa />}
    </div>
  );
}

function CurrentVisa() {
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setVisibleDropdownIndex(visibleDropdownIndex === index ? null : index);
  };

  return (
    <div className="visa-items">
      <div className="visa-item">
        <img
          src="/Visa1.webp"
          alt="Visa 1"
          className="visa-img"
          onClick={() => toggleDropdown(0)}
          style={{ cursor: 'pointer' }}
        />
        {visibleDropdownIndex === 0 && (
          <div className="dropdown-content">
            <h3>Visa Document</h3>
            <img src="/documentImage1.webp" alt="Document" className="document-img" />
          </div>
        )}
      </div>
      <div className="visa-item">
        <img
          src="/Visa2.webp"
          alt="Visa 2"
          className="visa-img"
          onClick={() => toggleDropdown(1)}
          style={{ cursor: 'pointer' }}
        />
        {visibleDropdownIndex === 1 && (
          <div className="dropdown-content">
            <h3>Visa Document</h3>
            <img src="/documentImage2.webp" alt="Document" className="document-img" />
          </div>
        )}
      </div>
    </div>
  );
}

function PastVisa() {
  const [visibleDropdownIndex, setVisibleDropdownIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setVisibleDropdownIndex(visibleDropdownIndex === index ? null : index);
  };

  return (
    <div className="visa-items">
      <div className="visa-item">
        <img
          src="/Visa3.webp"
          alt="Visa 3"
          className="visa-img"
          onClick={() => toggleDropdown(0)}
          style={{ cursor: 'pointer' }}
        />
        {visibleDropdownIndex === 0 && (
          <div className="dropdown-content">
            <h3>Past Visa Document</h3>
            <img src="/documentImage3.webp" alt="Document" className="document-img" />
          </div>
        )}
      </div>
      <div className="visa-item">
        <img
          src="/Visa4.webp"
          alt="Visa 4"
          className="visa-img"
          onClick={() => toggleDropdown(1)}
          style={{ cursor: 'pointer' }}
        />
        {visibleDropdownIndex === 1 && (
          <div className="dropdown-content">
            <h3>Past Visa Document</h3>
            <img src="/documentImage4.webp" alt="Document" className="document-img" />
          </div>
        )}
      </div>
      <div className="visa-item">
        <img
          src="/Visa5.webp"
          alt="Visa 5"
          className="visa-img"
          onClick={() => toggleDropdown(2)}
          style={{ cursor: 'pointer' }}
        />
        {visibleDropdownIndex === 2 && (
          <div className="dropdown-content">
            <h3>Past Visa Document</h3>
            <img src="/documentImage5.webp" alt="Document" className="document-img" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;