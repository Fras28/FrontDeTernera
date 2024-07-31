import React, { useState, useEffect } from "react";
import TopNav from "./logoTop";
import Hero from "./Hero";
import SimpleThreeColumns from "./InfoGroup";
import BottomNav from "./BottomNav";
import Categorias from "./Categorias";
import Carousel from "./MasVendidos";
import FirtsInfo from "./FirstInfo";
import { useSelector } from "react-redux";
import BlackBoxBottom from "./InfoBottomBox";

function Landing() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const categorias = useSelector(state=> state.allData.categories)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>
      <TopNav />
      <div style={styles.container2}>
        <div
          style={{
            ...styles.hero,
            flexDirection: isMobile ? "column" : "row-reverse",
          }}
        >
          <Hero />
        </div>
        <FirtsInfo />
        <Categorias />
        {/* <SimpleThreeColumns /> */}
        <Carousel />
      <BlackBoxBottom  titulo1={"Horarios de atención"}  info1="lu - vie: 00:00 a 00:00"  titulo2="Contacto" info2="(291)xxx xxx x" />
      </div>
      <BottomNav />
    </div>
  );
}

export default Landing;

const styles = {
  contaiiner: { paddingBottom: "60px" },
  container2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    paddingBottom:"80px",
    overflow:"hidden"
  },
  hero: {
    display: "flex",
    alignItems: "center",
    overflow:"hidden"
  },
};
