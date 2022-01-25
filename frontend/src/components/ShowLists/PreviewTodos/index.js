import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllTodos } from "../../../store/todo";

const PreviewTodos = ({ list }) => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  let todosByList = Object.values(todos).filter(
    (todo) => todo?.list_id === list?.id
  );

  if (todosByList.length > 5) todosByList = todosByList.slice(0, 5);

  const mappingTodos = todosByList.map((todo) => (
    <span key={`${todo?.id}`} className="task_read_only">
      <input
        type="checkbox"
        checked={todo?.completed}
        className="checkbox"
        name="checkbox"
        readOnly={true}
      ></input>
      <label htmlFor="checkbox">{todo?.task}</label>
    </span>
  ));

  const addTaskPrompt = (
    <span className="task_read_only">
      <input type="checkbox" className="checkbox" name="checkbox"></input>
      <label htmlFor="checkbox">Add a task...</label>
    </span>
  );

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  return <section>{todosByList.length ? mappingTodos : addTaskPrompt}</section>;
};

export default PreviewTodos;
