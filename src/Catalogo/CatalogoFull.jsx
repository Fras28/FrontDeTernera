import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  InputRightElement,
} from "@chakra-ui/react";
import imgBack from "../assets/HeroBack.png";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  Search2Icon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import CategoryComponent from "./Categoria";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../Landing/cardProd";

const CategoryButton = ({ name, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`#${id}`);
  };

  return (
    <Button
      bg="black"
      color="white"
      borderRadius="full"
      px={6}
      py={2}
      _hover={{ bg: "gray.800" }}
      minWidth="auto"
      whiteSpace="nowrap"
      onClick={handleClick}
    >
      {name}
    </Button>
  );
};

const CatalogoCompleto = ({ categori }) => {
  const scrollRef = useRef(null);
  const location = useLocation();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const cati = useSelector((state) => state.allData.categories);
  const categoris = cati?.map((cat) => ({ id: cat?.id, nombre: cat?.nombre }));

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const scrollContainer = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
      updateArrowVisibility();
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      // Mostrar todos los elementos si searchTerm está vacío
      if (categori) {
        const allItems = categori.sub_categorias.flatMap(
          (subCat) => subCat.articulos
        );
        setFilteredItems(allItems);
      } else {
        const allItems = cati.flatMap((cat) =>
          cat.sub_categorias.flatMap((subCat) => subCat.articulos)
        );
        setFilteredItems(allItems);
      }
    } else {
      // Filtrar los elementos si searchTerm tiene algún valor
      if (categori) {
        const filtered = categori.sub_categorias.flatMap((subCat) =>
          subCat.articulos.filter((articulo) =>
            Object.values(articulo).some((value) =>
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
        );
        setFilteredItems(filtered);
      } else {
        const filtered = cati.flatMap((cat) =>
          cat.sub_categorias.flatMap((subCat) =>
            subCat.articulos.filter((articulo) =>
              Object.values(articulo).some((value) =>
                value
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
            )
          )
        );
        setFilteredItems(filtered);
      }
    }
  }, [searchTerm, categori, cati]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const updateArrowVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    updateArrowVisibility();
  }, []);

  const renderSearchResults = () => (
    <VStack spacing={4} width="100%">
      <Heading size="lg">Resultados de búsqueda</Heading>
      {filteredItems?.map((item, index) => (
        <Box key={item?.id} p={4} borderWidth={1} borderRadius="md">
          <ProductCard key={index} product={item} />
        </Box>
      ))}
    </VStack>
  );

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
              onClick={() => scrollContainer(-200)}
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
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
            }}
            gap={4}
            px={4}
          >
            {categoris.map((category) => (
              <CategoryButton
                key={category.id}
                name={category.nombre}
                id={category.id}
              />
            ))}
          </Flex>
          {showRightArrow && (
            <Button
              onClick={() => scrollContainer(200)}
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
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Buscar producto"
          sx={styles.input}
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightElement onClick={() => setSearchTerm("")} cursor="pointer">
          <SmallCloseIcon color="gray.500" />
        </InputRightElement>
      </InputGroup>
      {searchTerm
        ? renderSearchResults()
        : cati?.map((Cat) => (
            <div key={Cat.id} id={Cat.id}>
              <Heading
                color="black"
                fontSize="4xl"
                fontWeight="bold"
                textShadow="2px 2px 4px rgba(0,0,0,0.6)"
                textAlign="left"
                marginLeft="1rem"
              >
                {Cat?.nombre}
              </Heading>
              {Cat.sub_categorias?.map((subCat) => (
                <CategoryComponent
                  key={subCat.id}
                  detalle={subCat.detalle}
                  articulos={subCat.articulos}
                />
              ))}
            </div>
          ))}
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
              onClick={() => scrollContainer(-200)}
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
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
            }}
            gap={4}
            px={4}
          >
            {categoris.map((category) => (
              <CategoryButton
                key={category.id}
                name={category.nombre}
                id={category.id}
              />
            ))}
          </Flex>
          {showRightArrow && (
            <Button
              onClick={() => scrollContainer(200)}
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
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Buscar producto"
          sx={styles.input}
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      {searchTerm
        ? renderSearchResults()
        : categori?.sub_categorias?.map((subCat) => (
            <CategoryComponent
              key={subCat.id}
              detalle={subCat.detalle}
              articulos={subCat.articulos}
            />
          ))}
    </VStack>
  );

  return (
    <Flex
      direction="column"
      alignItems="center"
      p={{ base: 2, md: 4 }}
      width="100%"
      mt="20"
    >
      {categori ? catalogCategoria : catalogFull}
    </Flex>
  );
};

const styles = {
  input: {
    border: "2px solid transparent",
    borderRadius: "md",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease-in-out",
    _hover: {
      borderColor: "blue.500",
    },
  },
};

export default CatalogoCompleto;
