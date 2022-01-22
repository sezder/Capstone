import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllProjects } from "../../store/project";
import { getLists } from "../../store/list";
import EditProject from "../EditProject";
import ShowMiniList from "./ShowMiniList";
import "./IndivProject.css";

const IndivProject = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getLists(projectId));
  }, [dispatch, projectId]);

  const currProject = useSelector((state) => state.projects?.[projectId]);
  const lists = useSelector((state) => state.lists);
  console.log(lists, "lists");

  return (
    <main className="indiv_project_page">
      <h1 className="light_large">{currProject?.name}</h1>
      <p>{currProject?.description}</p>

      {/* Membership */}
      <div className="users_projects_div">
        <div className="user_circle"></div>
        <div className="user_circle"></div>
        <div className="user_circle"></div>
        <button>Add People</button>
      </div>

      <div className="messages_lists_div">
        <NavLink to={`/projects/${projectId}/messages`}>
          <section>
            <h2 className="light_medium">Message Board</h2>
          </section>
        </NavLink>

        <NavLink to={`/projects/${projectId}/lists`}>
          <section>
            <h2 className="light_medium">To-do Lists</h2>
            {Object.values(lists).map((list) => (
              <ShowMiniList key={list?.id} list={list} />
            ))}
          </section>
        </NavLink>
      </div>
    </main>
  );
};

export default IndivProject;
