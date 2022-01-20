// ~~~~~~~~~~~ Get all projects by user id ~~~~~~~~~~~
const GET_LISTS = "lists/GET_LISTS";

const loadLists = (lists) => ({
  type: GET_LISTS,
  lists,
});

export const getLists = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/lists/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project_id: projectId }),
  });
  if (res.ok) {
    const lists = await res.json();
    dispatch(loadLists(lists));
    return lists;
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
    default:
      return state;
  }
};

export default listReducer;
