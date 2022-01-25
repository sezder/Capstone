import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLists } from "../../store/list";
import { getTodos } from "../../store/todo";
import IndivTodo from "./IndivTodo";
import "./IndivList.css";

const IndivList = () => {
  let { projectId, listId } = useParams();
  projectId = Number(projectId);
  listId = Number(listId);
  const [completed, setCompleted] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists(projectId));
    dispatch(getTodos(listId));
  }, [dispatch, listId, projectId]);

  const todos = useSelector((state) => state.todos);
  const todosArr = Object.values(todos);
  const currList = useSelector((state) => state.lists[listId]);

  const mappingTodos = todosArr.map((todo) => <IndivTodo todo={todo} />);

  const addTaskPrompt = (
    <div className="task_read_only">
      <input type="checkbox" className="checkbox" name="checkbox"></input>
      <label htmlFor="checkbox">Add a task...</label>
    </div>
  );

  return (
    <main>
      <h1 className="light_large">{currList?.title}</h1>
      <p>{currList?.description}</p>
      {todosArr.length ? <div>{mappingTodos}</div> : addTaskPrompt}
    </main>
  );
};

export default IndivList;
