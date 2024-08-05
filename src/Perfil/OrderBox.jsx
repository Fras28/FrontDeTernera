import React, { useState } from 'react';
import { Box, Text, Flex, Button, VStack, HStack } from '@chakra-ui/react';

const OrderBox = ({ date, orderNumber, total, items, key }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const backgroundColor = key % 2 === 0 ? 'gray.400' : 'white';

  return (
    <Box 
      bg={backgroundColor} 
      w="100%" 
      borderRadius="xl" 
      boxShadow="md" 
      overflow="hidden"
      border="1px solid #E2E8F0"
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
        <HStack>
          <Button
            size="sm"
            variant="outline"
            colorScheme="red"
            rounded="full"
            w="30px"
            h="30px"
            p={0}
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
          >
            ✓
          </Button>
        </HStack>
      </Flex>
      {isExpanded && (
        <Box p={2} borderTop="1px solid #E2E8F0">
            <Flex 
                justify="space-between" 
                p={0}
                borderBottom="1px black solid"
              >
                <Text fontSize="sm" w="50%">Articulo</Text>
                <Text fontSize="sm" >cantindad</Text>
                <Text fontSize="sm" w="30%">valor</Text>
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
                <Text fontSize="sm" w="50%">{item?.attributes?.articulo?.data?.attributes?.nombre} /{item?.attributes?.valor?.data?.attributes?.nombre}</Text>
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