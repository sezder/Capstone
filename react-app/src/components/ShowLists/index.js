import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllTodos } from "../../store/todo";
import { getLists } from "../../store/list";
import "./ShowLists.css";
import PreviewTodos from "./PreviewTodos";

const ShowLists = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);
  const dispatch = useDispatch();

  const lists = useSelector((state) => state.lists);

  
  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLists(projectId));
  }, [dispatch, projectId]);
  return (
    <main id="lists_grid">
      <section className="cards">
        {Object.values(lists).map((list, idx) => {
          return (
            <NavLink
              to={`/projects/${projectId}/lists/${list?.id}`}
              key={idx}
              className="card"
            >
              <div>
                <h1>{list?.title}</h1>
                <p>{list?.description}</p>

                <PreviewTodos list={list}/>
              </div>
            </NavLink>
          );
        })}
      </section>
    </main>
  );
};

export default ShowLists;
