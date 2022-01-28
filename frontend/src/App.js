import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

// Auth
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { authenticate } from "./store/session";

// Users
// import UsersList from "./components/UsersList";
// import User from "./components/User";

// Misc
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Splash from "./components/Splash";

// Create
import NewMessage from "./components/NewMessage";

// Read
import ShowProjects from "./components/ShowProjects";
import ShowLists from "./components/ShowLists";
import ShowMessages from "./components/ShowMessages";
import IndivProject from "./components/IndivProject";
import IndivMessage from "./components/IndivMessage";

//Update
import IndivList from "./components/IndivList";
import ProjectAssignments from "./components/ProjectAssignments";

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

  const navLinks = (
    <ul className="nav">
      <li>
        <NavLink to="/projects" id="only_home_a">
          <i className="fas fa-home fa-lg"></i>
        </NavLink>
      </li>
    </ul>
  );

  return (
    <BrowserRouter>
      <Switch>
        {/* Auth routes */}
        <Route path="/login" exact={true}>
          <NavBar navLinks={navLinks} />
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <NavBar navLinks={navLinks} />
          <SignUpForm />
        </Route>

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

        {/* Project Assignments */}
        <ProtectedRoute path="/projects/:projectId/people" exact={true}>
          <ProjectAssignments />
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
        {/* <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute> */}
        <Route path="/" exact={true}>
          <NavBar navLinks={navLinks} />
          <Splash />
        </Route>

        <Route path="/">
          <></>
        </Route>
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
