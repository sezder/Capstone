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
    e.preventDefault()
    const project = {
      name,
      description,
      creator_id: creatorId,
    };
    dispatch(createProject(project));
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <ul>
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
        Add
      </button>
    </form>
  );
};

export default NewProject;
