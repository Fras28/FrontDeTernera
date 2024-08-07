import React from 'react';
import { Box, SimpleGrid, Heading, Grid } from "@chakra-ui/react";
import ProductCard from '../Landing/cardProd';






// { nombre, detalle, articulos }
export default function CategoryComponent({Categoria}) {
  return (
    <Box my={1}>
      <Box display="flex">
        <Heading
          color="black"
          fontSize="1.2rem"
          fontWeight="bold"
          textAlign="left"
          paddingLeft="1rem"
          margin=".5rem 0"
        >
          {Categoria?.nombre}
        </Heading>
      </Box>
      <Grid gridTemplateColumns={"1fr 1fr"} gridGap={".5rem"}>
        {Categoria?.articulos?.map((categor, index) => (
          <ProductCard key={index} product={categor} />
        ))}
      </Grid>
    </Box>

  );
}
