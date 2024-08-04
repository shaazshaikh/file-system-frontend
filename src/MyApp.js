import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import "./MyApp.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/userContext";

function MyAppFunction() {
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const validateLoginForm = () => {
    const errors = {};
    if (!userName) {
      errors.userName = "username is required";
    }
    if (!password) {
      errors.password = "password is required";
    }
    return errors;
  };

  const validateSignUpForm = () => {
    const errors = {};
    if (!userName) {
      errors.userName = "username is required";
    }
    if (!password) {
      errors.password = "password is required";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "confirmPassword is required";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "password and confirm password should match";
    }
    return errors;
  };

  const Login = async () => {
    const validationErrors = validateLoginForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const response = await axios.post(
        // "https://filesystemauthentication.azurewebsites.net/api/login/authenticateUser",
        "https://localhost:7279/api/login/authenticateUser",
        {
          userName,
          password,
        }
      );
      const token = response.data;
      if (token) {
        localStorage.setItem("jwtToken", token);
        setUser(userName);
        navigate("/components/Home");
      }
    } catch (error) {
      // To be handled later
    }
  };

  const SignUp = async () => {
    const validationErrors = validateSignUpForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setErrors({});
      const response = await axios.post(
        // "https://filesystemauthentication.azurewebsites.net/api/signUp/signUp",
        "https://localhost:7279/api/signUp/signUp",
        {
          userName,
          password,
        }
      );
      if (response.status === 201) {
        alert("Account Created");
        handleSwitchToLogin();
      }
    } catch (error) {
      // To be handled later
    }
  };

  const handleSwitchToSignUp = () => {
    setUserName("");
    setPassword("");
    setErrors({});
    setShowLoginPage(false);
  };

  const handleSwitchToLogin = () => {
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
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
              {errors.userName ? (
                <p className="error">{errors.userName}</p>
              ) : null}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errors.password ? (
                <p className="error">{errors.password}</p>
              ) : null}
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
              {errors.userName ? (
                <p className="error">{errors.userName}</p>
              ) : null}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errors.password ? (
                <p className="error">{errors.password}</p>
              ) : null}
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {errors.confirmPassword ? (
                <p className="error">{errors.confirmPassword}</p>
              ) : null}
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
