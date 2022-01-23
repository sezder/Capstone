import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTodos, updateTodo } from "../../store/todo";
import "./ShowTodos.css";

const ShowTodos = () => {
  const dispatch = useDispatch();
  let { listId, projectId } = useParams();
  listId = Number(listId);
  projectId = Number(projectId);

  const creatorId = Number(useSelector((state) => state.session.user.id));
  const todos = useSelector((state) => state.todos);
  const [completed, setCompleted] = useState([ 1, 3, 6]);

  useEffect(() => {
    dispatch(getTodos(listId));
  }, [dispatch, listId]);

  const toggleCheck = (e, todoId, task, completed, due) => {
    e.preventDefault();
    const todo = {
      todoId,
      task,
      listId,
      creatorId,
      completed,
      due,
    };
    dispatch(updateTodo(todo));
  };

  return (
    <main>
      {Object.values(todos).map((todo, idx) => (
        <div key={idx}>
          {/* <input
            type="checkbox"
            name="completed"
            onChange={(e) =>
              toggleCheck(
                e,
                todo?.id,
                todo?.task,
                todo?.list_id,
                todo?.completed,
                todo?.due
              )
            }
            checked={todo?.completed}
          ></input>
          <h2>{todo?.task}</h2>
          <p>{todo?.due}</p>

          <NavLink to={`/projects/${projectId}/lists/${listId}/edit`}>
            Edit
          </NavLink> */}
        </div>
      ))}
    </main>
  );
};

export default ShowTodos;

/* 
What's the issue: 
Goal: I'd like to be able to change both the date and the completion status 
for a given task within mapping through the tasks.

Subtasks: 
1. I want completed tasks to be a the bottom of the list, pref crossed out via CSS or grayed out
2. I want the checkbox (a put request) to not be connected to a submit button, just to be instant
    - that entails an onChange or onClick that dispatches the put thunk
    - to dispatch the put request, it expects all the data (maybe a diff thunk??/backend route?)
    - define the thunk inline? don't do it separately?
3. I want the due date change to also be a put request

I was having issues with using the put thunk I already have.
It expects all the possible data, but in reality, it's only changing the task and completion date

But I can do sep thunks for changing just the completion staus
I can do a sep thunk for the date?

These thunks would require an id, which would only be present within the context of the map func
    - either define thunk dispatch inline
    - or feed the id into the thunk invocation as a param

 With this technique, it would be good to modify my other put thunk so that only the info it changes 
 gets sent. 
*/
