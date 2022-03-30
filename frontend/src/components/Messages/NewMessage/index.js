import React, { useEffect, useState } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../../store/message";
import { getAllProjects } from "../../../store/project";
import NavBar from "../../Layout/NavBar";
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

  // Nested navlinks: Home > Proj Name > Messages > New
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
      <li>
        <NavLink
          to={`/projects/${currProject?.id}/messages`}
          className="dynamic_underline light_large"
        >
          Messages
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li className="curr_on light_large">New</li>
    </ul>
  );

  return (
    <>
      <NavBar navLinks={navLinks} />
      <main id="new_msg_main">
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

          <button
            type="submit"
            disabled={errors.length > 0}
            className="circular_button"
          >
            <i className="fas fa-plus"></i>
          </button>
        </form>
      </main>
    </>
  );
};

export default NewMessage;
