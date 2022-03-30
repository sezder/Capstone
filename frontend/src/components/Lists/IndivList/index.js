import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";


import { getLists } from "../../../store/list";
import {getTodos} from "../../../store/todo";
import { getAllProjects } from "../../../store/project";
import IndivTodo from "./IndivTodo";
import EditList from "../EditList"
import NewTodo from "../../Todos/NewTodo";
import NavBar from "../../Layout/NavBar";
import accept_tasks from "../../images/accept_tasks.svg";
import "./IndivList.css";

const IndivList = () => {
  let { projectId, listId } = useParams();
  projectId = Number(projectId);
  listId = Number(listId);
  const [editList, setEditList] = useState(false);
  const [addTodo, setAddTodo] = useState(false);

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
    <IndivTodo
      todo={todo}
      projectId={projectId}
      listId={listId}
      key={todo?.id}
    />
  ));

  const navLinks = (
    <ul className="nav">
      <li>
        <NavLink to="/projects">
          <i className="fas fa-home fa-lg"></i>
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li>
        <NavLink
          to={`/projects/${currProject?.id}`}
          className="light_large dynamic_underline"
        >
          {currProject?.name}
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li>
        <NavLink
          to={`/projects/${currProject?.id}/lists`}
          className="dynamic_underline light_large"
        >
          To-do Lists
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li className="curr_on light_large">
        {currList?.title.length > 15
          ? `${currList?.title.slice(0, 15)}...`
          : currList?.title}
      </li>
      <li>
        {editList ? (
          <button
            onClick={() => setEditList(false)}
            className="circular_button"
          >
            <i className="fas fa-times"></i>
          </button>
        ) : (
          <button
            title="Toggle edit message form"
            onClick={() => setEditList(!editList)}
            className={editList ? "hidden" : "circular_button"}
          >
            <i className="fas fa-ellipsis-h fa-lg"></i>
          </button>
        )}
      </li>
    </ul>
  );

  return (
    <>
      <NavBar navLinks={navLinks} />
      <main>
       
        {editList ? (
          <EditList
            currList={currList}
            editList={editList}
            setEditList={setEditList}
            projectId={projectId}
            listId={listId}
          />
        ) : (
          <>
            <div className="list_title_edit">
              <h1 className="light_large">{currList?.title}</h1>
            </div>
            <p>{currList?.description}</p>
          </>
        )}
        {todosArr.length > 0 ? (
          mappingTodos
        ) : (
          <section id="no_tasks_placeholder_section">
            <h2>Add the first todo...</h2>
            <img
              src={accept_tasks}
              id="accept_tasks"
              alt="Graphic of individual checking off a task from a list."
            ></img>
          </section>
        )}
        <section className="todo_section" id="new_todo">
          {addTodo ? (
            <NewTodo
              listId={listId}
              setAddTodo={setAddTodo}
              addTodo={addTodo}
            />
          ) : (
            <div
              className="new_todo_div"
              onClick={() => {
                setAddTodo(!addTodo);
              }}
            >
              <i className="fas fa-plus" id="gray_plus"></i>
              <p>Add a new todo...</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default IndivList;
