import React, { useState, useEffect } from "react";
import UserInputModal from "./components/UserInputModal";
import "./App.css";
import HomePage from "./components/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storedId, setStoredId] = useState("");
  const [jsonData, setJsonData] = useState(null); // State to hold API response
  const URL = process.env.REACT_APP_BASE_URL;

  const fetchData = async (id) => {
    try {
      const response = await fetch(`${URL}api/recommend/${id}`); // Replace API URL
      const data = await response.json();
      console.log(data);
      data.sort((a, b) => b.users_interested - a.users_interested);

      setJsonData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      setIsModalOpen(true);
    } else {
      setStoredId(id);
      fetchData(id);

      // API call to fetch JSON data, only if id is present
    }
  }, []);

  const handleModalSubmit = async (age, gender) => {
    // Make API call
    const response = await fetch(
      `${URL}api/create-user/?age=${age}&gender=${gender}`
    );
    const data = await response.json();

    // Store the ID in local storage
    localStorage.setItem("id", data.id);
    fetchData(data.id);
    // Close the modal
    setIsModalOpen(false);
    setStoredId(data.id);
  };

  return (
    <div style={{ fontFamily: "Montserrat" }} className="overflow-hidden">
      {/* Your app content */}
      {storedId ? (
        <HomePage RecommendedItems={jsonData} />
      ) : (
        <UserInputModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
