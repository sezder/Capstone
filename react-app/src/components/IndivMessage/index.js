import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getMessages } from "../../store/message";
import EditMessage from "../components/EditMessage";
import "./IndivMessage.css";

const IndivMessage = () => {
  let { projectId, messageId } = useParams();
  projectId = Number(projectId);
  messageId = Number(messageId);

  const dispatch = useDispatch();

  const currMessage = useSelector((state) => state.messages?.[messageId]);
  // get all co,ments by message
  useEffect(() => {
    dispatch(getMessages(messageId));
    // dispatch getComments
  }, [dispatch, messageId]);

  return (
    <main>
      <h1>{currMessage?.subject_line}</h1>
      <p>{currMessage?.content}</p>

      {/* Map through comments */}
    </main>
  );
};

export default IndivMessage;
