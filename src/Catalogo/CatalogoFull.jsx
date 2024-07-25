import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Flex, Icon, Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
import imgBack from "../assets/HeroBack.png"
import { ArrowBackIcon, ArrowForwardIcon, Search2Icon } from '@chakra-ui/icons';
import CategoryComponent from './Categoria';

const CategoryButton = ({ name }) => (
  <Button
    bg="black"
    color="white"
    borderRadius="full"
    px={6}
    py={2}
    _hover={{ bg: "gray.800" }}
    minWidth="auto"
    whiteSpace="nowrap"
  >
    {name}
  </Button>
);

const CatalogoCompleto = ({ categori }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const categories = ["Ofertas", "Ternera", "Pollo", "Cerdo", "Cordero", "Pescado"];

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
      updateArrowVisibility();
    }
  };

  const updateArrowVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

console.log(categori?.sub_categorias[0].articulos[0].contador, "categori?.sub_categorias");
//                                   .map
//                                                  .map
  useEffect(() => {
    updateArrowVisibility();
  }, []);

  const catalogFull = (
    <VStack spacing={4} width="100%">
      <Button
        position="relative"
        overflow="hidden"
        borderRadius="lg"
        width="100%"
        height="48"
        backgroundImage={`url(${imgBack})`}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          position="absolute"
          inset={0}
          backgroundColor="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box color="white" fontSize="28px" fontWeight="bold">
            CATÁLOGO COMPLETO
          </Box>
        </Box>
      </Button>
      <Box position="relative" maxW="100dvw" mt={4} mb={4}>
        <Flex position="relative" alignItems="center">
          {showLeftArrow && (
            <Button
              onClick={() => scroll(-200)}
              position="absolute"
              left="-1rem"
              zIndex={1}
              bg="white"
              _hover={{ bg: "gray.100" }}
              borderRadius="full"
              size="sm"
            >
              <Icon as={ArrowBackIcon} boxSize={4} color="gray.500" />
            </Button>
          )}
          <Flex
            ref={scrollRef}
            overflowX="scroll"
            scrollBehavior="smooth"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              'scrollbarWidth': 'none',
              '-ms-overflow-style': 'none',
            }}
            gap={4}
            px={4}
          >
            {categories.map((category, index) => (
              <CategoryButton key={index} name={category} />
            ))}
          </Flex>
          {showRightArrow && (
            <Button
              onClick={() => scroll(200)}
              position="absolute"
              right="-1rem"
              zIndex={1}
              bg="white"
              _hover={{ bg: "gray.100" }}
              borderRadius="full"
              size="sm"
            >
              <Icon as={ArrowForwardIcon} boxSize={4} color="gray.500" />
            </Button>
          )}
        </Flex>
      </Box>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
        >
          <Search2Icon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Buscar producto"
          sx={styles.input}
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
        />
      </InputGroup>
      <CategoryComponent />
    </VStack>
  );

  const catalogCategoria = (
    <VStack spacing={4} width="100%">
      <Button
        position="relative"
        overflow="hidden"
        borderRadius="lg"
        width="100%"
        height="48"
        backgroundImage={`url(${imgBack})`}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          position="absolute"
          inset={0}
          backgroundColor="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box color="white" fontSize="28px" fontWeight="bold">
            {categori?.nombre}
          </Box>
        </Box>
      </Button>
      <Box position="relative" maxW="100dvw" mt={4} mb={4}>
        <Flex position="relative" alignItems="center">
          {showLeftArrow && (
            <Button
              onClick={() => scroll(-200)}
              position="absolute"
              left="-1rem"
              zIndex={1}
              bg="white"
              _hover={{ bg: "gray.100" }}
              borderRadius="full"
              size="sm"
            >
              <Icon as={ArrowBackIcon} boxSize={4} color="gray.500" />
            </Button>
          )}
          <Flex
            ref={scrollRef}
            overflowX="scroll"
            scrollBehavior="smooth"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              'scrollbarWidth': 'none',
              '-ms-overflow-style': 'none',
            }}
            gap={4}
            px={4}
          >
            {categori?.sub_categorias?.map((subCat, index) => (
              <CategoryButton key={index} name={subCat.nombre} />
            ))}
          </Flex>
          {showRightArrow && (
            <Button
              onClick={() => scroll(200)}
              position="absolute"
              right="-1rem"
              zIndex={1}
              bg="white"
              _hover={{ bg: "gray.100" }}
              borderRadius="full"
              size="sm"
            >
              <Icon as={ArrowForwardIcon} boxSize={4} color="gray.500" />
            </Button>
          )}
        </Flex>
      </Box>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
        >
          <Search2Icon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Buscar producto"
          sx={styles.input}
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
        />
      </InputGroup>
      {categori?.sub_categorias?.map(subCat => (
  <CategoryComponent
    key={subCat.id}
    nombre={subCat.nombre}
    detalle={subCat.detalle}
    articulos={subCat.articulos}
  />
))}
    </VStack>
  );

  return categori ? catalogCategoria : catalogFull;
};

export default CatalogoCompleto;

const styles = {
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: "12px",
    padding: ".5rem",
    paddingLeft: "2.2rem",
    fontWeight: "500"
  }
};