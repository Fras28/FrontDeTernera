import React, { useState } from 'react';
import { Box, Text, Flex, Button, VStack, HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { PedidoCanceladoAdmin, PedidoCompletAdmin } from '../Redux/Slice';

const OrderBox = ({ date, orderNumber, total, items, key, estado }) => {
  const dispatch = useDispatch();
  const { role } = useSelector(state => state.user)
  const [isExpanded, setIsExpanded] = useState(false);
console.log(estado,"estado");

  const toggleExpand = () => setIsExpanded(!isExpanded);

const handleCancel= ()=>{
  dispatch(PedidoCanceladoAdmin(orderNumber))
}



const handeComplet= ()=>{
  dispatch(PedidoCompletAdmin(orderNumber))
}

const backgroundColor = key % 2 === 0 ? 'gray.400' : 'white';

return (
  <Box 
  bg={backgroundColor} 
  w="100%" 
  borderRadius="xl" 
  overflow="hidden"
  border={
    estado === "en_proceso" ? "1px solid blue" :
    estado === "cancelado" ? "1px solid red" :
    estado === "finalizado" ? "1px solid green" :
    "1px solid orange"
  }
>
    <Flex 
      justifyContent="space-between" 
      alignItems="center" 
      p={4} 
      onClick={toggleExpand}
      cursor="pointer"
    >
      <VStack align="start" spacing={1}>
        <Text fontSize="sm" color="gray.500">{date}</Text>
        <Text fontWeight="bold">Pedido#{orderNumber}</Text>
        <Text fontWeight="bold">${total}</Text>
      </VStack>
      {role === "Admin" ? (
        <HStack>
          <Button
            size="sm"
            variant="outline"
            colorScheme="red"
            rounded="full"
            w="30px"
            h="30px"
            p={0}
            onClick={handleCancel} // Aquí no usas paréntesis
          >
            ✕
          </Button>
          <Button
            size="sm"
            variant="outline"
            colorScheme="green"
            rounded="full"
            w="30px"
            h="30px"
            p={0}
            onClick={handeComplet} // Aquí tampoco usas paréntesis
          >
            ✓
          </Button>
        </HStack>
      ) : null}
    </Flex>
    {isExpanded && (
      <Box p={2} borderTop="1px solid #E2E8F0">
        <Flex 
          justify="space-between" 
          p={0}
          borderBottom="1px black solid"
        >
          <Text fontSize="sm" w="50%">Articulo</Text>
          <Text fontSize="sm" >Cantidad</Text>
          <Text fontSize="sm" w="30%">Valor</Text>
        </Flex>
        <VStack align="stretch" spacing={2}>
          {items.map((item, index) => (
            <Flex 
              key={index} 
              justify="space-between" 
              bg={index % 2 === 0 ? 'white' : 'gray.200'}
              p={2}
              borderRadius="md"
            >
              <Text fontSize="sm" w="50%">
                {item?.attributes?.articulo?.data?.attributes?.nombre} /
                {item?.attributes?.valor?.data?.attributes?.nombre}
              </Text>
              <Text fontSize="sm" >{item?.attributes?.cantidad}u.</Text>
              <Text fontSize="sm" w="30%">${item?.attributes?.precio_unitario}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    )}
  </Box>
);
};

export default OrderBox;