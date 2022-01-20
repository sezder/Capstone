import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  updateProject,
  getAllProjects,
  deleteProject,
} from "../../store/project";
import "./EditProject.css";

const EditProject = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const project = {
      name,
      description,
      creatorId,
      projectId,
    };

    const res = dispatch(updateProject(project));
    if (res) {
      history.push("/projects");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { creatorId, projectId };
    const res = dispatch(deleteProject(deletePayload));
    if (res) {
      history.push("/projects");
    }
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

      <button onClick={handleDelete}>
        <i className="far fa-trash-alt"></i>
      </button>
    </form>
  );
};

export default EditProject;
