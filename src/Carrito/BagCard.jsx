import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { removeFromCart, updateCartQuantity } from "../Redux/Slice";
import { useDispatch, useSelector } from "react-redux";
import imgArt from "../assets/articulos.png";

const BagCard = ({ producto }) => {
  const dispatch = useDispatch();
  const {articulos,valores} = useSelector(state => state)
  const medida = valores?.find((art) => art.id === producto?.valorId);
  const Descuento = articulos?.find((art) => art.id === producto?.articleId);
  console.log(medida?.attributes?.nombre,"producto formato");
  
  const artDesct= Descuento?.DescPorciento;
  const articulo = producto?.attributes?.articulo;
  const valor = producto?.attributes?.valor;
  const valorNombre = medida?.attributes?.nombre;

  const [cantidad, setCantidad] = useState(producto?.quantity);

  useEffect(() => {
    setCantidad(producto?.quantity
      ); // Actualiza la cantidad si el producto cambia
  }, [producto]);

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
    if (cantidad > 1) {
      const newQuantity = cantidad - 1;
      setCantidad(newQuantity);
      dispatch(
        updateCartQuantity({
          articleId: producto.articleId,
          valorId: producto.valorId,
          quantity: newQuantity,
        })
      );
    } else if (cantidad === 1) {
      handleRemoveFromCart(); // Remover del carrito si cantidad llega a 0
    }
  };

  return (
    <HStack
      w="100%"
      p={4}
      borderBottom="solid 1px lightgrey"
      spacing={0}
    >
      {/* Columna 1: Imagen */}
      <Flex
        flex={1} // Hace que esta columna ocupe 1/3 del espacio disponible
        justifyContent="center"
        alignItems="center"
      >
        <img src={imgArt} alt="imgArt" style={{ height: "68px" }} />
      </Flex>
  
      {/* Columna 2: Información del Producto */}
      <Flex
        flex={1} // Hace que esta columna ocupe 1/3 del espacio disponible
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
      >
        <VStack align="start" spacing={1} gap="0">
          <Box bg="black" color="white" px={2} py={1} borderRadius="full">
            <Text fontSize="xs">{valorNombre}</Text>
          </Box>
          <Text fontWeight="medium" fontSize="16px">
            {Descuento?.nombre}
          </Text>
          <Text
            fontWeight="bold"
            color={
              artDesct > 0
                ? "green.500"
                : "inherit"
            }
          >
            ${producto?.precio_unitario}/u.
          </Text>
          {artDesct > 0 && (
            <Text
              fontSize="xs"
              color="green.500"
              style={{ textAlign: "left", textWrap: "nowrap" }}
            >
              {artDesct}% descuento aplicado
            </Text>
          )}
        </VStack>
      </Flex>
  
      {/* Columna 3: Controles de Cantidad */}
      <Flex
        flex={1} // Hace que esta columna ocupe 1/3 del espacio disponible
        justify="center"
        alignItems="center"
        mb={4}
        overflow="hidden"
        borderRadius="full"
        bg="black"
        color="white"
        width="100%"
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
          bg="white"
          height="46px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="solid black 2px"
          width="33%"
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
}  

export default BagCard;
