import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../store/project";
import "./NewProject.css";

const NewProject = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const creatorId = useSelector((state) => state.session.user?.id);

  useEffect(() => {
    const errors = [];
    if (!name?.length) errors.push("Provide a project name.");
    setErrors(errors);
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const project = {
      name,
      description,
      creator_id: creatorId,
    };
    dispatch(createProject(project));
  };

  return (
    <form onSubmit={handleSubmit} className="new_project_form">
      <div className="card" id="new_project_card">
        <h2 className="light_large">New Project</h2>

        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        )}

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
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </form>
  );
};

export default NewProject;
