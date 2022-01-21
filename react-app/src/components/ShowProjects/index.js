import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllProjects } from "../../store/project";
import "./ShowProjects.css";

const ShowProjects = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <main>
      <section className="cards">
        {Object.values(projects).map((project, idx) => {
          return (
            <NavLink to={`/projects/${project?.id}`} key={idx} className="card">
              <div>
                <h1>{project?.name}</h1>
                <p>{project?.description}</p>
              </div>

              <div className="users_projects">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </NavLink>
          );
        })}
      </section>
    </main>
  );
};

export default ShowProjects;
