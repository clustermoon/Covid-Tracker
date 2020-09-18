import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/About">
        About
      </a>

      <a className="menu-item" href="/Profile">
        Profile
      </a>

      <a className="menu-item" href="/Tracker">
        Tracker
      </a>

      <a className="menu-item" href="/Signout">
        Signout
      </a>
    </Menu>
  );
};