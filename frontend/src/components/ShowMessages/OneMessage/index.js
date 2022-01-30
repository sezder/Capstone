import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllComments } from "../../../store/comment";

import "./OneMessage.css";

const OneMessage = ({ message, projectId, msgUser }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const commentNum = Object.values(comments).filter(
    (comment) => comment?.message_id === message?.id
  ).length;

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  return (
    <NavLink
      to={`/projects/${projectId}/messages/${message?.id}`}
      className="msg_preview"
    >
      {/* User icon showing author */}
      <div id="msg_author_div">
        {msgUser?.icon_url ? (
          <img
            className="user_circle"
            src={msgUser?.icon_url}
            alt="User profile icon"
          />
        ) : (
          <div className="user_circle initials_circle">
            {`${msgUser?.first_name[0]} 
                              ${msgUser?.last_name[0]}`}
          </div>
        )}
      </div>

      {/* Main content of message */}
      <div className="msg_content_preview">
        <h2>{message?.subject_line}</h2>

        {/* INSERT USER INFO */}
        <p id="msg_preview_name">{`${msgUser?.first_name} ${msgUser?.last_name}`}</p>

        {/* If the message is lengthy, truncate it */}
        {message?.content.length > 180 ? (
          <p>{`${message?.content.slice(0, 180)}...`}</p>
        ) : (
          <p>{message?.content}</p>
        )}
      </div>

      {/* Number of comments */}
      {commentNum ? (
        <div>
          <div className="num_comments_circle">{commentNum}</div>
        </div>
      ) : null}
    </NavLink>
  );
};

export default OneMessage;
