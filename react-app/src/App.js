import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

// Auth
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { authenticate } from "./store/session";

// Users
import UsersList from "./components/UsersList";
import User from "./components/User";

// Misc
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Splash from "./components/Splash";

// Create
import NewProject from "./components/NewProject";
import NewList from "./components/NewList";
import NewTodo from "./components/NewTodo";
import NewMessage from "./components/NewMessage";
import NewComment from "./components/NewComment";

// Read
import ShowProjects from "./components/ShowProjects";
import ShowLists from "./components/ShowLists";
import ShowTodos from "./components/ShowTodos";
import ShowMessages from "./components/ShowMessages";
import IndivProject from "./components/IndivProject";
import IndivMessage from "./components/IndivMessage";

//Update
import EditProject from "./components/EditProject";
import EditMessage from "./components/EditMessage";
import EditComment from "./components/EditComment";
import EditList from "./components/EditList";
import EditTodo from "./components/EditTodo";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        {/* Auth routes */}
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>

        {/* Todos */}
        <ProtectedRoute path="/projects/:projectId/lists/:listId/todos/new">
          <NewTodo />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/lists/:listId/todos/:todoId">
          <EditTodo />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/lists/:listId/todos">
          <ShowTodos />
        </ProtectedRoute>

        {/* Lists */}
        <ProtectedRoute path="/projects/:projectId/lists/new" exact={true}>
          <NewList />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/lists/:listId/edit">
          <EditList />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/lists" exact={true}>
          <ShowLists />
        </ProtectedRoute>

        {/* Messages and comments*/}
        <ProtectedRoute
          path="/projects/:projectId/messages/:messageId/comments/new"
          exact={true}
        >
          <NewComment />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/messages/:messageId/comments/:commentId/edit">
          <EditComment />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/messages/new" exact={true}>
          <NewMessage />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/messages/:messageId/edit">
          <EditMessage />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/messages/:messageId">
          <IndivMessage />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/messages">
          <ShowMessages />
        </ProtectedRoute>

        {/* Projects */}
        <ProtectedRoute path="/projects/:projectId">
          <IndivProject />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/edit" exact={true}>
          <EditProject />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/new">
          <NewProject />
        </ProtectedRoute>

        <ProtectedRoute path="/projects" exact={true}>
          <ShowProjects />
        </ProtectedRoute>

        {/* Users */}
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/(\\d+):userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <Splash />
        </ProtectedRoute>
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
