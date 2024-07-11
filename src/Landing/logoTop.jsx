import React from "react";
import Logo from "../assets/LogoDeTernera.png";
import { border } from "@chakra-ui/react";

const TopNav = () => {
  return (
    <div style={styles.container}>
      <img src={Logo} alt="Logo De Ternera" style={styles.logo} />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "whitesmoke",
    boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    borderBottom:"solid orange 2px"
  },
  logo: {
    maxWidth: "80px",
    height: "auto",
  },
};

export default TopNav;
