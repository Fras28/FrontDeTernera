import React from 'react';
import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const InicioButton = () => {
  return (
    <Button as={NavLink} to="/" colorScheme="blue">
      Ir inicio
    </Button>
  );
};

export default InicioButton;
