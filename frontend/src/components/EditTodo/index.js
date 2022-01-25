import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, getTodos, deleteTodo } from "../../store/todo";
import "./EditTodo.css";

const EditTodo = ({ todo, editTodo, setEditTodo, projectId, listId }) => {
  const dispatch = useDispatch();
  const creatorId = Number(useSelector((state) => state.session.user.id));

  const [task, setTask] = useState(todo?.task || "");
  const [due, setDue] = useState(todo?.due || "");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!task?.length) errors.push("Task must not be blank.");
    if (!due?.length) errors.push("Provide a due date.");
    setErrors(errors);
  }, [task, due]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoPayload = {
      todoId: todo?.id,
      task,
      listId,
      creatorId,
      completed: todo?.completed,
      due,
    };
    dispatch(updateTodo(todoPayload));
    setEditTodo(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { creatorId, todoId: todo?.id };
    dispatch(deleteTodo(deletePayload));
    setEditTodo(false);
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
      <div className="button_div">
        <button type="submit" disabled={errors.length > 0}>
          <i class="fas fa-check"></i>
        </button>

        <button onClick={handleDelete}>
          <i className="far fa-trash-alt"></i>
        </button>

        <button onClick={() => setEditTodo(false)}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </form>
  );
};

export default EditTodo;
