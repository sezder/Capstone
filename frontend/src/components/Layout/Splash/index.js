import { NavLink } from "react-router-dom";
import work_together from "../images/work_together.svg";
import "./Splash.css";

const Splash = () => {
  return (
    <main className="splash_main">
      <section className="splash_intro">
        <div className="splash_img">
          <img
            src={work_together}
            alt="Graphic of two individuals collaborating."
          ></img>
        </div>
        <div className="splash_text_sec" id="intro_text">
          <h1 className="light_large">
            The All-In-One Toolkit for Working Remotely.
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

      <section id="proj_prev">
        <div className="half">
          <div className="splash_text_sec">
            <h2>Organize your team's projects all in one place.</h2>
          </div>
          <img
            alt="Preview of project cards."
            src="https://i.imgur.com/2aGG4jk.png"
            id="proj_prev_img"
          ></img>
        </div>

        <div className="half">
          <div className="splash_text_sec">
            <h2>Assign people to projects relevant to their role.</h2>
          </div>
          <img
            alt="Preview of project assignment functionality."
            src="https://i.imgur.com/3dsSHJN.png"
            id="assign_prev_img"
          ></img>
        </div>
      </section>

      <section id="msgs_prev">
        <div className="half">
          <img
            alt="Message board preview."
            src="https://i.imgur.com/vp62F7B.png"
            id="msg_board_img"
          ></img>
        </div>

        <div className="half" id="msg_text_half">
          <img
            alt="Message board mini preview."
            src="https://i.imgur.com/C7WdWc6.png"
            id="mini_msg_board_img"
          ></img>
          <div className="splash_text_sec">
            <h2>
              Remote work is especially challenging when everything is spread out
              across emails, chats, meetings, etc. The message board
              keeps communications organized and relevant.
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Splash;
