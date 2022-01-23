// ~~~~~~~~~~~ Get all comments by comment id ~~~~~~~~~~~
const GET_COMMENTS = "comments/GET_COMMENTS";

const loadComments = (comments) => ({
  type: GET_COMMENTS,
  comments,
});

export const getComments = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`);
  if (res.ok) {
    const comments = await res.json();
    dispatch(loadComments(comments));
    return comments;
  }
};

// ~~~~~~~~~~~ Create a new comment ~~~~~~~~~~~
const ADD_COMMENT = "comments/ADD_COMMENT";

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

export const createComment =
  ({
    content,
    messageId: message_id,
    projectId: project_id,
    creatorId: creator_id,
  }) =>
  async (dispatch) => {
    const res = await fetch(`/api/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, message_id, project_id, creator_id }),
    });
    if (res.ok) {
      const comment = await res.json();
      dispatch(addComment(comment));
      return comment;
    }
  };

// ~~~~~~~~~~~ Update a comments ~~~~~~~~~~~
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";

const loadEditedcomment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

export const updateComment =
  ({
    content,
    messageId: message_id,
    commentId: comment_id,
    creatorId: creator_id,
  }) =>
  async (dispatch) => {
    const res = await fetch(`/api/comments/${comment_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, message_id, creator_id }),
    });

    if (res.ok) {
      const comment = await res.json();
      dispatch(loadEditedcomment(comment));
      return comment;
    }
  };

// ~~~~~~~~~~~ Delete a project ~~~~~~~~~~~
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const loadDeletedComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

export const deleteComment =
  ({ creatorId: creator_id, commentId: comment_id, projectId: project_id }) =>
  async (dispatch) => {
    const res = await fetch(`/api/comments/${comment_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creator_id, comment_id, project_id }),
    });

    if (res.ok) {
      const commentId = await res.json();
      dispatch(loadDeletedComment(commentId));
      return commentId;
    }
  };

// ~~~~~~~~~~~ Reducer ~~~~~~~~~~~
const initialState = {};
const commentReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_COMMENTS:
      action.comments.forEach((comment) => {
        newState[comment.id] = comment;
      });
      return { ...newState };
    case ADD_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case UPDATE_COMMENT:
      return { ...state, [action.comment.id]: action.comment };
    case DELETE_COMMENT:
      newState = { ...state };
      delete newState[action.commentId];
      return { ...newState };
    default:
      return state;
  }
};

export default commentReducer;
