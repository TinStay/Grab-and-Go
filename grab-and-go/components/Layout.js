import React from "react";
import Navbar from "./Navbar";
import Meta from "./Meta";
import ThemeProvider from "../styles/ThemeProvider";

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="light-green-bgc h-100vh">
        <Meta />
        <Navbar />
        {children}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
