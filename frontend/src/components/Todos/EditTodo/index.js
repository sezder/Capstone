import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, deleteTodo } from "../../../store/todo";
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
    <>
      <button onClick={() => setEditTodo(false)}>
        <i className="fas fa-times"></i>
      </button>
      <form onSubmit={handleSubmit} className="edit_todo_form">
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        )}

        <label htmlFor="task" className="hidden">
          Task
        </label>
        <input
          id="task"
          placeholder="Task"
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          spellCheck={true}
        ></input>

        <label htmlFor="date" className="hidden">
          Due date
        </label>
        <input
          id="date"
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        ></input>

        <div className="button_div">
          <button type="submit" disabled={errors.length > 0}>
            <i className="fas fa-check"></i>
          </button>

          <button onClick={handleDelete}>
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default EditTodo;
