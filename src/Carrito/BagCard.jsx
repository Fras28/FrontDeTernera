import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { removeFromCart, updateCartQuantity } from "../Redux/Slice";
import { useDispatch } from "react-redux";

const BagCard = ({ producto }) => {
  const dispatch = useDispatch();
  const [cantidad, setCantidad] = useState(producto?.quantity);

  const handleRemoveFromCart = () => {
    if (producto) {
      dispatch(
        removeFromCart({
          articleId: producto.articleId,
          valorId: producto.valorId,
        })
      );
      setCantidad(0);
    }
  };

  const incrementarCantidad = () => {
    const newQuantity = cantidad + 1;
    setCantidad(newQuantity);
    dispatch(
      updateCartQuantity({
        articleId: producto.articleId,
        valorId: producto.valorId,
        quantity: newQuantity,
      })
    );
  };

  const decrementarCantidad = () => {
    if (cantidad > 0) {
      const newQuantity = cantidad - 1;
      if (newQuantity === 0) {
        handleRemoveFromCart();
      } else {
        setCantidad(newQuantity);
        dispatch(
          updateCartQuantity({
            articleId: producto.articleId,
            valorId: producto.valorId,
            quantity: newQuantity,
          })
        );
      }
    }
  };

  return (
    <HStack
      bg="white"
      w="100%"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      mb={3}
      display="flex"
      justifyContent="space-between"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <VStack align="start" spacing={1}>
          <Box bg="black" color="white" px={2} py={1} borderRadius="full">
            <Text fontSize="xs">{producto?.valor}</Text>
          </Box>
          <Text fontWeight="medium">{producto?.name}</Text>
          <Text fontWeight="bold">Unit: ${producto?.precioFinal}</Text>
          <Text fontWeight="bold">
            Total: ${producto?.precioFinal * producto?.quantity}
          </Text>
        </VStack>
      </Flex>
      <Flex
        justify="center"
        alignItems="center"
        mb={4}
        overflow="hidden"
        borderRadius="full"
        width="100px"
        height="40px"
        bg="black"
        color="white"
      >
        <Button
          onClick={decrementarCantidad}
          bg="black"
          color="white"
          borderRadius="none"
          height="100%"
          width="33%"
          _hover={{ bg: "gray.800" }}
          _active={{ bg: "gray.700" }}
        >
          -
        </Button>
        <Box
          width="34%"
          bg="white"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="solid black 2px"
        >
          <Text fontSize="lg" color="black" fontWeight="bold">
            {cantidad}
          </Text>
        </Box>
        <Button
          onClick={incrementarCantidad}
          bg="black"
          color="white"
          borderRadius="none"
          height="100%"
          width="33%"
          _hover={{ bg: "gray.800" }}
          _active={{ bg: "gray.700" }}
        >
          +
        </Button>
      </Flex>
    </HStack>
  );
};

export default BagCard;
