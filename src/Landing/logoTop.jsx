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
  },
  logo: {
    maxWidth: "80px",
    height: "auto",
  },
};

export default TopNav;
