import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

export default function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
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
          <form id="loginForm" onSubmit={handleFormSubmit}>
            <h1>Login</h1>
            <input
              id="loginEmail"
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
              onChange={handleFormChange}
            />
            <input
              id="loginPassword"
              type="password"
              placeholder="Enter your password"
              autoComplete="off"
              onChange={handleFormChange}
            />
            <button type="submit" id="btn-sign">
              SIGN IN
            </button>
          </form>
          <div className="loginUnder">
            <p>Don't have an account yet?</p>
            <Link to="signUp">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
