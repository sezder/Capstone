// ~~~~~~~~~~~ Get all users ~~~~~~~~~~~
const GET_ALL_USERS = "users/GET_ALL_USERS";

const loadAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
});

export const getAllUsers = () => async (dispatch) => {
  const res = await fetch(`/api/users/`);
  if (res.ok) {
    const users = await res.json();
    dispatch(loadAllUsers(users));
    return users;
  }
};

// ~~~~~~~~~~~ Reducer ~~~~~~~~~~~
const initialState = {};

const userReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_USERS:
      action.users.forEach((user) => {
        newState[user.id] = user;
      });
      return { ...newState };
    default:
      return state;
  }
};

export default userReducer;
