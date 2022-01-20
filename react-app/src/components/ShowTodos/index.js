// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useParams } from "react-router-dom";
// // import { getTodos } from "../../store/todos";
// import "./ShowTodos.css";

// const ShowTodos = () => {
//   const dispatch = useDispatch();
//   let { listId, projectId } = useParams();
//   listId = Number(listId);
//   projectId = Number(projectId);

//   // const [completion, changeCompletion] = useState(false)

//   const todos = useSelector((state) => state.lists);

//   useEffect(() => {
//     dispatch(getTodos(listId));
//   }, [dispatch, listId]);

//   const handleCheck = () => {
//     //dispatch completed status? Put request?
//   };

//   return (
//     <main>
//       {Object.values(todos).map((todo, idx) => (
//         <div key={idx}>
//           <input
//             type="checkbox"
//             name="completed"
//             onClick={handleCheck}
//             checked={todo?.completed}
//           ></input>
//           <h2>{todo?.task}</h2>
//           <p>{todo?.due}</p>

//           <NavLink to={`/projects/${projectId}/lists/${listId}/edit`}>
//             Edit
//           </NavLink>
//         </div>
//       ))}
//     </main>
//   );
// };

// export default ShowTodos;
