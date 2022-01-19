import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createProject, getAllProjects } from "../../store/project";
import "./ShowProjects.css";

const ShowProjects = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <main id="projects_grid">
      <section className="cards">
        {Object.values(projects).map((project, idx) => {
          return (
            <NavLink to={`/projects/${project?.id}`} key={idx}>
              <div className="card">
                <h1>{project?.name}</h1>
                <p>{project?.description}</p>
              </div>
            </NavLink>
          );
        })}
      </section>
    </main>
  );
};

export default ShowProjects;
