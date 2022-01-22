import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getMessages } from "../../store/message";
import "./ShowMessages.css";

const ShowMessages = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    getMessages(projectId);
  }, [dispatch, projectId]);
  return (
    <main>
      <section className="cards">
        {Object.values(messages).map((message, idx) => {
          return (
            <NavLink
              key={idx}
              to={`/projects/${projectId}/messages/${message?.id}`}
            >
              <div className="card">
                <h2>{message?.subject_line}</h2>
                {/* INSERT USER INFO */}
                <p>{message?.content}</p>
              </div>
            </NavLink>
          );
        })}
      </section>
    </main>
  );
};

export default ShowMessages;
