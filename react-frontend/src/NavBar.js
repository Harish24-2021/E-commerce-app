import './App.css';

function NavBar({ handleClick, navBarKey }) {
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
}
  return (
    <div className="navbar">
      <a 
        className={navBarKey === 'home' ? "active" : ""}
        onClick={() => handleClick("home")}
      > 
        Home
      </a> 

      <a 
        className={navBarKey === 'cart' ? "active" : ""}
        onClick={() => handleClick("cart")}
      > 
        Cart
      </a> 

      <a 
        className={navBarKey === 'billing' ? "active" : ""}
        onClick={() => handleClick("billing")}
      > 
        Billing
      </a> 

      <a 
        className={navBarKey === 'addproducts' ? "active" : ""}
        onClick={() => handleClick("addproducts")}
      > 
        Add Products
      </a>
      <a className={navBarKey === 'register' ? "active" : ""} onClick={() => handleClick("register")} 
      >
        Register
      </a>
      <a className={navBarKey === 'login' ? "active" : ""} onClick={() => handleClick("login")} 
      >
        Login
      </a>
      <a className={navBarKey === 'logout' ? "active" : ""} onClick={() => handleLogout()}
      >Logout</a>
    </div>
  );
}

export default NavBar;
