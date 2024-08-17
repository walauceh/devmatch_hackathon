import React, { useState } from 'react';
import './profilePage.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('current');
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Just Dreamy In A Winter Soul;');
  const [profilePicture, setProfilePicture] = useState('profilePic.jpg');

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
            Wint3r <span className="online">Online</span>
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
          Current Visa (2)
        </button>
        <button
          className={`tab ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Visa
        </button>
      </div>

      <hr className="tabs-divider" />

      {activeTab === 'current' && <CurrentVisa />}
      {activeTab === 'past' && <PastVisa />}
    </div>
  );
}

function CurrentVisa() {
  return (
    <div className="visa-items">
      <div className="visa-item">
        <img src="/item1.png" alt="Visa 1" className="visa-img" />
      </div>
      <div className="visa-item">
        <img src="/item2.png" alt="Visa 2" className="visa-img" />
      </div>
      <div className="visa-item">
        <img src="/item3.png" alt="Visa 3" className="visa-img" />
      </div>
    </div>
  );
}

function PastVisa() {
  return (
    <div className="visa-items">
      <div className="visa-item">
        <img src="/item4.png" alt="Visa 4" className="visa-img" />
      </div>
      <div className="visa-item">
        <img src="/item5.png" alt="Visa 5" className="visa-img" />
      </div>
      <div className="visa-item">
        <img src="/item6.png" alt="Visa 6" className="visa-img" />
      </div>
    </div>
  );
}

export default Profile;