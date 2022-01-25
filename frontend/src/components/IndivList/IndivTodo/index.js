import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../../../store/todo";

const IndivTodo = ({ todo }) => {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(todo?.completed);

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
    <section>
      <div key={`${todo?.id}`}>
        <input
          onClick={(e) => {
            setCompleted(!completed);
            handleCheck(!completed);
          }}
          type="checkbox"
          checked={completed}
          className="checkbox"
          name="checkbox"
        ></input>
        <label htmlFor="checkbox">{todo?.task}</label>
      </div>
    </section>
  );
};

export default IndivTodo;
