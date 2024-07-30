import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const InicioButton = () => {
  return (
    <Button as={RouterLink} to="/" colorScheme="blue">
      Ir inicio
    </Button>
  );
};

export default InicioButton;
