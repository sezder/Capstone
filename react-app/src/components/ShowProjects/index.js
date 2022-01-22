import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllProjects } from "../../store/project";
import NewProject from "../NewProject";
import "./ShowProjects.css";

const ShowProjects = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projects);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <div className="projects_page_div">
      <div>
        <NewProject hidden={hidden} setHidden={setHidden} />
      </div>

      <main>
        {/* Toggle the add project sidebar */}
        <button
          onClick={() => setHidden(!hidden)}
          className={!hidden ? "hidden" : "circular_button toggle_project_sidebar"}
        >
          <i class="fas fa-plus"></i>
        </button>

        {/* Grid with responsive cards */}
        <section className="cards">
          {Object.values(projects).map((project, idx) => {
            return (
              <NavLink
                to={`/projects/${project?.id}`}
                key={idx}
                className="card"
              >
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
    </div>
  );
};

export default ShowProjects;
