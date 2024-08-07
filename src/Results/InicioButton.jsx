import React from 'react';
import { border, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { color } from 'framer-motion';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const InicioButton = () => {
  return (
    <Button as={NavLink} to="/" colorScheme="blue" style={styles}>
      Ir inicio
    </Button>
  );
};

export default InicioButton;


const styles = {
  borderRadius:"16px",
  backgroundColor :"#CA0017",
  color:"white",
  width:"100%"
}