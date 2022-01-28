import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../../store/todo";
import EditTodo from "../../EditTodo";
import "./IndivTodo.css";

const IndivTodo = ({ todo, projectId, listId }) => {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(todo?.completed);
  const [editTodo, setEditTodo] = useState(false);

  const handleCheck = (completionStatus) => {
    const todoPayload = {
      todoId: todo?.id,
      task: todo?.task,
      listId: todo?.list_id,
      creatorId: todo?.creator_id,
      completed: completionStatus,
      due: todo?.due,
    };
    dispatch(updateTodo(todoPayload));
  };

  return (
    <section className="todo_section" key={`${todo?.id}`}>
      {/* Checkbox updates database on click */}
      <input
        onClick={(e) => {
          setCompleted(!completed);
          handleCheck(!completed);
        }}
        type="checkbox"
        defaultChecked={completed}
        className="checkbox"
        name="checkbox"
      ></input>

      {/* Either render an edit form or the details about the todo */}
      {editTodo ? (
        <EditTodo
          todo={todo}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          projectId={projectId}
          listId={listId}
        />
      ) : (
        <>
          <label htmlFor="checkbox" onClick={() => setEditTodo(!editTodo)}>
            {todo?.task}
          </label>
          <i
            className="far fa-calendar"
            onClick={() => setEditTodo(!editTodo)}
          ></i>
        </>
      )}
    </section>
  );
};

export default IndivTodo;
