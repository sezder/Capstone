import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment, deleteComment } from "../../store/comment";

const EditComment = ({
  setEditComment,
  currComment,
  creatorId,
  messageId,
}) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("" || currComment?.content);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!content?.length) errors.push("Provide content for reply.");
    setErrors(errors);
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      commentId: currComment?.id,
      content,
      messageId,
      creatorId,
    };
    dispatch(updateComment(comment));
    setEditComment(null);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { creatorId, commentId: currComment?.id };
    const res = dispatch(deleteComment(deletePayload));
    setEditComment(null);
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
          <i class="fas fa-check"></i>
        </button>

        <button onClick={handleDelete}>
          <i className="far fa-trash-alt"></i>
        </button>

        <button onClick={() => setEditComment(null)}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </form>
  );
};

export default EditComment;
