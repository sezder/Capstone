import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateList, getLists, deleteList } from "../../store/list";
import "./EditList.css";

const EditList = () => {
  let { projectId, listId } = useParams();
  projectId = Number(projectId);
  listId = Number(listId);

  const dispatch = useDispatch();
  const history = useHistory();

  const creatorId = Number(useSelector((state) => state.session.user.id));
  const currList = useSelector((state) => state.lists?.[listId]);

  const [title, setTitle] = useState(currList?.title || "");
  const [description, setDescription] = useState(currList?.description || "");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getLists(projectId));
  }, [dispatch, projectId]);

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
      listId,
    };
    const res = dispatch(updateList(list));
    if (res) {
      history.push(`/projects/${projectId}/lists`);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { creatorId, listId, projectId };
    const res = dispatch(deleteList(deletePayload));
    if (res) {
      history.push(`/projects/${projectId}/lists`);
    }
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

export default EditList;
