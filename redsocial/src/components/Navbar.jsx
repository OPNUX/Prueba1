import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

export default function Navbar() {
  return (
  <div className="navbarContainer">
    <div className="left">
        <Link to="/home" className="logo">
          <span>InverOPNUX</span>
          <img src="./src/assets/logo/logo.png" alt="logo InverOPNUX"/>
        </Link>
    </div>

    <div className="center">

    </div>

    <div className="right">

    </div>

  </div>
  )
}
