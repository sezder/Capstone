import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllProjects } from "../../store/project";
import { getLists } from "../../store/list";
import { getMessages } from "../../store/message";
import PreviewLists from "./PreviewLists";
import PreviewMessages from "./PreviewMessages";
import EditProject from "../EditProject";
import message_sent from "../images/message_sent.svg";
import checking_boxes from "../images/checking_boxes.svg";
import "./IndivProject.css";
import { getProjAssignments } from "../../store/projectAssignment";
import { getAllUsers } from "../../store/user";

const IndivProject = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProjects());
    dispatch(getLists(projectId));
    dispatch(getMessages(projectId));
    dispatch(getProjAssignments(projectId));
    dispatch(getAllUsers());
  }, [dispatch, projectId]);

  const [editProject, setEditProject] = useState(false);

  const currProject = useSelector((state) => state.projects?.[projectId]);
  const lists = useSelector((state) => state.lists);
  let listArr = Object.values(lists);
  if (listArr.length > 3) listArr = listArr.slice(0, 3);

  const messages = useSelector((state) => state.messages);
  let msgsArr = Object.values(messages);
  if (msgsArr.length > 3) msgsArr = msgsArr.slice(0, 3);

  const assignments = useSelector((state) => state.projectAssignments);
  const assignmentsArr = Object.values(assignments);
  const users = useSelector((state) => state.users);

  const previewMsgs = msgsArr.map((message) => {
    return <PreviewMessages key={message?.id} message={message} />;
  });

  const previewTodos = listArr.map((list) => (
    <PreviewLists key={list?.id} list={list} />
  ));

  return (
    <main className="indiv_project_page">
      {editProject ? (
        <EditProject
          editProject={editProject}
          setEditProject={setEditProject}
          projectId={projectId}
          currProject={currProject}
        />
      ) : (
        <>
          <div className="edit_ellipsis_div">
            <h1 className="light_large">{currProject?.name}</h1>
            <button
              title="Toggle new project form"
              id="ellipsis_btn"
              onClick={() => setEditProject(!editProject)}
              className={editProject ? "hidden" : "edit_project_btn"}
            >
              <i className="fas fa-ellipsis-h fa-lg"></i>
            </button>
          </div>
          <p>{currProject?.description}</p>
        </>
      )}

      {/* Membership */}
      <div className="users_projects_div">
        <div className="users_projects">
          {assignmentsArr.length > 0 ? (
            assignmentsArr.map(({ user_id: userId }, idx) => {
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
            <></>
          )}
        </div>

        <NavLink to={`/projects/${projectId}/people`}>
          <button>Add People</button>
        </NavLink>
      </div>

      {/* Preview recent messages */}
      <div className="messages_lists_div">
        <NavLink to={`/projects/${projectId}/messages`}>
          <section id="messages_preview">
            <h2 className="light_medium">Message Board</h2>
            {msgsArr.length > 0 ? (
              previewMsgs
            ) : (
              <img
                src={message_sent}
                id="message_sent"
                alt="Graphic of man next to email."
              ></img>
            )}
          </section>
        </NavLink>

        {/* Preview recent todos */}
        <NavLink to={`/projects/${projectId}/lists`}>
          <section>
            <h2 className="light_medium">Recent To-dos</h2>
            {listArr.length > 0 ? (
              previewTodos
            ) : (
              <img
                src={checking_boxes}
                id="checking_boxes"
                alt="Man next to completed and partially completed todos."
              ></img>
            )}
          </section>
        </NavLink>
      </div>
    </main>
  );
};

export default IndivProject;
