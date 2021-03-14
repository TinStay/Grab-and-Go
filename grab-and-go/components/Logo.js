import Logo from "../public/images/Grab&GoLogoV4.svg";
import Link from "next/link";

export default () => (
  <div className="logo-container">
    <Link href="/">
      <Logo
        className="logo"
        viewBox="0 80 500 100"
        preserveAspectRatio="xMaxYMax meet"
      />
    </Link>
  </div>
);

{
}

/* <div className="logo">Grab <span className="yellow-text">&</span> Go</div> */
