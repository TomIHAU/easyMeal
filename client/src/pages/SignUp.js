import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

export default function SignUp() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    console.log(event);
    event.preventDefault();
    try {
      console.log(formState);
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginRight">
          <form className="userForm" id="signForm" onSubmit={handleFormSubmit}>
            <h1>Sign Up</h1>
            <input
              id="signUser"
              type="text"
              placeholder="Enter your username"
              autoComplete="off"
              name="username"
              value={formState.username}
              onChange={handleFormChange}
            />
            <input
              id="signEmail"
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
              name="email"
              value={formState.email}
              onChange={handleFormChange}
            />
            <input
              id="signPassword"
              type="password"
              placeholder="Enter your password"
              autoComplete="off"
              name="password"
              value={formState.password}
              onChange={handleFormChange}
            />
            <input
              id="signPasswordCheck"
              type="password"
              placeholder="Repeat your password"
              autoComplete="off"
              name="passwordRepeat"
              value={formState.passwordRepeat}
              onChange={handleFormChange}
            />
            <button type="submit" id="btn-sign">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
