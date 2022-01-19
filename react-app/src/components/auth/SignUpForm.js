import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [iconURL, setIconURL] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

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

  const updateIconURL = (e) => {
    setIconURL(e.target.value);
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
        name="firstName"
        onChange={updateFirstName}
        value={firstName}
      ></input>

      <input
        placeholder="Last Name"
        type="text"
        name="lastName"
        onChange={updateLastName}
        value={lastName}
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
        name="jobTitle"
        onChange={updateJobTitle}
        value={jobTitle}
      ></input>

      <input
        placeholder="Profile Photo URL (optional)"
        type="text"
        name="iconURL"
        onChange={updateIconURL}
        value={iconURL}
      ></input>

      <input
        type="password"
        name="password"
        onChange={updatePassword}
        value={password}
      ></input>

      <input
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
