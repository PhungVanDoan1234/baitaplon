import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "./login.css";
// import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCall";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">CodeCuaDoan</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on CodeCuaDoan.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick} method="POST">
            <input
              className="loginInput"
              placeholder="Email"
              type="email"
              required
              ref={email}
            />
            <input
              className="loginInput"
              placeholder="Password"
              type="password"
              minLength={6}
              required
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {/* {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )} */}
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link
              to="http://localhost:3000/register"
              style={{ marginLeft: "30%" }}
            >
              <button className="loginRegisterButton">
                {/* {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )} */}
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
