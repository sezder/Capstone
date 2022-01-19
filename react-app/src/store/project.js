// Get all projects

// Get all projects by user id

// Create a new project
const ADD_PROJECT = "/projects/ADD_PROJECT";

const addProject = (project) => ({
  type: ADD_PROJECT,
  project,
});

export const createProject = (project) => async (dispatch) => {
  const res = await fetch(`/api/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  if (res.ok) {
    const project = await res.json();
    dispatch(addProject(project));
    return project;
  }
};

const initialState = {};
const projectReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case ADD_PROJECT:
      return { ...state, [action.project.id]: action.project };
    default:
      return state;
  }
};

export default projectReducer;
