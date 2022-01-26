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
import { formatInitials, formatName } from "../../helperFuncs";

const ProjectAssignments = () => {
  const dispatch = useDispatch();
  let { projectId } = useParams();
  projectId = Number(projectId);
  console.log(projectId, 'projId in nums')

  useEffect(() => {
    dispatch(getProjAssignments(projectId));
    dispatch(getAllUsers());
  }, [dispatch, projectId]);

  const allUsers = useSelector((state) => state.users);
  const assignedUsers = useSelector((state) => state.projectAssignments);
  const assignedUsersArr = Object.values(assignedUsers);

  const mappedAssignments = assignedUsersArr.length && assignedUsersArr.map((assignment) => {
    const currAssignedUser = allUsers[assignment?.user_id];
    console.log(assignment?.id, 'assignmetn ID')
    console.log(currAssignedUser, 'currAssignedUser');
    return (
      <div key={assignment.id} className="user_card_div">
        {currAssignedUser?.icon_url ? (
          <img
            className="user_circle"
            src={currAssignedUser?.icon_url}
            alt="user profile photo"
          />
        ) : (
          <div className="user_circle initials_circle">
            {formatInitials(
              currAssignedUser?.first_name,
              currAssignedUser?.last_name
            )}
          </div>
        )}

        <div>
          <p>
            {formatName(
              currAssignedUser.first_name,
              currAssignedUser.last_name
            )}
          </p>
          <p>{currAssignedUser.job_title}</p>
        </div>
        <button onClick={(e) => handleRemoveUser(e, assignment.id)}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    );
  });

  const handleRemoveUser = (e, assignmentId) => {
    e.preventDefault();
    dispatch(deleteAssignment({assignmentId}));
  };

  return (
    <main>
      <Search projectId={projectId} />
      {assignedUsersArr.length > 0 ? (
        <ul>{mappedAssignments}</ul>
      ) : (
        <p>Add the first user to this project...</p>
      )}
    </main>
  );
};

export default ProjectAssignments;
