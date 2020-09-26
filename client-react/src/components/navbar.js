import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () =>{


  return(
    <nav>
      <div className="nav-wrapper">
          <Link to="/tracker" className="brand-logo">Home</Link>
          <ul id="nav-mobile" className="left">
            <li><Link to="/profile" >Profile</Link></li>
            <li><Link to="/login">login</Link></li>
          </ul>
          <ul id="nav-mobile" className="right" >
            <li><Link to="/about">About</Link></li>
            <li><Link to="/signout">Signout</Link></li>
          </ul>

      </div>
    </nav>
  )
}

export default NavBar;