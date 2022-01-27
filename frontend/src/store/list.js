// ~~~~~~~~~~~ Get all lists by project id ~~~~~~~~~~~
const GET_LISTS = "lists/GET_LISTS";

const loadLists = (lists) => ({
  type: GET_LISTS,
  lists,
});

export const getLists = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/lists/${projectId}`);
  if (res.ok) {
    const lists = await res.json();
    dispatch(loadLists(lists));
    return lists;
  }
};

// ~~~~~~~~~~~ Create a new list ~~~~~~~~~~~
const ADD_LIST = "lists/ADD_LIST";

const addList = (list) => ({
  type: ADD_LIST,
  list,
});

export const createList =
  ({ title, description, projectId: project_id, creatorId: creator_id }) =>
  async (dispatch) => {
    const res = await fetch(`/api/lists/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, project_id, creator_id }),
    });
    if (res.ok) {
      const list = await res.json();
      dispatch(addList(list));
      return list;
    }
  };

// ~~~~~~~~~~~ Update a list ~~~~~~~~~~~
const UPDATE_LIST = "lists/UPDATE_LIST";

const loadEditedList = (list) => ({
  type: UPDATE_LIST,
  list,
});

export const updateList =
  ({
    title,
    description,
    listId: list_id,
    projectId: project_id,
    creatorId: creator_id,
  }) =>
  async (dispatch) => {
    const res = await fetch(`/api/lists/${list_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        list_id,
        title,
        description,
        project_id,
        creator_id,
      }),
    });

    if (res.ok) {
      const list = await res.json();
      dispatch(loadEditedList(list));
      return list;
    }
  };

// ~~~~~~~~~~~ Delete a list ~~~~~~~~~~~
const DELETE_LIST = "lists/DELETE_LIST";

const loadDeletedList = (listId) => ({
  type: DELETE_LIST,
  listId,
});

export const deleteList =
  ({ creatorId: creator_id, listId: list_id, projectId: project_id }) =>
  async (dispatch) => {
    const res = await fetch(`/api/lists/${list_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creator_id, list_id, project_id }),
    });

    if (res.ok) {
      const listId = await res.json();
      dispatch(loadDeletedList(listId));
      return listId;
    }
  };

// ~~~~~~~~~~~ Reducer ~~~~~~~~~~~
const initialState = {};
const listReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_LISTS:
      action.lists.forEach((list) => {
        newState[list.id] = list;
      });
      return { ...newState };
    case ADD_LIST:
      return { ...state, [action.list.id]: action.list };
    case UPDATE_LIST:
      return { ...state, [action.list.id]: action.list };
    case DELETE_LIST:
      newState = { ...state };
      delete newState[action.listId];
      return { ...newState };
    default:
      return state;
  }
};

export default listReducer;
