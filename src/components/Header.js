import React, { useEffect } from "react";

import { LOGO_URL } from "../utils/constants";
import { useState ,useContext} from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  const onlineStatus = useOnlineStatus();
  const {loggedInUser} = useContext(UserContext);
  // console.log(loggedInUser);

  const cartItems = useSelector((store ) => store.cart.items);
  console.log(cartItems);

  

    return (
      <div className="flex justify-between items-center bg-white shadow-lg sticky top-0 z-50 px-4 py-2">
        <div className="logo-container">
          <img className="w-28 h-auto" src={LOGO_URL} alt="logo" />
 
        </div>
        <div className="flex items-center">
          <ul className="flex items-center space-x-6 mr-4">
            <li className="flex items-center gap-1 text-gray-600">
              <span>Online Status:</span> {useOnlineStatus() ? "✅" :"🔴"}  
            </li>
            <li>
              <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors duration-200">Home</Link>
              
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-orange-500 transition-colors duration-200">About Us</Link>
             
              </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors duration-200">Contact Us</Link>
            </li>
            <li>
              <Link to="/grocery" className="text-gray-700 hover:text-orange-500 transition-colors duration-200">Grocery</Link>
            </li>
            <li className="flex items-center gap-1">
              <Link to="/cart" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 flex items-center">
                <span className="material-icons-outlined font-bold text-xl">Cart -({cartItems.length}) items</span>
                
              </Link>
            </li>
            <button 
              className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200 font-medium"
              onClick={() => {
                btnNameReact === "Login" 
                ? setBtnNameReact("Logout") 
                : setBtnNameReact("Login");
                
            }} >
              {btnNameReact}
            </button>
            <l1 className="px-4 font-bold">{loggedInUser}</l1>
          </ul>
        </div>
      </div>
    );
  };

  export default Header;