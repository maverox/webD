import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log(e);
  };
  return (
    <div className="container">
      <div className="well">
        <form onSubmit={handleSubmit}>
          <hgroup>
            <h1>Welcome back!</h1>
            <h2>Log in to your account.</h2>
          </hgroup>

          <div>
            <input
              type="email"
              name="login-email"
              id="login-username"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label htmlFor="login-username">Email</label>
          </div>

          <div>
            <input
              type="password"
              name="login-pwd"
              id="login-pwd"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <label htmlFor="login-pwd">Password</label>
          </div>

          <a href="#" id="forgot-pwd">
            Forgot Password?
          </a>

          <button className="button" id="btn-submit">
            <span className="button--text">Log In</span>

            <div className="button--loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
        </form>

        <p>
          Don&apos;t have an account?
          <Link  to="/signup" className="link ">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
