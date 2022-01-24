import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getComments } from "../../store/comment";
import { getMessages } from "../../store/message";
import { getAllProjects } from "../../store/project";
import EditMessage from "../EditMessage";
import "./IndivMessage.css";

const IndivMessage = () => {
  let { projectId, messageId } = useParams();
  projectId = Number(projectId);
  messageId = Number(messageId);

  const dispatch = useDispatch();

  const currMessage = useSelector((state) => state.messages?.[messageId]);
  const creatorId = currMessage?.creator_id;
  const comments = useSelector((state) => state.comments);
  const currProject = useSelector((state) => state.projects[projectId]);
  const currUserId = useSelector((state) => state.session.user.id);

  const [editMessage, setEditMessage] = useState(false);
  // const [showCommentControls, setShowCommentControls] = useState();

  useEffect(() => {
    dispatch(getMessages(projectId));
    dispatch(getComments(messageId));
    dispatch(getAllProjects());
  }, [dispatch, messageId, projectId]);

  return (
    <main id="indiv_msg_main">
      <div className="proj_nav">
        <NavLink to={`/projects/${projectId}`}>
          <h2 className="light_large dynamic_underline">{currProject?.name}</h2>
        </NavLink>

        <i className="fas fa-caret-right fa-2x"></i>
        <NavLink to={`/projects/${projectId}/messages`}>
          <h2 className="light_large dynamic_underline">Message Board</h2>
        </NavLink>
      </div>

      {/* Message Content */}
      <section>
        {editMessage ? (
          <EditMessage
            editMessage={editMessage}
            setEditMessage={setEditMessage}
            currMessage={currMessage}
            creatorId={creatorId}
          />
        ) : (
          <div>
            <h1 className="dark_large">{currMessage?.subject_line}</h1>
            {currUserId === currMessage?.creator_id && (
              <button
                id="ellipsis_btn"
                onClick={() => setEditMessage(!editMessage)}
                className={editMessage ? "hidden" : null}
              >
                <i className="fas fa-ellipsis-h fa-lg"></i>
              </button>
            )}

            {/* Position absolutely to be in top corner of box */}
            <div className="msg_author_info">
              <div className="user_circle"></div>
              <h2>name</h2>
            </div>
            <p>{currMessage?.content}</p>
          </div>
        )}
      </section>

      {/* Conditionally render add button */}

      {/* Comments */}
      {Object.values(comments).map((comment, idx) => {
        return (
          <section className="comment_section" key={idx}>
            <div className="comment_user_header">
              {/* Name and icon  */}
              <div>
                <div className="user_circle"></div>
                <p>name</p>
              </div>

              {currUserId === comment?.creator_id ? (
                <button id="ellipsis_btn">
                  <i className="fas fa-ellipsis-h fa-lg"></i>
                </button>
              ) : (
                <div></div>
              )}
            </div>

            <div>{comment?.content}</div>
          </section>
        );
      })}
    </main>
  );
};

export default IndivMessage;
