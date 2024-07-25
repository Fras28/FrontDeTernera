import React from 'react';
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import ProductCard from '../Landing/cardProd';

export default function CategoryComponent({ nombre, detalle, articulos }) {
  return (
    <Box my={8}>
      <Box mb={6} display="flex">
        <Heading
          color="black"
          fontSize="4xl"
          fontWeight="bold"
          textShadow="2px 2px 4px rgba(0,0,0,0.6)"
          textAlign="left"
          marginLeft="1rem"
        >
          {nombre}
        </Heading>
      </Box>
      <SimpleGrid columns={[2, null, 3, 4]} spacing={4}>
        {articulos?.map((producto, index) => (
          <ProductCard key={index} product={producto} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
