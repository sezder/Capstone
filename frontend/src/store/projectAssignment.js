// ~~~~~~~~~~~ Get all projAssignments by project id ~~~~~~~~~~~
const GET_PROJ_ASSIGNMENTS = "projAssignments/GET_PROJ_ASSIGNMENTS";

const loadProjAssignments = (projAssignments) => ({
  type: GET_PROJ_ASSIGNMENTS,
  projAssignments,
});

export const getProjAssignments = (projectId) => async (dispatch) => {
  const res = await fetch(`/api/projAssignments/${projectId}`);
  if (res.ok) {
    const projAssignments = await res.json();
    dispatch(loadProjAssignments(projAssignments));
    return projAssignments;
  }
};

// ~~~~~~~~~~~ Create a new projAssignment ~~~~~~~~~~~
const ADD_PROJ_ASSIGNMENT = "projAssignments/ADD_PROJ_ASSIGNMENT";

const addProjAssignments = (projAssignment) => ({
  type: ADD_PROJ_ASSIGNMENT,
  projAssignment,
});

export const createProjAssignment =
  ({ projectId: project_id, userId: user_id }) =>
  async (dispatch) => {
    const res = await fetch(`/api/projAssignments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project_id, user_id }),
    });
    if (res.ok) {
      const projAssignment = await res.json();
      dispatch(addProjAssignments(projAssignment));
      return projAssignment;
    }
  };

// ~~~~~~~~~~~ Reducer ~~~~~~~~~~~
const initialState = {};
const projectAssignmentReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_PROJ_ASSIGNMENTS:
      action.projAssignments.forEach((projAssignment) => {
        newState[projAssignment.id] = projAssignment;
      });
      return { ...newState };
    case ADD_PROJ_ASSIGNMENT:
      return { ...state, [action.projAssignment.id]: action.projAssignment };
    // case DELETE_LIST:
    //   newState = { ...state };
    //   delete newState[action.projAssignmentId];
    //   return { ...newState };
    default:
      return state;
  }
};

export default projectAssignmentReducer;
