import React from "react";
import "./ProjectAssignments.css";
import Search from "../Search";
import { useParams } from "react-router-dom";

const ProjectAssignments = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);


  return (
    <div>
      <Search projectId={projectId}/>
    </div>
  );
};

export default ProjectAssignments;
