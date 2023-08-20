import React from "react";
import Logo from "../assets/flipkart_logo.png";
import CartModal from "./CartModal";

const Navbar = () => {
  return (
    <nav
      className="navbar bg-body-tertiary"
      style={{
        zIndex: "3",
        position: "fixed",
        width: "-webkit-fill-available",
      }}
    >
      <div className="container-fluid">
        <a style={{ color: "black" }} className="navbar-brand" href="/">
          <img
            src={Logo}
            alt="Logo"
            width={30}
            height={24}
            style={{ marginTop: "-4px", marginRight: "5px" }}
            className="d-inline-block align-text-top"
          />
          Flipkart
        </a>
        <form className="d-flex" role="search">
          <input
            style={{ width: "50vw" }}
            className="form-control me-2"
            type="search"
            placeholder="Search and press enter"
            aria-label="Search"
          />
        </form>
        <CartModal />
      </div>
    </nav>
  );
};

export default Navbar;

/*

*/
