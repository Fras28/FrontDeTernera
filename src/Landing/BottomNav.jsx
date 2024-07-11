import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import React from "react";

const BottomNav = () => {
  return (
    <div style={styles.container}>
      <div style={styles.contBut}>
        {" "}
        <label htmlFor="text">inicio</label>
        <button style={styles.button}>x</button>
      </div>
      <div style={styles.contBut}>
        {" "}
        <label htmlFor="text">Catálogo</label>
        <button style={styles.button}>x</button>
      </div>
      <div style={styles.contBut}>
        <label htmlFor="text">Carrito</label>
        <button style={styles.button}>x</button>
      </div>
      <div style={styles.contBut}>
        <label htmlFor="text">Mi Perfil</label>
        <button style={styles.button}>x</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "whitesmoke",
    boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
    zIndex:"99",
    borderTop:"solid orange 1px"
  },
  button: {
    backgroundColor: "#282c34",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    width:"45px",
    boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
  },
  contBut:{
    display:"flex",
    flexDirection:"column-reverse",
    alignItems:"center"
  }
};

export default BottomNav;
