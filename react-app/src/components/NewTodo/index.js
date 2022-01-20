import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../../store/todo";
import "./NewTodo.css";

const NewTodo = () => {
  let { projectId, listId } = useParams();
  projectId = Number(projectId);
  listId = Number(listId);

  const dispatch = useDispatch();

  const creatorId = useSelector((state) => state.session.user.id);

  const [task, setTask] = useState("");
  const [due, setDue] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!task?.length) errors.push("Task must not be blank.");
    if (!due?.length) errors.push("Provide a due date.");
    setErrors(errors);
  }, [task, due]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      task,
      listId,
      creatorId,
      completed: false,
      due,
    };
    dispatch(createTodo(todo));
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
        placeholder="Task"
        type="text"
        name="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required={true}
        spellCheck={true}
      ></input>

      <input
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
      ></input>

      <button type="submit" disabled={errors.length > 0}>
        Add
      </button>
    </form>
  );
};

export default NewTodo;
