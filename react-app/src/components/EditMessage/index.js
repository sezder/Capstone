import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, updateMessage, deleteMessage } from "../../store/message";

const EditMessage = () => {
  let { projectId, messageId } = useParams();
  projectId = Number(projectId);
  messageId = Number(messageId);
  const dispatch = useDispatch();

  const creatorId = useSelector((state) => state.session.user.id);
  const currMessage = useSelector((state) => state.messages[messageId]);

  if (creatorId !== currMessage?.creator_id)

  const [subjectLine, setSubjectLine] = useState(currMessage?.subject_line || "");
  const [content, setContent] = useState("" || currMessage?.subject_line);
  const [errors, setErrors] = useState([]);

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
    const res = dispatch(updateMessage(message));
    if (res) {
      history.push(`/projects/${projectId}/messages`)
    }
  };


  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { creatorId, messageId  };
    const res = dispatch(deleteMessage(deletePayload));
    if (res) {
      history.push(`/projects/${projectId}/messages`);
    }
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
        Update
      </button>

      <button onClick={handleDelete}>
        <i className="far fa-trash-alt"></i>
      </button>
    </form>
  );
};

export default EditMessage;
