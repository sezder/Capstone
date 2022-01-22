import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getTodos } from "../../../store/todo";
import "./ShowMiniList.css";

const ShowMiniList = ({ list }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos(list?.id));
  }, [dispatch]);

  const tasks = useSelector((state) => state.todos);

  return (
    <div>
      <h3 key={`${list?.id}`}>{list?.title}</h3>
    </div>
  );
};

export default ShowMiniList;
