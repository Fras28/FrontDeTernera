import React from 'react';
import { Box, Image, SimpleGrid, Heading } from "@chakra-ui/react";
import ProductCard from '../Landing/cardProd';


// Componente principal de categoría
const CategoryComponent = ({ categoryName, categoryImage, products }) => (
  <Box my={8}>
    <Box position="relative" mb={6}>
      <Heading
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        color="white"
        fontSize="4xl"
        fontWeight="bold"
        textShadow="2px 2px 4px rgba(0,0,0,0.6)"
        justifyContent="left
        "
      >
        {categoryName}
      </Heading>
    </Box>
    <SimpleGrid columns={[2, null, 3, 4]} spacing={4}>
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </SimpleGrid>
  </Box>
);

// Ejemplo de uso con datos simulados
const CategoryExample = () => {
  const categoryData = {
    categoryName: "Ofertas",
    categoryImage: "/api/placeholder/800/300",
    products: [
      { id: 1, name: "New brand name", price: 12900 },
      { id: 2, name: "Another product", price: 15900 },
      { id: 3, name: "Special offer", price: 9900 },
      { id: 4, name: "Premium cut", price: 19900 },
      { id: 5, name: "Family pack", price: 25900 },
      { id: 6, name: "Gourmet selection", price: 22900 },
      { id: 7, name: "Economy choice", price: 8900 },
      { id: 8, name: "Seasonal special", price: 17900 },
    ]
  };

  return <CategoryComponent {...categoryData} />;
};

export default CategoryExample;