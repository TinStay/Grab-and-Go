import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";
import classes from "../styles/Navbar.module.scss";

const Navbar = () => {
  let navbarClasses = ["", classes.navbar];
  return (
    <nav className="green-bgc">
      <div className={navbarClasses.join(" ")}>
        
          <Logo />
        
        {/* <img src={Logo} width={100} height={30} /> */}
        <ul className={classes.nav_links}>
          <Link href="/login">Log In</Link>
          <li>Sign Up</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
