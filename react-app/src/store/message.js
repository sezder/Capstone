// ~~~~~~~~~~~ Get all messages by project id ~~~~~~~~~~~
const GET_MESSAGES = "messages/GET_MESSAGES";

const loadMessages = (messages) => ({
  type: GET_MESSAGES,
  messages,
});

export const getMessages = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/messages/${projectId}`);
  if (res.ok) {
    const messages = await res.json();
    dispatch(loadMesages(messages));
    return messages;
  }
};

// ~~~~~~~~~~~ Create a new message ~~~~~~~~~~~
const ADD_MESSAGE = "messages/ADD_MESSAGE";

const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message,
});

export const createMessage =
  ({
    subjectLine: subject_line,
    content,
    projectId: project_id,
    creatorId: creator_id,
  }) =>
  async (dispatch) => {
    const res = await fetch(`/api/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject_line, content, project_id, creator_id }),
    });
    if (res.ok) {
      const message = await res.json();
      dispatch(addMessage(message));
      return message;
    }
  };

// ~~~~~~~~~~~ Update a messages ~~~~~~~~~~~
const UPDATE_MESSAGE = "messages/UPDATE_MESSAGE";

const loadEditedMessage = (message) => ({
  type: UPDATE_MESSAGE,
  message,
});

export const updateMessage =
  ({
    subjectLine: subject_line,
    content,
    projectId: project_id,
    creatorId: creator_id,
  }) =>
  async (dispatch) => {
    const res = await fetch(`/api/messages/${message_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject_line, content, project_id, creator_id }),
    });

    if (res.ok) {
      const message = await res.json();
      dispatch(loadEditedMessage(message));
      return message;
    }
  };

// ~~~~~~~~~~~ Delete a project ~~~~~~~~~~~
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

const loadDeletedMessage = (messageId) => ({
  type: DELETE_MESSAGE,
  messageId,
});

export const deleteMessage =
  ({ creatorId: creator_id, messageId: message_id, projectId: project_id }) =>
  async (dispatch) => {
    const res = await fetch(`/api/messages/${message_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creator_id, message_id, project_id }),
    });

    if (res.ok) {
      const messageId = await res.json();
      dispatch(loadDeletedMessage(messageId));
      return messageId;
    }
  };

// ~~~~~~~~~~~ Reducer ~~~~~~~~~~~
const initialState = {};
const messageReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_MESSAGES:
      action.messages.forEach((message) => {
        newState[message.id] = message;
      });
      return { ...newState };
    case ADD_MESSAGE:
      return { ...state, [action.message.id]: action.message };
    case UPDATE_MESSAGE:
      return { ...state, [action.message.id]: action.message };
    case DELETE_MESSAGE:
      newState = { ...state };
      delete newState[action.messageId];
      return { ...newState };
    default:
      return state;
  }
};

export default messageReducer;
