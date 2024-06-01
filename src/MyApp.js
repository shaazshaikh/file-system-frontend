import axios from "axios";
import React from "react";
import { useState } from "react";
import "./MyApp.css";

function MyAppFunction() {
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const Login = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7279/api/login/authenticateUser",
        {
          userName,
          password,
        }
      );
    } catch (error) {
      // To be handled later
    }
  };

  const SignUp = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7279/api/signUp/signUp",
        {
          userName,
          password,
        }
      );
    } catch (error) {
      // To be handled later
    }
  };

  const handleSwitchToSignUp = () => {
    setUserName("");
    setPassword("");
    setShowLoginPage(false);
  };

  const handleSwitchToLogin = () => {
    setUserName("");
    setPassword("");
    setShowLoginPage(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>File system project </h1>
        <div className="form-container">
          {showLoginPage ? (
            <div className="login-form">
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button className="login-button" onClick={Login}>
                Login
              </button>
              <div className="switch-form">
                <span>No account ? </span>
                <button
                  onClick={handleSwitchToSignUp}
                  className="switch-button"
                >
                  Sign up
                </button>
              </div>
            </div>
          ) : (
            <div className="signup-form">
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <button className="signup-button" onClick={SignUp}>
                Sign Up
              </button>
              <div className="switch-form">
                <span>Already have an account ? </span>
                <button onClick={handleSwitchToLogin} className="switch-button">
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
