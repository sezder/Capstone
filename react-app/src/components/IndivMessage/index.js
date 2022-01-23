import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getComments } from "../../store/comment";
import { getMessages } from "../../store/message";
import EditMessage from "../EditMessage";
import "./IndivMessage.css";

const IndivMessage = () => {
  let { projectId, messageId } = useParams();
  projectId = Number(projectId);
  messageId = Number(messageId);

  const dispatch = useDispatch();

  const currMessage = useSelector((state) => state.messages?.[messageId]);
  const comments = useSelector((state) => state.comments);
  useEffect(() => {
    dispatch(getMessages(projectId));
    dispatch(getComments(messageId));
  }, [dispatch, messageId, projectId]);

  return (
    <main>
      <h1>{currMessage?.subject_line}</h1>
      <p>{currMessage?.content}</p>

      {Object.values(comments).map((comment, idx) => {
        return <div key={idx}>{comment?.content}</div>;
      })}
    </main>
  );
};

export default IndivMessage;
