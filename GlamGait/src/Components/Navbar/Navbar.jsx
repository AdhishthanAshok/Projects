import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import profile_logo from "../assets/profile_icon.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [menu, setMenu] = useState("shop");
  return (
    <div className="nav_main">
      <div className="nav_logo_name">
        <img src={logo} alt="" />
        <p>GlamGait</p>
      </div>
      <div className="nav_details">
        <div className="nav_main_headings">
          <ul>
            <li
              onClick={() => {
                setMenu("shop");
              }}
              className="nav_list_items"
            >
              <Link style={{ textDecoration: "none", color: "Black" }} to="/">
                Shop
              </Link>{" "}
              {menu === "shop" ? <hr /> : <></>}
            </li>
            <li
              onClick={() => {
                setMenu("Men");
              }}
              className="nav_list_items"
            >
              <Link
                style={{ textDecoration: "none", color: "Black" }}
                to="/mens"
              >
                Men
              </Link>{" "}
              {menu === "Men" ? <hr /> : <></>}
            </li>
            <li
              onClick={() => {
                setMenu("Women");
              }}
              className="nav_list_items"
            >
              <Link
                style={{ textDecoration: "none", color: "Black" }}
                to="/womens"
              >
                Women
              </Link>{" "}
              {menu === "Women" ? <hr /> : <></>}
            </li>
            <li
              onClick={() => {
                setMenu("Kids");
              }}
              className="nav_list_items"
            >
              <Link
                style={{ textDecoration: "none", color: "Black" }}
                to="/kids"
              >
                Kids
              </Link>{" "}
              {menu === "Kids" ? <hr /> : <></>}
            </li>
          </ul>
        </div>
      </div>
      <div className="nav_buttons">
        <button className="login">
          <Link style={{ textDecoration: "none" }} to="/login">
            Login
          </Link>
        </button>
        <Link style={{ textDecoration: "none" }} to={"/profile"}>
          <img src={profile_logo} alt="" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
