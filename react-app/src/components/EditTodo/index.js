import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, getTodos, deleteTodo } from "../../store/todo";
import "./EditTodo.css";

const EditTodo = () => {
  let { projectId, listId, todoId } = useParams();
  projectId = Number(projectId);
  listId = Number(listId);
  todoId = Number(todoId);

  const dispatch = useDispatch();
  const history = useHistory();

  const creatorId = Number(useSelector((state) => state.session.user.id));
  const currTodo = useSelector((state) => state.todos?.[todoId]);

  const [task, setTask] = useState(currTodo?.task || "");
  const [due, setDue] = useState(currTodo?.due || "");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!task?.length) errors.push("Task must not be blank.");
    if (!due?.length) errors.push("Provide a due date.");
    setErrors(errors);
  }, [task, due]);

  useEffect(() => {
    dispatch(getTodos(listId));
  }, [dispatch, listId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      todoId,
      task,
      listId,
      creatorId,
      completed: currTodo?.completed,
      due,
    };
    dispatch(updateTodo(todo));
  };

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   const deletePayload = { creatorId, listId, projectId };
  //   const res = dispatch(deleteList(deletePayload));
  //   if (res) {
  //     history.push(`/projects/${projectId}/lists`);
  //   }
  // };

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
        Update
      </button>
    </form>
  );
};

export default EditTodo;
