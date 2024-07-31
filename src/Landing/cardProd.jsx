import React from "react";
import { Box, Text, Button, Flex, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import carnde from "../assets/articulos.png";
import "./Landing.css";

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    if (typeof price !== "number") return price;
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  console.log(product, "product id");

  return (
    <Box className="card" position="relative">
      {product?.DescPorciento != null && product?.DescPorciento !== 0 && (
        <Box
          position="absolute"
          top="15px"
          left="15px"
          bg="#318215"
          color="white"
          px="2"
          py="1"
          borderRadius="md"
          fontSize="sm"
          fontWeight="bold"
          zIndex="1"
        >
          -{product.DescPorciento}%
        </Box>
      )}
      <Box className="image_container">
        <img src={carnde} alt="carnde" width="100%" loading="Lazy" />
      </Box>
      <Box className="title">
        <Text>{product?.nombre}</Text>
      </Box>
      <Box className="price">
        {product?.DescPorciento != null && product?.DescPorciento !== 0 ? (
          <VStack alignItems="left" gap={1}>
            <Text color="#318215" fontWeight="bold">
              ${formatPrice(calculateDiscountedPrice(Number(product?.precioKG), product?.DescPorciento))} /Kg
            </Text>
            <Text as="s" fontSize="xs" color="gray.500" >
              ${formatPrice(Number(product?.precioKG))} /Kg
            </Text>
          </VStack>
        ) : (
          <Text>${formatPrice(Number(product?.precioKG))} /Kg</Text>
        )}
      </Box>
      <Flex className="action">
        <Button
          as={NavLink}
          to={`/ProdDetalle/${product?.id}`}
          bgColor="#CA0017"
          color="white"
          width="100%"
          borderRadius="24px"
          height="45px"
        >
          Agregar
        </Button>
      </Flex>
    </Box>
  );
};

export default ProductCard;