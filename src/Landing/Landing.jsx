import React, { useState, useEffect } from "react";
import TopNav from "./logoTop";
import Hero from "./Hero";
import SimpleThreeColumns from "./InfoGroup";
import BottomNav from "./BottomNav";
import Categorias from "./Categorias";
import Carousel from "./MasVendidos";
import FirtsInfo from "./FirstInfo";
import { useDispatch } from "react-redux";
import { uploadProducts } from "../Redux/Slice";

function Landing() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.contaiiner}>
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
    paddingBottom: "80px",
    overflow: "hidden",
  },
  hero: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
};
