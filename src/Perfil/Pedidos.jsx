import React, { useEffect } from "react";
import { Box, Text, VStack, Flex, ChakraProvider, Button, Spinner } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import BlackBox from "../Landing/InfoTopBox";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPedidosUser } from "../Redux/Slice";

const Arrow = (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.15 6.99952H1C0.716667 6.99952 0.479167 6.90369 0.2875 6.71202C0.0958333 6.52036 0 6.28286 0 5.99952C0 5.71619 0.0958333 5.47869 0.2875 5.28702C0.479167 5.09536 0.716667 4.99952 1 4.99952H12.15L9.3 2.14952C9.1 1.94952 9.00417 1.71619 9.0125 1.44952C9.02083 1.18286 9.11667 0.949523 9.3 0.749523C9.5 0.549523 9.7375 0.445357 10.0125 0.437023C10.2875 0.42869 10.525 0.524523 10.725 0.724523L15.3 5.29952C15.4 5.39952 15.4708 5.50786 15.5125 5.62452C15.5542 5.74119 15.575 5.86619 15.575 5.99952C15.575 6.13286 15.5542 6.25786 15.5125 6.37452C15.4708 6.49119 15.4 6.59952 15.3 6.69952L10.725 11.2745C10.525 11.4745 10.2875 11.5704 10.0125 11.562C9.7375 11.5537 9.5 11.4495 9.3 11.2495C9.11667 11.0495 9.02083 10.8162 9.0125 10.5495C9.00417 10.2829 9.1 10.0495 9.3 9.84952L12.15 6.99952Z" fill="#1C1B1F"/>
  </svg>
);

const OrderBox = ({ date, orderNumber, total }) => (
  <Box bg="white" w="100%" p={4} borderRadius="lg" boxShadow="md" mb={3}>
    <Flex justifyContent="space-between" alignItems="center">
      <VStack align="start" spacing={1}>
        <Box bg="black" color="white" px={2} py={1} borderRadius="full">
          <Text fontSize="xs">{date}</Text>
        </Box>
        <Text fontWeight="medium">Pedido n° {orderNumber}</Text>
        <Text fontWeight="bold">Total: $ {total}</Text>
      </VStack>
     <Button as={NavLink} to={`/Pedidos/${orderNumber}`}>{Arrow}</Button> 
    </Flex>
  </Box>
);

export default function Pedidos() {
  const dispatch = useDispatch();
  const { pedidos, user, status, error } = useSelector(state => state);
  
  useEffect(() => {
    dispatch(fetchPedidosUser());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <ChakraProvider>
      <VStack spacing={4} p={4} bg="#F5F5F5" minH="100vh">
        <BlackBox
          titulo="Pedidos"
          info="Seleccioná cualquiera de los pedidos para conocer el detalle del mismo."
          showBackButton={true}
        />
        {status === 'loading' && <Spinner />}
        {status === 'failed' && <Text color="red.500">Error: {error}</Text>}
        {status === 'succeeded' && pedidos && pedidos.length > 0 ? (
          pedidos.map(pedido => (
            <OrderBox 
              key={pedido.id}
              date={formatDate(pedido.createdAt)} 
              orderNumber={pedido.id} 
              total={pedido.total} 
            />
          ))
        ) : status === 'succeeded' ? (
          <Text>No hay pedidos disponibles.</Text>
        ) : null}
      </VStack>
    </ChakraProvider>
  );
}