import React from "react";

function Footer() {
  return (
    <div
      style={{ zIndex: "-1" }}
      className="p-2 bg-blue-400 sticky bottom-0   w-full text-center letter-spacing-2"
    >
      <a href="#" className="text-white">
        Made with ❤️ by Sushmit, Shubham, and Navneet for <span
        className=" text-yellow-400 text-sm font-bold mb-2"
        >

        Flipkart GRiD 3.0
        </span>
      </a>
    </div>
  );
}

export default Footer;
