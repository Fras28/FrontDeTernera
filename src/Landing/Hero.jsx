import React from 'react';
import bgHero from "../assets/HeroBack.png"

const Hero = () => {
  return (
    <div className='contHero'>
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
        <button className="cta-button">
          Consultar productos
        </button>
      </div>
    </div>  
    </div>
  );
};

export default Hero;