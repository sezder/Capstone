import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, setEmail] = useState("");
  const [job_title, set_job_title] = useState("");
  const [icon_url, set_icon_url] = useState("");
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

  const updatefirst_name = (e) => {
    set_first_name(e.target.value);
  };

  const updatelast_name = (e) => {
    set_last_name(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatejob_title = (e) => {
    set_job_title(e.target.value);
  };

  const updateicon_url = (e) => {
    set_icon_url(e.target.value);
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
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <input
        placeholder="First Name"
        type="text"
        name="first_name"
        onChange={updatefirst_name}
        value={first_name}
      ></input>

      <input
        placeholder="Last Name"
        type="text"
        name="last_name"
        onChange={updatelast_name}
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
        onChange={updatejob_title}
        value={job_title}
      ></input>

      <input
        placeholder="Profile Photo URL (optional)"
        type="text"
        name="icon_url"
        onChange={updateicon_url}
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

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
