import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {Register} from "../components/Signup";
import {Login} from "../components/Signup";
import UserProfile from "../components/userProfile";
import ViewCart from "../components/transactionManagement/Cart/ViewCart";
import OrderHistory from "../components/transactionManagement/Orders/OrderHistory";
import Book from "../components/Book/Book";

export const AppRoutes=({children})=>{
    return <Router>
      {children}
    <Routes>
      <Route path="/" exact element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={<UserProfile/>} />
      <Route path="/books" element={<Book />} />
      <Route path = "/mycart" element = {<ViewCart/>} />
      <Route path = "/order-history" element = {<OrderHistory/>} />
    </Routes>
  </Router>
}