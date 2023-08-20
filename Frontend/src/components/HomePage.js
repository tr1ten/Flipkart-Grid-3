import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/Background.png";
import Navbar from "./Navbar";
import MainImg from "../assets/download.png";
import Products from "./Products";
import CartModal from "./CartModal";

const HomePage = (props) => {
  const URL = process.env.REACT_APP_BASE_URL;
  const [isSticky, setIsSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const searchBar = document.querySelector(".search-container");
      const sticky = searchBar.offsetTop;

      setIsSticky(window.pageYOffset >= sticky);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle the search button click
  const handleSearchClick = (event) => {
    event.preventDefault();
    if (searchTerm) {
      // Make your API call using the searchTerm
      // Example API call using fetch:
      fetch(`${URL}api/search/?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data.sort((a, b) => b.users_interested - a.users_interested);
          setSearchResult(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      {isSticky && (
        <div>
          <Navbar />
        </div>
      )}

      <div
        style={{
          height: "50vh",
          maxWidth: "inherit",
          position: "relative",
        }}
        className={`relative container ${isSticky ? "sticky" : ""}`}
      >
        <div
          className="background-image"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(90deg, #036bfc, #d5d9de)", // Blue gradient
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            opacity: 0.5,
          }}
        ></div>
        <div
          className="main-img"
          style={{
            position: "absolute",
            top: "50%", // Adjust top position as needed
            left: "50%", // Adjust left position as needed
            transform: "translate(-48%, -70%)", // Center the image
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <img
            src={MainImg}
            alt="noimg"
            style={{ opacity: 1, maxWidth: "100%", objectFit: "fill" }}
          />
        </div>
        <div
          className="search-container absolute bottom-10 w-full p-4"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {!isSticky && (
            <>
              {/* <input
                type="text"
                className="search-bar bg-white border border-gray-300 rounded p-2 w-full"
                placeholder="Search Items..."
                style={{
                  width: "50vw",
                  padding: "10px",
                  paddingLeft: "30px",
                  fontSize: "20px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.7)",
                  border: "1px solid #ccc",
                  borderRadius: "30px", // Rounded corners
                  transition: "border-color 0.3s", // Add a transition effect
                  cursor: "pointer", // Change cursor on hover
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="search-button bg-blue-500 text-white rounded p-2 ml-2"
                onClick={handleSearchClick}
              >
                Search
              </button> */}

              <form style={{ width: "60vw", marginBottom: "-20px" }}>
                <label
                  for="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                  Search
                </label>
                <div className="relative">
                  <div>
                    {/* <svg
                      class="w-4 h-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg> */}
                  </div>
                  <input
                    style={{ height: "10px" }}
                    type="search"
                    id="default-search"
                    class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                    placeholder="What are you looking for?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                  />
                  <button
                    style={{
                      height: "47px",

                      marginBottom: "-8.5px",
                      marginRight: "-1vw",
                    }}
                    type="submit"
                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSearchClick}
                  >
                    Search
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
        {!isSticky && (
          <div
            style={{
              position: "fixed",
              top: "10px", // Adjust top position as needed
              right: "10px", // Adjust right position as needed
              // backgroundColor: "white",
              // borderRadius: "50px",
              padding: "10px",
              paddingRight: "15px",
              borderColor: "black",
              // borderWidth: "1px",
            }}
          >
            <CartModal />
          </div>
        )}
      </div>
      <Products
        SearchedItems={searchResult}
        Btitle="Add to Cart"
        Bcolor="blue"
        Title="Search Results"
      />
      {props.RecommendedItems && (
        <Products
          RecommendedItems={props.RecommendedItems}
          Btitle="Add to Cart"
          Bcolor="blue"
          Title="Your Recommendations"
        />
      )}

      <style jsx>
        {`
          .container {
            position: relative;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
