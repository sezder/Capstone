// ~~~~~~~~~~~ Get all todos by list id ~~~~~~~~~~~
const GET_TODOS = "todos/GET_TODOS";

const loadTodos = (todos) => ({
  type: GET_TODOS,
  todos,
});

export const getTodos = (listId) => async (dispatch) => {
  const res = await fetch(`/api/todos/${listId}`);
  if (res.ok) {
    const todos = await res.json();
    dispatch(loadTodos(todos));
    return todos;
  }
};

// ~~~~~~~~~~~ Create a new todo ~~~~~~~~~~~
const ADD_TODO = "todos/ADD_TODO";

const addTodo = (todo) => ({
  type: ADD_TODO,
  todo,
});

export const createTodo =
  ({ task, listId: list_id, creatorId: creator_id, completed, due }) =>
  async (dispatch) => {
    const res = await fetch(`/todos/${list_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, list_id, creator_id, completed, due }),
    });

    if (res.ok) {
      const todo = await res.json();
      dispatch(addTodo(todo));
      return todo;
    }
  };

// ~~~~~~~~~~~ Update a todo ~~~~~~~~~~~
const UPDATE_TODO = "todos/UPDATE_TODO";

const loadEditedTodo = (todo) => ({
  type: UPDATE_TODO,
  todo,
});

export const updateTodo =
  ({ task, listId: list_id, creatorId: creator_id, completed, due }) =>
  async (dispatch) => {
    const res = await fetch(`/todos/${list_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, list_id, creator_id, completed, due }),
    });

    if (res.ok) {
      const todo = await res.json();
      dispatch(loadEditedTodo(todo));
      return todo;
    }
  };

// ~~~~~~~~~~~ Delete a todo ~~~~~~~~~~~
const DELETE_TODO = "todos/DELETE_TODO";

const loadDeletedTodo = (todoId) => ({
  type: DELETE_TODO,
  todoId,
});

export const deleteTodo =
  ({ creatorId: creator_id, todoId: todo_id }) =>
  async (dispatch) => {
    const res = await fetch(`/todos/${todo_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creator_id, todo_id }),
    });

    if (res.ok) {
      const todoId = await res.json();
      dispatch(loadDeletedTodo(todoId));
      return todoId;
    }
  };

// ~~~~~~~~~~~ Reducer ~~~~~~~~~~~
const initialState = {};

const todoReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_TODOS:
      action.todos.forEach((todo) => {
        newState[todo.id] = todo;
      });
      return { ...newState };
    case ADD_TODO:
      return { ...state, [action.todo.id]: action.todo };
    case UPDATE_TODO:
      return { ...state, [action.todo.id]: action.todo };
    case DELETE_TODO:
      newState = { ...state };
      delete newState[action.todoId];
      return { ...newState };
    default:
      return state;
  }
};

export default todoReducer;
