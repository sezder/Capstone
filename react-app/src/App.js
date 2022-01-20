import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import NewProject from "./components/NewProject";
import ShowProjects from "./components/ShowProjects";
import EditProject from "./components/EditProject";
import ShowLists from "./components/ShowLists";
import NewList from "./components/NewList";
import EditList from "./components/EditList";

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
        <ProtectedRoute path="/projects/:projectId/lists/:listId/todos">
          
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

        {/* Projects */}
        <ProtectedRoute path="/projects/:projectId" exact={true}>
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
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
