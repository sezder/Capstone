import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import DemoButton from "../DemoButton";
import { signUp } from "../../store/session";
import "./Auth.css";
import researching from "../images/researching.svg";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [icon_url, setIconUrl] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const payload = {
      first_name,
      last_name,
      email,
      job_title,
      icon_url,
      password,
    };
    if (password === repeatPassword) {
      const data = await dispatch(signUp(payload));
      if (data) {
        setErrors(data);
      }
    }
  };

  useEffect(() => {
    const errors = [];
    if (!first_name.length) errors.push("Provide a first name.");
    if (!last_name.length) errors.push("Provide a last name.");
    if (!email.length) errors.push("Provide a valid email address.");
    if (!job_title.length) errors.push("Provide a job title.");
    if (!password.length) errors.push("Provide a password.");
    if (!repeatPassword.length) errors.push("Confirm password.");
    if (repeatPassword !== password) errors.push("Passwords must match.");
    setErrors(errors);
  }, [first_name, last_name, email, job_title, password, repeatPassword]);

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateJobTitle = (e) => {
    setJobTitle(e.target.value);
  };

  const updateIconUrl = (e) => {
    setIconUrl(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="splash_main">
      <section className="splash_img_sec">
        <img
          src={researching}
          alt="Woman hanging up a paper on a wall."
          id="login_img"
        ></img>
      </section>
      <main className="auth_main">
        <form onSubmit={onSignUp} className="auth_form">
          <h1 className="light_large">Sign Up</h1>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <input
            placeholder="First Name"
            type="text"
            name="first_name"
            onChange={updateFirstName}
            value={first_name}
          ></input>

          <input
            placeholder="Last Name"
            type="text"
            name="last_name"
            onChange={updateLastName}
            value={last_name}
          ></input>

          <input
            placeholder="Email"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>

          <input
            placeholder="Job Title"
            type="text"
            name="job_title"
            onChange={updateJobTitle}
            value={job_title}
          ></input>

          <input
            placeholder="Profile Photo URL (optional)"
            type="text"
            name="icon_url"
            onChange={updateIconUrl}
            value={icon_url}
          ></input>

          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>

          <input
            placeholder="Confirm Password"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>

          <div>
            <button type="submit">Sign Up</button>
            <DemoButton />
          </div>
          <NavLink to="/login" className="dynamic_underline light_small">
            Already have an account?
          </NavLink>
        </form>
      </main>
    </div>
  );
};

export default SignUpForm;
