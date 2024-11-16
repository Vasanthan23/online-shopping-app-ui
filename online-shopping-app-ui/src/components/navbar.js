import React from "react";
import '../styles/navbar.css';
import ShowMySelectedBooks from './transactionManagement/Cart/ViewCart';
import { useState } from 'react';


const Navbar = () => {
    const [showComponent, setShowComponent] = useState(false);

    return (
        <nav>
            <div className="nav_box">
                <span className="my_bookStore">
                    Book Store
                </span>
                <div className="cart" onClick = {() => setShowComponent(!showComponent)}>
                {showComponent && <ShowMySelectedBooks/>}
                <span>
                    <i className="fas fa-cart-plus"></i>
                </span>
                </div>
            </div>
        </nav>
    )
      
}
export default Navbar