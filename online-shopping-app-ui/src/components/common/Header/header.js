// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           Book Exchange
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link className="nav-link" to="/profile">
//                 Profile
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/list-book">
//                 List Book
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/search-books">
//                 Search Books
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/exchange-requests">
//                 Exchange Requests
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React,{useContext,useState, useEffect} from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import "./header.css"

export const Header=()=> {
  const [showLogout, setShowLogout] = useState(false);
  const {user,getUserInfo,logout} = useContext(AuthContext);
  const location=useLocation();
  const navigate=useNavigate();

  useEffect(()=>{
    let userCheck=user?false:!(location.pathname.includes('login')||location.pathname.includes('register'));
    if(userCheck){
      getUserInfo();
    }else{
      navigate('/login');
    }
  },[])


  const headerContent=()=>{
   if( location.pathname.includes('register')){
return <Link to="/login" className="nav-link">Login</Link>
   }else if( location.pathname.includes('login')){
return <Link to="/register" className="nav-link">Register</Link>
   }else{
    return <></>
   }
  }

  const handleLogout=()=>{
    if(showLogout){
      setShowLogout(false)
      logout(()=>navigate('/login'));
    }
  }

  return (
    <nav className="navbar fixed-top navbar-dark bg-dark">
      <div>
        <Link to="/" className="navbar-brand">My Book Exchange</Link>
      </div>
      <div>
      <div className="navbar-nav ml-auto" >
        {!user&&headerContent()}
          <div className="nav-link" onClick={()=>setShowLogout(!showLogout)}>
            <i className="fas fa-user user"></i>
          </div>
          {user && <div className='username'>{user.username}</div>}
          {showLogout && (
            <div className="logout-overlay">
            <div className="logout-option">
              <Link to="/profile" className="nav-link">
                Home
              </Link>
              <Link to="/order-history" className="nav-link">
                Order History
              </Link>
              <Link to="/mycart" className="nav-link">
                Cart
              </Link>
              <Link className="nav-link" onClick={handleLogout}>
                Logout
              </Link>              
            </div>
          </div>
          )}
        </div>
      </div>
    </nav>
  );
}
