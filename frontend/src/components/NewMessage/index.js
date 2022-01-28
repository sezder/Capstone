import React, { useEffect, useState } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../store/message";
import { getAllProjects } from "../../store/project";
import "./NewMessage.css";
import NavBar from "../NavBar";

const NewMessage = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);
  const dispatch = useDispatch();
  const history = useHistory();

  const [subjectLine, setSubjectLine] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const creatorId = useSelector((state) => state.session.user.id);
  const currProject = useSelector((state) => state.projects[projectId]);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch, projectId]);

  useEffect(() => {
    const errors = [];
    if (!subjectLine?.length) errors.push("Provide a subject line.");
    if (subjectLine?.length > 50)
      errors.push("Subject line must not be more than 50 characters.");
    if (!content?.length) errors.push("Provide message content.");
    setErrors(errors);
  }, [subjectLine, content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      subjectLine,
      content,
      projectId,
      creatorId,
    };
    const res = dispatch(createMessage(message));
    if (res) {
      history.push(`/projects/${projectId}/messages`);
    }
  };

  return (
    <>
      <NavBar />
      <main id="new_msg_main">
        <div className="proj_nav" id="proj_nav_new_msg">
          <NavLink to={`/projects/${projectId}`}>
            <h2 className="light_large dynamic_underline">
              {currProject?.name}
            </h2>
          </NavLink>

          <i className="fas fa-caret-right fa-2x"></i>
          <NavLink to={`/projects/${projectId}/messages`}>
            <h2 className="light_large dynamic_underline">Message Board</h2>
          </NavLink>

          <i className="fas fa-caret-right fa-2x"></i>
          <h2 className="light_large">Share your thoughts</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Errors  */}
          {errors.length > 0 && (
            <ul className="errors">
              {errors.map((error) => {
                return <li key={error}>{error}</li>;
              })}
            </ul>
          )}

          <label htmlFor="new_msg_title" className="hidden">
            Message Title
          </label>
          <input
            id="new_msg_title"
            placeholder="Message title"
            type="text"
            name="subjectLine"
            value={subjectLine}
            onChange={(e) => setSubjectLine(e.target.value)}
            spellCheck={true}
          ></input>

          <label htmlFor="new_msg_content" className="hidden">
            Share away...
          </label>
          <textarea
            id="new_msg_content"
            rows="18"
            placeholder="Share away..."
            type="text"
            name="content"
            value={content}
            spellCheck={true}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <button type="submit" disabled={errors.length > 0}>
            <i className="fas fa-plus"></i>
          </button>
        </form>
      </main>
    </>
  );
};

export default NewMessage;
