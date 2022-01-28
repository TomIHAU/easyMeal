import React from "react";
import { Link } from "react-router-dom";

export default function MealPlan() {
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginRight">
          <form id="loginForm">
            <h1>Login</h1>
            <input
              id="loginEmail"
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
            />
            <input
              id="loginPassword"
              type="password"
              placeholder="Enter your password"
              autoComplete="off"
            />
            <button type="submit" id="btn-sign">
              SIGN out
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
