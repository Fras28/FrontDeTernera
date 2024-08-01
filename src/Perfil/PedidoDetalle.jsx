import { Box, Button, ChakraProvider, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import BlackBox from "../Landing/InfoTopBox";
import Carousel from "../Landing/MasVendidos";
import HistorialCard from "./HistorialCard";

export default function PedidoDetalle() {
  const scrollRef = useRef(null);
  const { id } = useParams();
  const location = useLocation();
  const { pedidos } = useSelector(state => state.allData);
  
  console.log(pedidos, "pedidos");
  
  const estePedido = pedidos.find(pedido => pedido.id == id);
  console.log(estePedido, "estePedido");

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

  return (
    <ChakraProvider>
      <Box position="relative" minHeight="100vh" bg="#F5F5F5">
        <VStack spacing={4} p={4} pb="180px">
          <BlackBox
            titulo={`Detalle pedido #${id}`}
            info="Aqui encontraras el detalle de tu pedido ya realizado"
            showBackButton={true}
          />
          <VStack w="100%" spacing={0}>
            {estePedido?.articulos?.map((producto, index) => (
              <HistorialCard key={index} producto={producto} />
            ))}
          </VStack>
          {/* <Carousel/> */}
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
            <Text fontSize="24px" fontWeight="bold">{estePedido?.total || '0.00'}</Text>
          </Flex>
        </Box>
      </Box>
    </ChakraProvider>
  );
}