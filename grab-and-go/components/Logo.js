import Logo from "../public/images/Grab&GoLogoV4.svg";
import Link from "next/link";
import classes from "../styles/Navbar.module.scss";

export default () => (
  <div className={classes.logo_container}>
    <Link href="/">
      <Logo
       className={classes.logo}
        viewBox="0 80 500 100"
        preserveAspectRatio="xMaxYMax meet"
      />
    </Link>
  </div>
);

{
}

/* <div className="logo">Grab <span className="yellow-text">&</span> Go</div> */
