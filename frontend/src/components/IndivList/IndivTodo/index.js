import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const IndivTodo = ({ todo }) => {
  const [completed, setCompleted] = useState(todo?.completed);

  const handleCheck = (e) => {
    
    setCompleted(!completed);
  };
  return (
    <section>
      <div key={`${todo?.id}`}>
        <input
          onChange={handleCheck}
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
