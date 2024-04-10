import React from "react";
import logo from "../assets/logo.jpg";
import profile_logo from "../assets/profile_icon.jpg";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="nav_main">
      <div className="nav_logo_name">
        <img src={logo} alt="" />
        <p>GlamGait</p>
      </div>
      <div className="nav_details">
        <div className="nav_main_headings">
          <ul>
            <li className="nav_list_items">Shop</li>
            <li className="nav_list_items">Men</li>
            <li className="nav_list_items">Women</li>
            <li className="nav_list_items">Kids</li>
          </ul>
        </div>
      </div>
      <div className="nav_buttons">
        <button className="login">Login</button>
        <img src={profile_logo} alt="" />
      </div>
    </div>
  );
}

export default Navbar;
