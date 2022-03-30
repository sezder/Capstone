import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { filterAssignments } from "../../helperFuncs";
import { getAllProjAssignments } from "../../store/projectAssignment";
import { getAllProjects } from "../../store/project";
import { getAllUsers } from "../../store/user";

import NewProject from "../NewProject";
import NavBar from "../NavBar";
import "./ShowProjects.css";

const ShowProjects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const assignments = useSelector((state) => state.projectAssignments);
  const users = useSelector((state) => state.users);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getAllProjAssignments());
    dispatch(getAllUsers());
  }, [dispatch]);

  // Nested navigation: projects
  const navLinks = (
    <ul className="nav">
      <li className="light_large curr_on">Projects</li>
      <li>
        {hidden ? (
          <button
            onClick={() => setHidden(!hidden)}
            className={!hidden ? "hidden" : "circular_button"}
          >
            <i className="fas fa-plus"></i>
          </button>
        ) : (
          <button
            onClick={() => setHidden(!hidden)}
            className={hidden ? "hidden" : "circular_button"}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </li>
    </ul>
  );

  return (
    <>
      <NavBar navLinks={navLinks} />
      <div className="projects_page_div">
        <div>
          <NewProject hidden={hidden} setHidden={setHidden} />
        </div>

        <main className="show_projects_main">
          {/* Grid with responsive cards */}
          <section className="cards">
            {/* Map through all of the projects */}
            {Object.values(projects).map((project, idx) => {
              // Filter all user assignments by project id
              const filteredUserAssignments = filterAssignments(
                project.id,
                assignments
              );

              return (
                // Display information about the project on a clickable card
                <NavLink
                  to={`/projects/${project?.id}`}
                  key={idx}
                  className="card"
                >
                  <div>
                    <h1>{project?.name}</h1>
                    <p>{project?.description}</p>
                  </div>

                  {/* Display users currently assigned to the project, if any */}
                  <div className="users_projects">
                    {filteredUserAssignments.length > 0 ? (
                      filteredUserAssignments.map((userId, idx) => {
                        const assignedUser = users[userId];
                        return (
                          <span key={idx}>
                            {assignedUser?.icon_url ? (
                              <img
                                className="user_circle"
                                src={assignedUser?.icon_url}
                                alt="User profile icon"
                              />
                            ) : (
                              <div className="user_circle initials_circle">
                                {`${assignedUser?.first_name[0]} 
                              ${assignedUser?.last_name[0]}`}
                              </div>
                            )}
                          </span>
                        );
                      })
                    ) : (
                      <button>Add People</button>
                    )}
                  </div>
                </NavLink>
              );
            })}
          </section>
        </main>
      </div>
    </>
  );
};

export default ShowProjects;
