import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateMessage, deleteMessage } from "../../store/message";
import "./EditMessage.css";

const EditMessage = ({
  // editMessage,
  setEditMessage,
  currMessage,
  // creatorId,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [subjectLine, setSubjectLine] = useState(
    currMessage?.subject_line || ""
  );
  const [content, setContent] = useState(currMessage?.content || "");
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
      projectId: currMessage?.project_id,
      creatorId: currMessage?.creator_id,
      messageId: currMessage?.id,
    };
    const res = dispatch(updateMessage(message));
    if (res) {
      history.push(
        `/projects/${currMessage?.project_id}/messages/${currMessage?.id}`
      );
      setEditMessage(false);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = {
      creatorId: currMessage?.creator_id,
      messageId: currMessage?.id,
    };
    const res = dispatch(deleteMessage(deletePayload));
    if (res) {
      history.push(`/projects/${currMessage?.project_id}/messages`);
      setEditMessage(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="msg_comment_form">
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

      <div className="button_div">
        <button type="submit" disabled={errors.length > 0}>
          <i className="fas fa-check"></i>
        </button>

        <button onClick={handleDelete}>
          <i className="far fa-trash-alt"></i>
        </button>

        {/* <button onClick={() => setEditMessage(false)}>
          <i className="fas fa-times"></i>
        </button> */}
      </div>
    </form>
  );
};

export default EditMessage;
