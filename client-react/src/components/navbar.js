import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../App';

const NavBar = () =>{
  const {state, dispatch} = useContext(UserContext)
  const renderList = () =>{
    if(state){
      return [
        <li><Link to="/profile" >Profile</Link></li>,
        <li><Link to="/tracker" >Tracker</Link></li>,
        <li><Link to="/signout">Signout</Link></li>
      ]
    }else{
      return [
        <li><Link to="/signup">SignUp</Link></li>,
        <li><Link to="/login">login</Link></li>
      ]
    }
  }

  return(
    <nav>
      <div className="nav-wrapper">
          <Link to="/" className="brand-logo">Home</Link>
          <ul id="nav-mobile" className="right" >
            {renderList()}
          </ul>

      </div>
    </nav>
  )
}

export default NavBar;