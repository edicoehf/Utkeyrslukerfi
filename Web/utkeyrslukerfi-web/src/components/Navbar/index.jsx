import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink
          exact
          to="/bosses"
          className="navigation-link"
        >Home
        </NavLink>
      </div>
    </nav >
  );
}

export default Navbar;