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
        <ul className={classes.nav_items}>
          <li className="mx-3">
            <Link href="/login">
              <a className={classes.nav_link}> Log In</a>
            </Link>
          </li>
          <li className="mx-3">
            <Link href="/signup">
              <a className={classes.nav_link}> Sign Up</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
