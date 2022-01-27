import React, { useEffect, useState } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../store/message";
import { getAllProjects } from "../../store/project";
import "./NewMessage.css";

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
    <main id="new_msg_main">
      <div className="proj_nav" id="proj_nav_new_msg">
        <NavLink to={`/projects/${projectId}`}>
          <h2 className="light_large dynamic_underline">{currProject?.name}</h2>
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
        <input
          placeholder="Type a title"
          type="text"
          name="subjectLine"
          value={subjectLine}
          onChange={(e) => setSubjectLine(e.target.value)}
          // required={true}
          spellCheck={true}
        ></input>
        <textarea
          rows="18"
          placeholder="Share away..."
          type="text"
          name="content"
          value={content}
          // required={true}
          spellCheck={true}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit" disabled={errors.length > 0}>
          <i className="fas fa-plus"></i>
        </button>
      </form>
    </main>
  );
};

export default NewMessage;
