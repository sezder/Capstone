import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../store/message";

const NewMessage = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);
  const dispatch = useDispatch();

  const [subjectLine, setSubjectLine] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const creatorId = useSelector((state) => state.session.user.id);

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
    dispatch(createMessage(message));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Errors  */}
      {errors.length > 0 && (
        <ul>
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
        required={true}
        spellCheck={true}
      ></input>

      <textarea
        placeholder="Share away..."
        type="text"
        name="content"
        value={content}
        required={true}
        spellCheck={true}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button type="submit" disabled={errors.length > 0}>
        Add
      </button>
    </form>
  );
};

export default NewMessage;
