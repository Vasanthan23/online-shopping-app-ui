import { createContext, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token")??null);
  const[isLoading, setIsLoading]=useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);

const register=async(userInfo)=>{
  setIsLoading(true)
  const{username,email,password,confirmPassword}=userInfo;
  try {
    const response = await axios.post('http://localhost:4000/auth/register', {
      username,
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem('token', token);
    setUser(response.data.user)
    setToken(token);
    setIsLoading(false);
    return response.data.message;
  } catch (error) {
    localStorage.removeItem('token')
      setUser(null)
      setToken(null);
      setIsLoading(false);
      return error.response.data.error
  }
}

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        username,
        password,
      });
      const token = response.data.token;
     localStorage.setItem('token',token)
      setUser(response.data.user)
      setToken(token);
      setIsLoading(false);
       return response.data.message
    } catch (error) {
     localStorage.removeItem('token')
      setUser(null)
      setToken(null);
      setIsLoading(false);
      return error.response.data.error
    }
  };

  const logout = (callback) => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      setIsLoading(false);
      ;callback()
    }, 2000);
  };

  const getUserInfo=async()=>{
setIsLoading(true)
      try {
          const response = await axios.get('http://localhost:4000/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
          setIsLoading(false);
      } catch (error) {
        setUser(null);
        setToken(null);
        setIsLoading(false);
      }
  }

  return (
    <AuthContext.Provider value={{ user, token,isLoading,setUser, setToken ,login, logout,register,getUserInfo,selectedBooks,setSelectedBooks }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };