// ~~~~~~~~~~~ Get all projects by user id ~~~~~~~~~~~
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
const ADD_LIST = "/lists/ADD_LIST";

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
    default:
      return state;
  }
};

export default listReducer;
