import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useParams } from "react-router-dom";
import { getAllTodos } from "../../../../store/todo";
import "./PreviewLists.css";

const PreviewLists = ({ list }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  const todos = useSelector((state) => state.todos);
  const todosByList = Object.values(todos).filter(
    (todo) => todo?.list_id === list?.id
  );

  const mappingTodos = todosByList.map((todo) => (
    <div key={`${todo?.id}`} className="task_read_only">
      <input
        type="checkbox"
        checked={todo?.completed}
        className="checkbox"
        name="checkbox"
        readOnly={true}
      ></input>
      <label htmlFor="checkbox">{todo?.task}</label>
    </div>
  ));

  const addTaskPrompt = (
    <div className="task_read_only">
      <input
        type="checkbox"
        className="checkbox"
        name="checkbox"
      ></input>
      <label htmlFor="checkbox">Add a task...</label>
    </div>
  );

  return (
    <div>
      <h3 key={`${list?.id}`} id="list_title">{list?.title}</h3>
      {todosByList.length ? mappingTodos : addTaskPrompt}
    </div>
  );
};

export default PreviewLists
