import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getComments } from "../../store/comment";
import { getMessages } from "../../store/message";
import { getAllProjects } from "../../store/project";
import "./IndivMessage.css";

const IndivMessage = () => {
  let { projectId, messageId } = useParams();
  projectId = Number(projectId);
  messageId = Number(messageId);

  const dispatch = useDispatch();

  const currMessage = useSelector((state) => state.messages?.[messageId]);
  const comments = useSelector((state) => state.comments);
  const currProject = useSelector((state) => state.projects[projectId]);
  console.log(currProject, "currproj");
  useEffect(() => {
    dispatch(getMessages(projectId));
    dispatch(getComments(messageId));
    dispatch(getAllProjects());
  }, [dispatch, messageId, projectId]);

  return (
    <main id="indiv_msg_main">
      <div className="proj_nav">
        <NavLink to={`/projects/${projectId}`}>
          <h2 className="light_large dynamic_underline">{currProject?.name}</h2>
        </NavLink>

        <i className="fas fa-caret-right fa-2x"></i>
        <NavLink to={`/projects/${projectId}/messages`}>
          <h2 className="light_large dynamic_underline">Message Board</h2>
        </NavLink>
      </div>

      <section>
        <h1 className="dark_large">{currMessage?.subject_line}</h1>

        <div className="msg_author_info">
          <div className="user_circle"></div>
          <h2>name</h2>
        </div>
        <p>{currMessage?.content}</p>
      </section>

      {/* Conditionally render add button */}
      {Object.values(comments).map((comment, idx) => {
        return (
          <section className="comment_section" key={idx}>
            <div>
              <div className="user_circle"></div>
              <p>name</p>
            </div>
            <div>{comment?.content}</div>
          </section>
        );
      })}
    </main>
  );
};

export default IndivMessage;
