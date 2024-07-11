import React, { useState } from 'react';
import { Parallax } from 'react-parallax';
import { Box, Button, Heading, Text, Image, Img } from '@chakra-ui/react';
import carne from "../assets/carne.png"
import bgImg from "../assets/bgButcher.jpg"



const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }
  return (
    <Parallax

      bgImage={bgImg}
      strength={500}
      bgImageStyle={{
        left: '50%',
        transform: 'translate3d(-50%, -53.1804px, 0px)',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        minHeight:'28vh',
        height: 'auto',
        width: '1920px',
        filter: 'none',        
      }}
      
      className='paralaxStyle'
    >
      
      <Box className='boxHero' display="flex" justifyContent="center" alignItems="center" bg="rgba(0, 0, 0, 0.5)">
        <Box textAlign="center" color="white" position="relative">
        <Heading
      as="h1"
      size="2xl"
      mb="4"
       sx={{ 
        WebkitTextStroke: "2px #2e1f13",
        fontFamily: "Berkshire Swash, serif"
      }}
    >
    <Img src={carne} width="15%" margin="auto" style={{  filter:" drop-shadow(5px 5px 10px #000000)",}}/>
    </Heading>
          <Text fontSize="xl" mb="6" color={"#F28A2E"} fontWeight={600}>
           Servicio de la mejor calidad
          </Text>
          <Button style={{backgroundColor:"#FFBB10", border:"solid #2E1F13 4px", borderRadius:"12px"}} size="lg" leftIcon={""} onClick={openModal}>
            Ir a Catalogo !
          </Button>
          <Text fontSize="l" mb="6">
          Provincia | Direccion | Telefono 
          </Text>
        </Box>
      </Box>

        {/* Modal para NuevaReserva */}
        {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
          </div>
        </div>
      )}
    </Parallax>
  );
};

export default Hero;
