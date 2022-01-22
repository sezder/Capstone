import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
// import { getAllTodos } from "../../../store/todo";
import "./ShowMiniList.css";

const ShowMiniList = ({ list }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllTodos());
  }, [dispatch]);

  const tasks = useSelector((state) => state.todos);
  const tasksByList = Object.values(tasks).filter(
    (task) => task?.list_id === list?.id
  );

  return (
    <div>
      <h3 key={`${list?.id}`}>{list?.title}</h3>
    </div>
  );
};

export default ShowMiniList;
