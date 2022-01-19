import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Auth/LogoutButton";
import DemoButton from "../DemoButton";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);


  let sessionLinks;
  if (user) {
    sessionLinks = (
      <div className="auth_nav_div">
        <div className="auth_user_info">
          {/* <div className="auth_user_icon">
            {user?.icon_url ? null : user?.username[0]}
            {user?.icon_url && <img src={user?.icon_url} alt="user icon"></img>}
          </div> */}
          <p>{user?.username}</p>
        </div>
        <LogoutButton />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className="auth_nav_div">
          <li>
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
          </li>
          <li>
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
          </li>
          <li>
            <DemoButton />
          </li>
        </div>
      </>
    );
  }
  return (
    <nav>
      <ul>
        {/* Logo */}
        <NavLink to="/">
          <div className="logo_div">
            <h1 id="logo">
              The Hub
            </h1>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <div className="nav_links">
          <li>
            <NavLink
              to={`/projects`}
              exact={true}
            >
              Projects
            </NavLink>
          </li>
          <li>
          </li>

          <li>
            <a href="https://github.com/sezder/The-Hub">
              <i className="fab fa-github fa-2x"></i>
            </a>
          </li>
        </div>

        {/* Authentication */}
        {sessionLinks}
      </ul>
    </nav>
  );
};

export default NavBar;
