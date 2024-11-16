import React from "react";
import './viewCart.css';

const ShowMySelectedBooks = () => {
    return (      
        <>
         <div class="cart-item">
            <div class="cart-header">
      <h4>Books in your Cart</h4>
      </div>
      <div className="cart_box" >
        <div className="cart_img">
        <img src="https://search.app.goo.gl/wHvGV1c" />
        <p>hello</p>
        </div>
        <div> 
        <button >Remove</button>
         </div>
        </div>
        </div>
        </>  
       
    )
}

export default ShowMySelectedBooks;
