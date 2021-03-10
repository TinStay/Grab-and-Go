import React from "react";
import classes from "../styles/Navbar.module.scss";

const Navbar = () => {

    let navbarClasses = ["container", classes.navbar]
  return (
    <nav className="green-bgc">
      <div className={navbarClasses.join(" ")}>
        <div>Grab and Go</div>
        <ul className={classes.nav_links}>
          <li>Log In</li>
          <li>Sign Up</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
