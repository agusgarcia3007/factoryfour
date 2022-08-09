import React from "react";
import logo from "../assets/inclusion.svg";

const Header = () => {
  return (
    <div>
      <div className="header">
        <img className="logo-inclusion" src={logo} alt="logo" />
        <h1 className="header_title">FactoryFour status dashboard</h1>
      </div>
    </div>
  );
};

export default Header;
