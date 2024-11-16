import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import "./register.css";

export const Register=()=> {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const{register}=useContext(AuthContext);
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password!==confirmPassword){
      setError('Passwords do not match');
    }else if(password.length>5){
      const message= await register({username,email,password,confirmPassword})
      if(message==="success"){
        navigate('/profile');
      }else{
        setError(message);
      }
    }
    else{
      setError("Password should have minimum 6 charactes");
    }

  };

  return (
    <div className="register-container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8 col-10">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Register</h2>
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
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={!username||!email||!password||!confirmPassword}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
