import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getComments } from "../../store/comment";
import { getMessages } from "../../store/message";
import { getAllProjects } from "../../store/project";
import EditMessage from "../EditMessage";
import EditComment from "../EditComment";
import NewComment from "../NewComment";
import "./IndivMessage.css";
import NavBar from "../NavBar";

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
  const [editComment, setEditComment] = useState(null);

  useEffect(() => {
    dispatch(getMessages(projectId));
    dispatch(getComments(messageId));
    dispatch(getAllProjects());
  }, [dispatch, messageId, projectId]);

  const navLinks = (
    <ul className="nav">
      <li>
        <NavLink to="/projects">
          <i className="fas fa-home fa-lg"></i>
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li>
        <NavLink
          to={`/projects/${currProject?.id}`}
          className="light_large dynamic_underline"
        >
          {currProject?.name}
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li>
        <NavLink
          to={`/projects/${currProject?.id}/messages`}
          className="dynamic_underline light_large"
        >
          Messages
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li className="curr_on light_large">
        {currMessage?.subject_line.length > 15
          ? `${currMessage?.subject_line.slice(0, 15)}...`
          : currMessage?.subject_line}
      </li>
      <li>
        {currUserId === currMessage?.creator_id && editMessage ? (
          <button
            onClick={() => setEditMessage(false)}
            className="circular_button"
          >
            <i className="fas fa-times"></i>
          </button>
        ) : (
          <button
            title="Toggle edit message form"
            onClick={() => setEditMessage(!editMessage)}
            className={editMessage ? "hidden" : "circular_button"}
          >
            <i className="fas fa-ellipsis-h fa-lg"></i>
          </button>
        )}
      </li>
    </ul>
  );

  return (
    <>
      <NavBar navLinks={navLinks} />
      <main id="indiv_msg_main">
        {/* Message content or form to edit message */}
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
              <div className="msg_author_info">
                <div className="user_circle"></div>
                <h2>name</h2>
              </div>
              <p>{currMessage?.content}</p>
            </div>
          )}
        </section>

        <section className="comment_section">
          <NewComment messageId={messageId} creatorId={creatorId} />
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
                  <button
                    id="#only_icon_btn"
                    onClick={() => setEditComment(comment?.id)}
                    className={editComment === comment?.id ? "hidden" : null}
                  >
                    <i className="fas fa-ellipsis-h fa-lg"></i>
                  </button>
                ) : (
                  <div></div>
                )}
              </div>

              {/* If editComment's value matches the id of the current comment */}
              {editComment === comment?.id ? (
                <EditComment
                  editComment={editComment}
                  setEditComment={setEditComment}
                  currComment={comment}
                  creatorId={creatorId}
                  messageId={messageId}
                  projectId={projectId}
                />
              ) : (
                <div>{comment?.content}</div>
              )}
            </section>
          );
        })}
      </main>
    </>
  );
};

export default IndivMessage;
