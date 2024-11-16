import React, { useState, useEffect, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import "./login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login,user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
if(user){
  navigate('/profile');
}
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message=await login(username,password);
    if(message==="success"){
      navigate('/profile');
    }else{
      setError(message);
    }
  };

  return (
    <div className="login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8 col-10">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Login as an existing user</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={!username||!password}>
              Login
            </button>
          </form>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};
