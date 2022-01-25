import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/comment";

const NewComment = ({ messageId, creatorId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!content?.length) errors.push("Provide content for reply.");
    setErrors(errors);
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      content,
      messageId,
      creatorId,
    };
    dispatch(createComment(comment));
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="msg_comment_form">
      <h1 className="dark_large">Write a reply</h1>
      {/* Errors  */}
      {errors.length > 0 && (
        <ul>
          {errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      )}

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
        <i className="fas fa-plus"></i>
      </button>
    </form>
  );
};

export default NewComment;
