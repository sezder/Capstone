import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getMessages } from "../../../store/message";
import { getAllProjects } from "../../../store/project";
import { getAllUsers } from "../../../store/user";
import "./ShowMessages.css";
import new_message from "../images/new_message.svg";
import OneMessage from "./OneMessage";
import NavBar from "../NavBar";

const ShowMessages = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages);
  const currProject = useSelector((state) => state.projects[projectId]);
  const messagesArr = Object.values(messages);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getMessages(projectId));
    dispatch(getAllProjects());
    dispatch(getAllUsers());
  }, [dispatch, projectId]);

  const navLinks = (
    <ul className="nav">
      <li>
        <NavLink to="/projects">
          <i className="fas fa-home fa-lg"></i>
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li>
        <NavLink
          to={`/projects/${currProject?.id}`}
          className="light_large dynamic_underline"
        >
          {currProject?.name}
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li className="curr_on light_large">Messages</li>
      <li>
        <NavLink to={`/projects/${projectId}/messages/new`}>
          <button className="circular_button">
            <i className="fas fa-plus"></i>
          </button>
        </NavLink>
      </li>
    </ul>
  );

  return (
    <>
      <NavBar navLinks={navLinks} />
      <main id="msgs_main">
        <section id="msgs_section">
          {/* Display all of the messages */}
          {messagesArr.length > 0 ? (
            messagesArr.map((message, idx) => {
              const userId = message?.creator_id;
              const msgUser = users[userId];
              return (
                <OneMessage
                  message={message}
                  key={idx}
                  projectId={projectId}
                  msgUser={msgUser}
                />
              );
            })
          ) : (
            <>
              <h2>Be the first to send a message...</h2>
              <img
                src={new_message}
                id="new_message"
                alt="Graphic of a woman standing by two large mail envelopes."
              ></img>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default ShowMessages;
