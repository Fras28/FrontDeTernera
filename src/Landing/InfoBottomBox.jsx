import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const BlackBoxBottom = ({ titulo1, info1,titulo2, info2 }) => {


  return (
    <Box bg="#2E2E2E" color="white" p={4} borderRadius="24px"  width={"100%"} marginBottom={"2rem"}>
      <VStack align="stretch" spacing={2} padding="1rem" >
        <Heading as="h1" fontSize="24px" fontWeight="bold" textAlign="left">
          {titulo1}
        </Heading>
        <Text fontSize="1rem" textAlign="left">
          {info1}
        </Text>
        <Heading as="h1" fontSize="24px" fontWeight="bold" textAlign="left">
          {titulo2}
        </Heading>
        <Text fontSize="1rem" textAlign="left">
          {info2}
        </Text>
      </VStack>
    </Box>
  );
};

export default BlackBoxBottom;