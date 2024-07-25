import React from 'react';
import bgHero from "../assets/HeroBack.png"
import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import "./Landing.css";

const Hero = () => {
  return (
    <div className='contHero'>
      <div>
        
      </div>
    <div className="meat-quality-card">
      <img 
        src={bgHero} 
        alt="High quality meat cuts" 
        className="meat-image"
      />
      <div className="overlayHero">
        <h2 className="titleHero">
          CARNES DE CALIDAD
        </h2>
        <Button as={NavLink} to="/CatFull" style={styles.ctaButton}>
          Consultar productos
        </Button>
      </div>
    </div>  
    </div>
  );
};

export default Hero;


const styles = {
  ctaButton :{
    width: '100%',
    height: '15%',
    padding: '10px',
    backgroundColor: '#ca0017',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    fontSize: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    _hover:{
      backgroundColor:" #c53030"
    },
    transition: 'background-color 0.3s ease',
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
  }
}