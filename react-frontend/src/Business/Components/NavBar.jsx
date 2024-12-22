import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../../App.css";
import { cart, checkout, login, products } from "../../util/constants";

const NavBar = () => {
  const [activePage, setActivePage] = useState(login);
  const naviate = useNavigate();

  const navigator = (route) => {
    naviate(`/${route}`);
    setActivePage(route);
  };
  const signoutHandler = () => {
   localStorage.removeItem("token");
   naviate ("/login");
  };

  return (
    <div className="navigationBar">
      <div
        className={activePage === products ? "navElement active" : "navElement"}
        onClick={() => navigator(products)}
      >
        Home
      </div>
      <div
        className={activePage === cart ? "navElement active" : "navElement"}
        onClick={() => navigator(cart)}
      >
        Cart
      </div>
      <div
        className={activePage === checkout ? "navElement active" : "navElement"}
        onClick={() => navigator(checkout)}
      >
        Checkout{" "}
      </div>
      {/* <div className={activePage === login ? 'navElement active':'navElement'}onClick={()=>navigator(login)}>Login</div> */}
      {/* <div className={activePage === register ? 'navElement active':'navElement'} onClick={()=>navigator(register)}>Register</div>         */}
      <div className="navElement singoutButton" onClick={signoutHandler}>Sign Out</div>
      <div  className="cartButtoncontainer" onClick={()=>navigator(cart)}>
      <span className="cartButton"></span>
      <span className="cartText">Cart</span>
      </div>

    </div>

  );
};

export default NavBar;
