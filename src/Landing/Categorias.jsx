import React from "react";
import meat from "../assets/meat.jpg"; // Importa la imagen de meat
import pollo from "../assets/pollo.jpeg";
import cerdo from "../assets/cerdo.jpeg";
import oferta from "../assets/oferta.jpeg"
import bgImg from "../assets/BackPoulet.png"
import logo from "../assets/LogoDeTernera.png"
import { background, border, Button } from "@chakra-ui/react";
import { color } from "framer-motion";
import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";
import { text } from "@fortawesome/fontawesome-svg-core";

const Categorias = () => {
  // Array de categorías con información de imagen y título
  const categorias = [
    {
      id: 1,
      titulo: "Carnes Rojas",
      imagen: meat, // Asigna la imagen de meat como fondo de la primera tarjeta
    },
    {
      id: 2,
      titulo: "Pollo",
      imagen: pollo, // Cambia por la URL de la imagen deseada
    },
    {
      id: 3,
      titulo: "Cerdo",
      imagen: cerdo, // Cambia por la URL de la imagen deseada
    },
    {
      id: 4,
      titulo: "Promos",
      imagen: oferta, // Cambia por la URL de la imagen deseada
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.titSection}>Nuestras categorías</h2>
      <div style={styles.container2}>
      {categorias.map((categoria, index) => (
        <div key={categoria.id} style={{ ...styles.card, backgroundImage: `url(${categoria.imagen})` }}>
        <Button style={styles.Button}><h3 style={styles.title}>{categoria.titulo}</h3></Button>  
        </div>
      ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    justifyItems: "center",
    marginBottom:"2rem"
  },
  container2: {
    display: "flex",
    flexDirection:"column",
    backgroundImage: `url(${logo})`, 
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    filter: "drop-shadow(5px 5px 10px #000000)",
    gap: "1rem",
    justifyItems: "center",
  
  },
  card: {
    width: "100%",
    maxWidth:"500px",
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
    borderRadius:"24px",
    padding:".5rem"
  },
  title: {
    textAlign: "flex-end",
  },
  Button:{
    background:"black",
    color:"white",
    borderRadius:"24px",
    width:"100%",
    height:"46px"
  },
titSection:{
  display:"flex",
  fontWeight:"500",
  width:"100%",
  fontSize:"32px",
  padding:".5rem"
}
};

export default Categorias;
