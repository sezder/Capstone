import React, { useEffect } from "react";
import "./ProjectAssignments.css";
import Search from "../Search";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjAssignments,
  deleteAssignment,
} from "../../store/projectAssignment";
import { getAllUsers } from "../../store/user";
import NavBar from "../NavBar";

const ProjectAssignments = () => {
  const dispatch = useDispatch();
  let { projectId } = useParams();
  projectId = Number(projectId);

  useEffect(() => {
    dispatch(getProjAssignments(projectId));
    dispatch(getAllUsers());
  }, [dispatch, projectId]);

  const allUsers = useSelector((state) => state.users);
  const assignedUsers = useSelector((state) => state.projectAssignments);
  const assignedUsersArr = Object.values(assignedUsers);

  const mappedAssignments =
    assignedUsersArr.length &&
    assignedUsersArr.map((assignment) => {
      const currAssignedUser = allUsers[assignment?.user_id];
      return (
        <div key={assignment.id} className="user_card_div">
          <span>
            {currAssignedUser?.icon_url ? (
              <img
                className="user_circle"
                src={currAssignedUser?.icon_url}
                alt="User profile icon"
              />
            ) : (
              <div className="user_circle initials_circle">
                {`${currAssignedUser?.first_name[0]}
              ${currAssignedUser?.last_name[0]}`}
              </div>
            )}

            <div>
              <p>
                {`${currAssignedUser?.first_name}
              ${currAssignedUser?.last_name}`}
              </p>
              <p>{currAssignedUser?.job_title}</p>
            </div>
          </span>
          <button onClick={(e) => handleRemoveUser(e, assignment.id)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      );
    });

  const handleRemoveUser = (e, assignmentId) => {
    e.preventDefault();
    dispatch(deleteAssignment({ assignmentId }));
  };

  return (
    <>
      <NavBar />
      <main id="proj_assignment_main">
        <Search projectId={projectId} />
        {assignedUsersArr.length > 0 ? (
          <ul className="display_users">
            <h2 className="light_large">Currently Assigned</h2>
            {mappedAssignments}
          </ul>
        ) : (
          <p>Add the first user to this project...</p>
        )}
      </main>
    </>
  );
};

export default ProjectAssignments;
