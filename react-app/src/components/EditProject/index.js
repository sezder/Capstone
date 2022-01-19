import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateProject, getAllProjects } from "../../store/project";
import "./EditProject.css";

const EditProject = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);
  const dispatch = useDispatch();

  let creatorId = Number(useSelector((state) => state.session.user?.id));
  const currProject = useSelector((state) => state.projects?.[projectId]);

  const [name, setName] = useState(currProject?.name || "");
  const [description, setDescription] = useState(
    currProject?.description || ""
  );
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    const errors = [];
    if (!name?.length) errors.push("Provide a project name.");
    setErrors(errors);
  }, [name]);

  const handleSubmit = () => {
    const project = {
      name,
      description,
      creatorId,
      projectId,
    };
    dispatch(updateProject(project));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        )}
      </div>

      <input
        placeholder="Name"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required={true}
        spellCheck={true}
      ></input>

      <textarea
        placeholder="Description (optional)"
        type="text"
        name="description"
        value={description}
        spellCheck={true}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button type="submit" disabled={errors.length > 0}>
        Update
      </button>
    </form>
  );
};

export default EditProject;
