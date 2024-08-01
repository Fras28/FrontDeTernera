import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { removeFromCart, updateCartQuantity } from "../Redux/Slice";
import { useDispatch } from "react-redux";
import imgArt from "../assets/articulos.png"

const HistorialCard = ({ producto }) => {
  const dispatch = useDispatch();
  const [cantidad, setCantidad] = useState(producto?.quantity);

  // Calcular el valor con descuento
  const valorConDescuento = producto?.precioKG - (producto?.precioKG * (producto?.DescPorciento / 100));

  console.log(producto, "producto");

  return (
    <HStack
      w="100%"
      p={4}
      borderBottom="solid 1px lightgrey"
      display="flex"
      justifyContent="space-between"
    >
      <Flex height={"100%"} >
        <img src={imgArt} alt="imgArt"  style={{height:"68px"}} />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <VStack align="start" spacing={1} gap="0">
          <Box bg="black" color="white" px={2} py={1} borderRadius="full">
            <Text fontSize="xs">
              {producto.DescPorciento > 0 ? valorConDescuento.toFixed(2) : producto?.valor}
            </Text>
          </Box>
          <Text fontWeight="medium" fontSize="16px">{producto?.nombre}</Text>
          <Text 
            fontWeight="bold" 
            color={producto.DescPorciento > 0 ? "green.500" : "inherit"}
          >
            ${valorConDescuento} /u.
          </Text>
          {producto.DescPorciento > 0 && (
            <Text fontSize="xs" color="green.500" style={{textAlign:"left" ,  textWrap: "nowrap"}} >
              {producto.DescPorciento}% descuento aplicado
            </Text>
          )}
        </VStack>
      </Flex>
    </HStack>
  );
};

export default HistorialCard;
