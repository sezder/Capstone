import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Auth/LogoutButton";
import DemoButton from "../DemoButton";
import { formatName, formatInitials } from "../../helperFuncs";
import "./NavBar.css";

const NavBar = ({ navLinks }) => {
  const user = useSelector((state) => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <div className="user_info_container">
          <div className={user?.icon_url ? null : "auth_user_icon"}>
            {/* If they don't have an icon, display their first and last initials */}
            {user?.icon_url
              ? null
              : formatInitials(user?.first_name, user?.last_name)}

            {/* Otherwise display the icon */}
            {user?.icon_url && (
              <img
                src={user?.icon_url}
                className="user_circle"
                id="nav_user_icon"
                alt={`profile photo for ${user?.first_name} ${user.last_name}`}
              ></img>
            )}
          </div>
          <h2>{formatName(user?.first_name, user?.last_name)}</h2>
        </div>

        <LogoutButton />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <button>
          <NavLink
            to="/login"
            exact={true}
            activeClassName="active"
            className="light_small"
          >
            Login
          </NavLink>
        </button>

        <button>
          <NavLink
            to="/sign-up"
            exact={true}
            activeClassName="active"
            className="light_small"
          >
            Sign Up
          </NavLink>
        </button>

        <DemoButton />
      </>
    );
  }
  return (
    <nav>
      {/* Logo */}
      <NavLink to="/">
        <div className="logo_container">
          <div className="border"></div>
          <h1 id="logo">HQ</h1>
        </div>
      </NavLink>

      {navLinks}

      <div className="auth_links">
        <a href="https://github.com/sezder/The-Hub">
          <i className="fab fa-github fa-lg"></i>
        </a>
        {/* Authentication */}
        {sessionLinks}
      </div>
    </nav>
  );
};

export default NavBar;
