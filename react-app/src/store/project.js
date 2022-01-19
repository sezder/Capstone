// Get all projects
const GET_ALL_PROJECTS = "projects/GET_ALL_PROJECTS";

const loadAllProjects = (projects) => ({
  type: GET_ALL_PROJECTS,
  projects,
});

export const getAllProjects = () => async (dispatch) => {
  const res = fetch(`/api/projects`);
  if (res.ok) {
    const projects = await res.json();
    dispatch(loadAllProjects(projects));
  }
};

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
    case GET_ALL_PROJECTS:
      action.projects.forEach((project) => {
        newState[project.id] = project;
      });
      return { ...newState };
    case ADD_PROJECT:
      return { ...state, [action.project.id]: action.project };
    default:
      return state;
  }
};

export default projectReducer;
