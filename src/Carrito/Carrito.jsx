import React, { useEffect, useRef } from "react";
import { Box, Text, VStack, Flex, ChakraProvider, Button } from "@chakra-ui/react";
import BlackBox from "../Landing/InfoTopBox";
import BagCard from "./BagCard";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "../Landing/MasVendidos";
import { finalizarPedido, updateCartQuantity } from "../Redux/Slice";


export default function Carrito() {
  const scrollRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pedidoActual } = useSelector(state => state); // Obtén el estado del carrito

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleQuantityChange = (articleId, valorId, quantity) => {
    dispatch(updateCartQuantity({ articleId, valorId, quantity }));
  };

  const handleFinalizarPedido = () => {
    if (pedidoActual?.id) {
      dispatch(finalizarPedido(pedidoActual.id)).then(() => {
        navigate('/ruta-de-confirmacion'); // Redirige a una página de confirmación o similar
      });
    }
  };

  return (
    <ChakraProvider>
      <Box position="relative" minHeight="100vh" bg="#F5F5F5">
        <VStack spacing={4} p={4} pb="180px">
          <BlackBox
            titulo={`Mi carrito #${pedidoActual?.id}`}
            info="Revisá que estén todos los productos que estás buscando"
            showBackButton={true}
          />
          <VStack w="100%" spacing={0}>
            {pedidoActual?.attributes?.pedido_articulos.map((product, index) => (
              <BagCard
                key={index}
                producto={product}
                onQuantityChange={handleQuantityChange} // Pasar la función de manejo de cantidad
              />
            ))}
          </VStack>
          <Carousel />
        </VStack>
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bg="white"
          p={4}
          boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1)"
        >
          <Flex justifyContent="flex-start" alignItems="center" gap=".4rem">
            <Text fontSize="24px" fontWeight="bold">Total:</Text>
            <Text fontSize="24px" fontWeight="bold">$</Text>
            <Text fontSize="24px" fontWeight="bold">{pedidoActual?.attributes?.total?.toFixed(2)}</Text>
          </Flex>
          <Button
            w="100%"
            borderRadius={"24px"}
            bgColor="#CA0017"
            color="white"
            fontSize="1rem"
            height="3rem"
            onClick={handleFinalizarPedido} // Manejo del clic para finalizar el pedido
          >
            Continuar
          </Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
