import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getLists } from "../../store/list";
import { getTodos } from "../../store/todo";
import { getAllProjects } from "../../store/project";
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
    dispatch(getAllProjects());
  }, [dispatch, listId, projectId]);

  const todos = useSelector((state) => state.todos);
  const todosArr = Object.values(todos);
  const currList = useSelector((state) => state.lists[listId]);
  const currProject = useSelector((state) => state.projects[projectId]);

  const mappingTodos = todosArr.map((todo) => (
    <IndivTodo todo={todo} projectId={projectId} listId={listId} />
  ));

  const addTaskPrompt = (
    <div className="task_read_only">
      <input type="checkbox" className="checkbox" name="checkbox"></input>
      <label htmlFor="checkbox">Add a task...</label>
    </div>
  );

  return (
    <main>
      <div className="proj_nav" id="proj_nav_new_msg">
        <NavLink to={`/projects/${projectId}`}>
          <h2 className="light_large dynamic_underline">{currProject?.name}</h2>
        </NavLink>

        <i className="fas fa-caret-right fa-2x"></i>
        <NavLink to={`/projects/${projectId}/lists`}>
          <h2 className="light_large dynamic_underline">To-do Lists</h2>
        </NavLink>
        <i className="fas fa-caret-right fa-2x"></i>
        <h1 className="light_large">{currList?.title}</h1>
      </div>

      <p>{currList?.description}</p>
      {todosArr.length ? <div>{mappingTodos}</div> : addTaskPrompt}
    </main>
  );
};

export default IndivList;
