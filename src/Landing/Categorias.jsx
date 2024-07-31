import React, { useState, useEffect } from "react";
import oferta from "../assets/Carnita.jpg";
import logo from "../assets/LogoDeTernera.png";
import { Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE;

const Categorias = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const categorias = useSelector((state) => state.allData.categories);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const categoriasOrdenadas = [...categorias].sort((a, b) => a.id - b.id);

  return (
    <div style={styles.container}>
      <h2 style={styles.titSection}>Nuestras categorías</h2>
      <div
        style={{
          ...styles.container2,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {categoriasOrdenadas.map((categoria) => (
          <Box
            as={NavLink}
            to={`/${categoria.nombre}`}
            key={categoria.id}
            style={{ ...styles.card, backgroundImage: `url(${oferta})` }}
          >
            <Button style={styles.Button}>
              <h3 style={styles.title}>{categoria.nombre}</h3>
            </Button>
          </Box>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    justifyItems: "center",
    marginBottom: "2rem",
  },
  container2: {
    display: "flex",
    backgroundImage: `url(${logo})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: "drop-shadow(5px 5px 10px #000000)",
    gap: "1rem",
    justifyItems: "center",
  },
  card: {
    height: "200px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
    borderRadius: "24px",
    padding: ".5rem",
    minWidth: "300px",
  },
  title: {
    textAlign: "flex-end",
  },
  Button: {
    background: "black",
    color: "white",
    borderRadius: "24px",
    width: "100%",
    height: "46px",
  },
  titSection: {
    display: "flex",
    fontWeight: "500",
    width: "100%",
    fontSize: "32px",
    padding: ".5rem",
  },
};

export default Categorias;
