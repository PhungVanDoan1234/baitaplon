import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { useRef } from "react";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:8800/api/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

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
          <form className="loginBox" onSubmit={handleClick}>
            <input
              className="loginInput"
              placeholder="Username"
              type="text"
              required
              ref={username}
            />
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
              required
              ref={password}
              minLength={6}
            />
            <input
              className="loginInput"
              placeholder="Password Again"
              type="password"
              required
              ref={passwordAgain}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link
              to="http://localhost:3000/login"
              style={{ marginLeft: "30%" }}
            >
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
