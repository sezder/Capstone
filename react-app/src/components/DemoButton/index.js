import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const DemoButton = () => {
  const dispatch = useDispatch();

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@co.com", "password"));
  };

  return <button onClick={handleDemoLogin}>Demo</button>;
};

export default DemoButton;
