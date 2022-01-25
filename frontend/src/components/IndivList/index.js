import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLists } from "../../store/list";
import { getTodos } from "../../store/todo";
import "./IndivList.css";

const IndivList = () => {
  // let { projectId, listId } = useParams();
  // projectId = Number(projectId);
  // listId = Number(listId);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getLists(projectId));
  //   dispatch(getTodos(listId));
  // }, [dispatch, listId]);

  // const todos = useSelector((state) => state.todos);
  // const currList = useSelector((state) => state.lists[listId]);

  return (
    <main>
      {/* <h1 className="light_large">{currList?.title}</h1> */}
      <div></div>
    </main>
  );
};

export default IndivList;
