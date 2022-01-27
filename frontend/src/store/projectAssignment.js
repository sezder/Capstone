// ~~~~~~~~~~~ Get all projAssignments  ~~~~~~~~~~~
const GET_ALL_PROJ_ASSIGNMENTS = "projAssignments/GET_ALL_PROJ_ASSIGNMENTS";

const loadAllProjAssignments = (projAssignments) => ({
  type: GET_ALL_PROJ_ASSIGNMENTS,
  projAssignments,
});

export const getAllProjAssignments = () => async (dispatch) => {
  const res = await fetch(`/api/projAssignments/`);
  if (res.ok) {
    const projAssignments = await res.json();
    dispatch(loadAllProjAssignments(projAssignments));
    return projAssignments;
  }
};

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

// ~~~~~~~~~~~ Delete an assignment ~~~~~~~~~~~
const DELETE_PROJ_ASSIGNMENT = "projAssignments/DELETE_PROJ_ASSIGNMENT";

const loadDeletedAssignment = (assignmentId) => ({
  type: DELETE_PROJ_ASSIGNMENT,
  assignmentId,
});

export const deleteAssignment =
  ({ assignmentId: id }) =>
  async (dispatch) => {
    const res = await fetch(`/api/projAssignments/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    if (res.ok) {
      const assignmentId = await res.json();
      dispatch(loadDeletedAssignment(assignmentId));
      return assignmentId;
    }
  };

// ~~~~~~~~~~~ Reducer ~~~~~~~~~~~
const initialState = {};
const projectAssignmentReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_PROJ_ASSIGNMENTS:
      action.projAssignments.forEach((projAssignment) => {
        newState[projAssignment.id] = projAssignment;
      });
      return { ...newState };
    case GET_PROJ_ASSIGNMENTS:
      action.projAssignments.forEach((projAssignment) => {
        newState[projAssignment.id] = projAssignment;
      });
      return { ...newState };
    case ADD_PROJ_ASSIGNMENT:
      return { ...state, [action.projAssignment.id]: action.projAssignment };
    case DELETE_PROJ_ASSIGNMENT:
      newState = { ...state };
      delete newState[action.assignmentId];
      return { ...newState };
    default:
      return state;
  }
};

export default projectAssignmentReducer;
