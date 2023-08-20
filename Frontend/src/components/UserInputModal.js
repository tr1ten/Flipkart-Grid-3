import React, { useState } from "react";
import Modal from "react-modal";

const UserInputModal = ({ isOpen, onClose, onSubmit }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = () => {
    console.log("submitted");
    onSubmit(age, gender);
  };

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "5px",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
    },
  };

  const inputStyles = {
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const labelStyles = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const buttonStyles = {
    display: "block",
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>
        Enter Your Information
      </h2>
      <div>
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={inputStyles}
        />
        <label style={labelStyles}>
          Gender:
          <select
            value={gender}
            onChange={handleGenderChange}
            style={inputStyles}
          >
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </label>
        <button onClick={handleSubmit} style={buttonStyles}>
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default UserInputModal;
