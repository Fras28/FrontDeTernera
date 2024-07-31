import React from 'react';
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import ProductCard from '../Landing/cardProd';
// { nombre, detalle, articulos }
export default function CategoryComponent({Categoria}) {
  return (
    <Box my={1}>
      <Box mb={6} display="flex">
        <Heading
          color="black"
          fontSize="4xl"
          fontWeight="bold"
          textShadow="2px 2px 4px rgba(0,0,0,0.6)"
          textAlign="left"
          marginLeft="1rem"
        >
          {Categoria?.nombre}
        </Heading>
      </Box>
      <SimpleGrid columns={[2, null, 3, 4]} spacing={4}>
        {Categoria?.articulos?.map((producto, index) => (
          <ProductCard key={index} product={producto} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
