import React, { useState, useEffect } from "react";
import Products from "./Products";
import smallImage from "../assets/shopping-cart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const CartModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Enable scrolling when modal is closed
    document.body.style.overflow = "auto";
  };

  // Cleanup effect to enable scrolling when the component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div
        onClick={handleOpenModal}
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          // width: "400px",
        }}
      >
        {/* <img
          src={smallImage}
          alt="noimg"
          style={{ width: "30px", height: "30px" }}
        /> */}
        <FontAwesomeIcon fontSize="30px" className="text-blue-500" icon={faShoppingCart} />
        {/* <FontAwesome /> */}
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1000,
            overflowY: "scroll",
            paddingTop: "80px",
            // marginTop: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              maxWidth: "80%",
            }}
          >
            <Products Btitle="Remove Item" Bcolor="red" Title="Cart" />

            <button
              onClick={handleCloseModal}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
