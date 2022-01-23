import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useParams } from "react-router-dom";
import { getAllTodos } from "../../../store/todo";
import "./PreviewMessages.css";

const PreviewMessages = ({ message }) => {
  let content;
  if (message?.content.length > 20) content = message?.content.slice(0, 20);
  else content = message?.content;
  return (
    <div>
      <h3 className="subject_line">{message?.subject_line}</h3>
      <p>{content}</p>
    </div>
  );
};

export default PreviewMessages;
