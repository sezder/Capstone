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
import NewTodo from "./components/NewTodo";
import NewMessage from "./components/NewMessage";

// Read
import ShowProjects from "./components/ShowProjects";
import ShowLists from "./components/ShowLists";
import ShowMessages from "./components/ShowMessages";
import IndivProject from "./components/IndivProject";
import IndivMessage from "./components/IndivMessage";

//Update
import EditTodo from "./components/EditTodo";
import EditList from "./components/EditList";
import IndivList from "./components/IndivList";
import Search from "./components/Search";
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
        {/* Search Testing */}
        <ProtectedRoute path="/test">
          <Search />
        </ProtectedRoute>
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

        {/* Lists */}

        <ProtectedRoute
          path="/projects/:projectId/lists/:listId/edit"
          exact={true}
        >
          <EditList />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/lists" exact={true}>
          <ShowLists />
        </ProtectedRoute>

        {/* Messages and comments*/}
        <ProtectedRoute path="/projects/:projectId/messages/new" exact={true}>
          <NewMessage />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/messages/:messageId">
          <IndivMessage />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/messages">
          <ShowMessages />
        </ProtectedRoute>

        {/* Projects */}
        <ProtectedRoute path="/projects/:projectId" exact={true}>
          <IndivProject />
        </ProtectedRoute>

        <ProtectedRoute path="/projects" exact={true}>
          <ShowProjects />
        </ProtectedRoute>

        <ProtectedRoute path="/projects/:projectId/lists/:listId" exact={true}>
          <IndivList />
        </ProtectedRoute>

        {/* Users */}
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/(\\d+):userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <Splash />
        </Route>
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
