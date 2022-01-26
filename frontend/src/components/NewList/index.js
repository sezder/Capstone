import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../../store/list";
import "./NewList.css";

const NewList = ({ hidden, setHidden }) => {
  let { projectId } = useParams();
  projectId = Number(projectId);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const creatorId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    const errors = [];
    if (!title?.length) errors.push("Provide a title for the list.");
    if (title?.length > 50)
      errors.push("List title must not be more than 50 characters.");
    setErrors(errors);
  }, [title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const list = {
      title,
      description,
      projectId,
      creatorId,
    };
    dispatch(createList(list));
    setHidden(true);
    setTitle("");
    setDescription("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={hidden ? "hidden" : "new_project_form"}
    >
      <div className="card" id="new_project_card">
        <h2 className="light_large">New List</h2>
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        )}

        <input
          placeholder="List Title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          rows="5"
        ></textarea>

        <div>
          <button type="submit" disabled={errors.length > 0}>
            <i className="fas fa-plus"></i>
          </button>
          <button onClick={() => setHidden(!hidden)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewList;
