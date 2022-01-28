import React from "react";
import "./Splash.css";
import { NavLink } from "react-router-dom";
import work_together from "../images/work_together.svg";

const Splash = () => {
  return (
    <main className="splash_main">
      <section className="splash_img_sec">
        <img
          src={work_together}
          alt="Graphic of two individuals collaborating."
        ></img>
      </section>
      <section className="splash_text_sec">
        <div>
          <h1 className="light_large">
            The All-In-One Toolkit<br></br> for Working Remotely.
          </h1>
          <p>
            <strong>Before Headquarters:</strong> Projects feel scattered,
            things slip, it's tough to see where things stand, and people are
            stressed.
          </p>
          <p>
            <strong>After Headquarters:</strong> Everything's organized in one
            place, you're on top of things, progress is clear, and a sense of
            calm sets in.
          </p>
          <NavLink to="/projects">
            <button>Give HQ a Try</button>
          </NavLink>
        </div>
      </section>
    </main>
  );
};

export default Splash;
