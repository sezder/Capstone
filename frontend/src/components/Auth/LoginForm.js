import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import DemoButton from "./DemoButton";
import researching from "../images/researching.svg";
import "./Auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/projects" />;
  }

  return (
    <div className="auth_main">
      <section className="auth_img_sec">
        <img src={researching} alt="Woman hanging up a paper on a wall." id="login_img"></img>
      </section>
      <main className="auth_main">
        <form onSubmit={onLogin} className="auth_form">
          <h1 className="light_large">Log In</h1>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <input
            placeholder="Email"
            name="email"
            type="text"
            value={email}
            onChange={updateEmail}
          />

          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={updatePassword}
          />
          <div>
            <button type="submit">Login</button>
            <DemoButton />
          </div>
          <NavLink to="/sign-up" className="dynamic_underline light_small">
            Need an account?
          </NavLink>
        </form>
      </main>
    </div>
  );
};

export default LoginForm;
