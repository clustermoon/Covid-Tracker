import React from 'react';


const NavBar = () =>{
  return(
    <nav>
      <div className="nav-wrapper">
          <a href="/tracker" className="brand-logo">Home</a>
          <ul id="nav-mobile" className="left">
            <li><a href="/profile" >Profile</a></li>
            <li><a href="/login">login</a></li>
          </ul>
          <ul id="nav-mobile" className="right" >
            <li><a href="/about">About</a></li>
            <li><a href="/signout">Signout</a></li>
          </ul>

      </div>
    </nav>
  )
}

export default NavBar;