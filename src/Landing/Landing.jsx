import React from "react";
import TopNav from "./logoTop";
import Hero from "./Hero";
import SimpleThreeColumns from "./InfoGroup";
import BottomNav from "./BottomNav";
import Categorias from "./Categorias";
import Carousel from "./MasVendidos";
import FirtsInfo from "./FirstInfo";



function Landing() {
  return (
    <div style={styles.container}>
      <TopNav />
      <div style={{padding:"1rem"}}>
      <Hero />
      <FirtsInfo/>
      <Categorias/>
      {/* <SimpleThreeColumns /> */}
      <Carousel/>
      </div>
      <BottomNav />
    </div>
  );
}

export default Landing;

const styles = {
    container: {
  paddingBottom:"5rem",
    },

  };