import React, { useState, useEffect } from "react";
import oferta from "../assets/Carnita.jpg";
import logo from "../assets/LogoDeTernera.png";
import { Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Carne from "../assets/CatCarne.png"
import Oferta from "../assets/CatOfer.png"
import Pollo from "../assets/CatPollo.png"
import Cerdo from "../assets/CatCerdo.png"
import Achuras from "../assets/CatAchuras.jpg"



const categoryImages = {
  "Productos en Ofertas": Oferta,
  "Productos De Ternera": Carne,
  "Productos de Pollo": Pollo,
  "Productos de Cerdo": Cerdo,
  "Achuras": Achuras,
};

const Categorias = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { categories } = useSelector((state) => state);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Asegurarse de que categories es un array y ordenarlo
  const categoriasOrdenadas = Array.isArray(categories)
    ? [...categories].sort((a, b) => a.id - b.id)
    : [];

  const getCategoryImage = (categoryName) => {
    return categoryImages[categoryName] || logo;
  };

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
            style={{
              ...styles.card,
              backgroundImage: `url(${getCategoryImage(categoria.nombre)})`,
            }}
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
