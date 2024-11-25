import React, { useState } from "react";
import "../../css/customer-search.css";

function DescriptionInput({ onSaveDescription }) {
  const [description, setDescription] = useState(""); 
  const [savedDescription, setSavedDescription] = useState(""); 
  const [isEditing, setIsEditing] = useState(true); 

  const handleChange = (event) => {
    setDescription(event.target.value);

  };


  const handleSave = () => {
    setSavedDescription(description); 
    setIsEditing(false); 
    onSaveDescription(description);
  };

  
  const handleEdit = () => {
    setIsEditing(true); 
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        {isEditing ? (
          <form className="styled-form">
            <div className="form-group">
              <label htmlFor="description"></label>
              <textarea
                id="description"
                value={description}
                onChange={handleChange}
                placeholder="Enter description here..."
                rows="2"
                className="modern-textarea"
              ></textarea>
            </div>
            <button
              type="button"
              className="select-client-button"
              onClick={handleSave}
            >
              Add Description
            </button>
          </form>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "1.5rem",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <p
              style={{
                color: "#555",
                fontSize: "1rem",
                margin: 0,
              }}
            >
              {savedDescription}
            </p>
            <button
              type="button"
              className="select-client-button"
              onClick={handleEdit}
            >
              Change
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DescriptionInput;
