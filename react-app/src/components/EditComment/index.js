import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments, updateComment, deleteComment } from "../../store/comment";

const EditComment = ({
  editComment,
  setEditComment,
  currComment,
  creatorId,
  messageId,
  projectId,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

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
    <form onSubmit={handleSubmit}>
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
          Update
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
