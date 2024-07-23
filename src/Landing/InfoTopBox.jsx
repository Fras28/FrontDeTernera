import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const BlackBox = ({ titulo, info, showBackButton = false }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box bg="black" color="white" p={4} borderRadius="24px" maxWidth="md" mx="auto" minH="150px" marginTop="1rem" >
      <VStack align="stretch" spacing={2} padding="1rem">
        {showBackButton && (
          <Button 
            leftIcon={<ChevronLeftIcon />} 
            onClick={handleBack} 
            variant="link" 
            color="white" 
            alignSelf="flex-start" 
            textAlign="left"
            p={0}
          >
            Atrás
          </Button>
        )}
        <Heading as="h1" fontSize="32px" fontWeight="bold" textAlign="left">
          {titulo}
        </Heading>
        <Text fontSize="sm" textAlign="left">
          {info}
        </Text>
      </VStack>
    </Box>
  );
};

export default BlackBox;