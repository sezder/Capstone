import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments, updateComment, deleteComment } from "../../store/comment";

const EditComment = () => {
  let { messageId, commentId } = useParams();
  messageId = Number(messageId);
  commentId = Number(commentId);
  const dispatch = useDispatch();

  const creatorId = useSelector((state) => state.session.user.id);
  const currComment = useSelector((state) => state.comments[commentId]);

  const [content, setContent] = useState("" || currComment?.content);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!content?.length) errors.push("Provide content for reply.");
    setErrors(errors);
  }, [content]);

  useEffect(() => {
    dispatch(getComments(messageId));
  }, [dispatch, messageId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      commentId,
      content,
      messageId,
      creatorId,
    };
    dispatch(createComment(comment));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { creatorId, commentId };
    const res = dispatch(deleteComment(deletePayload));
    if (res) {
      history.push(`/projects/${projectId}/messages/${messageId}/comments`);
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

export default EditComment;
