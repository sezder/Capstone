import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllTodos } from "../../store/todo";
import { getLists } from "../../store/list";
import "./ShowLists.css";
import NewList from "../NewList";
import PreviewTodos from "./PreviewTodos";
import { getAllProjects } from "../../store/project";

const ShowLists = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);
  const dispatch = useDispatch();

  const lists = useSelector((state) => state.lists);
  const currProject = useSelector((state) => state.projects[projectId]);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    dispatch(getAllTodos());
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLists(projectId));
  }, [dispatch, projectId]);
  return (
    <div className="projects_page_div">
      <div>
        <NewList hidden={hidden} setHidden={setHidden} />
      </div>

      <main>
        <button
          onClick={() => setHidden(!hidden)}
          className={
            !hidden ? "hidden" : "circular_button toggle_project_sidebar"
          }
        >
          <i class="fas fa-plus"></i>
        </button>

        <NavLink to={`/projects/${projectId}`}>
          <h1 className="light_large dynamic_underline">{currProject?.name}</h1>
        </NavLink>
        <section className="cards">
        
          {Object.values(lists).map((list, idx) => {
            return (
              <NavLink
                to={`/projects/${projectId}/lists/${list?.id}`}
                key={idx}
                className="card"
              >
                <div>
                  <h1>{list?.title}</h1>
                  <p>{list?.description}</p>

                  <PreviewTodos list={list} />
                </div>
              </NavLink>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default ShowLists;
