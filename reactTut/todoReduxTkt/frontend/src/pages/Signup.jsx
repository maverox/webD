import { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    setLoading(true);
    axios.post('http://localhost:8000/api/users/', {
      name,
      email,
      password
    })
    .then(res => {
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: res.data });
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      navigate('/todos');
    })
    .catch(err => {
      throw new `Signup error: ${err}`;
    })
    .finally(() => {
      setLoading(false);
    });
    
  };
  useEffect(() => {
    if (userInfo) {
      navigate('/todos');
    }
  }, [userInfo, navigate]);
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
              type="text"
              name="login-email"
              id="login-username"
              value={name}
              onChange={handleNameChange}
              required
            />
            <label htmlFor="login-username">Name</label>
          </div>

          <div>
            <input
              type="email"
              name="login-email"
              id="login-email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label htmlFor="login-email">Email</label>
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

          <button className="button" id="btn-submit">
            <span className="button--text">Sign Up</span>

            <div className="button--loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
        </form>

        <p>
          Already have an account?
          <Link  to="/login" className="link ">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
