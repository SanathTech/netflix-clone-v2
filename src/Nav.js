import React, { useEffect, useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 0) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);

    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_wrapper">
        <img
          onClick={() => navigate("/")}
          className="nav_logo"
          src="https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_logo.png"
          alt="Fakeflix Logo"
        />
        <ul className="primary_nav">
          <li className="primary_nav_menu">Browse</li>
          <li
            className="primary_nav_tab"
            style={{ opacity: 1, cursor: "default" }}
          >
            Home
          </li>
          <li className="primary_nav_tab">TV Shows</li>
          <li className="primary_nav_tab">Movies</li>
          <li className="primary_nav_tab">New & Popular</li>
          <li className="primary_nav_tab">My List</li>
          <li className="primary_nav_tab">Browse by Languages</li>
        </ul>
        <div className="secondary_nav">
          <SearchIcon
            style={{ color: "white", marginRight: 10, cursor: "pointer" }}
          />
          <NotificationsIcon
            style={{ color: "white", marginRight: 10, cursor: "pointer" }}
          />
          <div className="dropdown_menu">
            <img
              onClick={() => navigate("/profile")}
              className="nav_avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Netflix Avatar"
            />
            <span className="caret"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
