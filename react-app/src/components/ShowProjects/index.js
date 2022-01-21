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
                <h1>{project?.name}</h1>
                <p>{project?.description}</p>
            </NavLink>
          );
        })}
      </section>
    </main>
  );
};

export default ShowProjects;
