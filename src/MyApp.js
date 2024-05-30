import React from "react";
import { useState } from "react";
import "./MyApp.css";

function MyAppFunction() {
  const [showLoginPage, setShowLoginPage] = useState(true);
  return (
    <div className="app">
      <header className="app-header">
        <h1>File system project </h1>
        <div className="form-container">
          {showLoginPage ? (
            <div className="login-form">
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button className="login-button">Login</button>
              <div className="switch-form">
                <span>No account ? </span>
                <button
                  onClick={() => setShowLoginPage(false)}
                  className="switch-button"
                >
                  Sign up
                </button>
              </div>
            </div>
          ) : (
            <div className="signup-form">
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <button className="signup-button">Sign Up</button>
              <div className="switch-form">
                <span>Already have an account ? </span>
                <button
                  onClick={() => setShowLoginPage(true)}
                  className="switch-button"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
export default MyAppFunction;
