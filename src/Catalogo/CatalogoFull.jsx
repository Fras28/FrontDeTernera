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
import Carousel from "../Landing/MasVendidos";
import Carne from "../assets/CatCarne.png";
import Oferta from "../assets/CatOfer.png";
import Pollo from "../assets/CatPollo.png";
import Cerdo from "../assets/CatCerdo.png";
import Achuras from "../assets/CatAchuras.jpg";

const categoryImages = {
  "Productos en Ofertas": Oferta,
  "Productos De Ternera": Carne,
  "Productos de Pollo": Pollo,
  "Productos de Cerdo": Cerdo,
  Achuras: Achuras,
};

const API_BASE = process.env.REACT_APP_API_BASE;

const CategoryButton = ({ name, id }) => {
  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
  const cati = useSelector((state) => state.categories);
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
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Usar setTimeout para asegurar que el desplazamiento ocurra después de que el componente se haya renderizado completamente
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      // Si no hay hash, desplazar al inicio de la página
      window.scrollTo(0, 0);
    }
  }, [location, categori]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      // Mostrar todos los elementos si searchTerm está vacío
      if (categori) {
        const allItems = categori?.sub_categorias?.flatMap(
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
              value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
                  ?.toString()
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
      {filteredItems.length > 0 ? (
        filteredItems?.map((item, index) => (
          <Box key={item?.id} p={4} borderWidth={1} borderRadius="md">
            <ProductCard key={index} product={item} />
          </Box>
        ))
      ) : (
        <p>No se encontro ningun articulo con esas caracteristicas</p>
      )}
    </VStack>
  );

  const getCategoryImage = (categoryName) => {
    return categoryImages[categoryName];
  };

  const catalogFull = (
    <VStack spacing={4} width="100%">
      <Box
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
      </Box>
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
              "&::WebkitScrollbar": {
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
      <InputGroup bgColor={"#F2F2F2"}>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Buscar producto"
          sx={styles.input}
          _focus={{ borderColor: "blue.500" }}
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
                textAlign="center"
                marginLeft="1rem"
              >
                {Cat?.nombre}
              </Heading>
              {Cat.sub_categorias?.map((subCat) => (
                <CategoryComponent
                  key={subCat.id}
                  Categoria={subCat}
                  id={subCat.id}
                />
              ))}
            </div>
          ))}
    </VStack>
  );

  const catalogCategoria = (
    <VStack spacing={4} width="100%" marginTop={"0"}>
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="24px"
        width="100%"
        height="110px"
        backgroundImage={`url(${getCategoryImage(categori?.nombre)})`}
        // backgroundImage={`url(${API_BASE}${categori?.img?.data[0].attributes?.url})`}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          position="absolute"
          inset={0}
          backgroundColor="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          justifyContent="left"
          padding={"1.5rem"}
        >
          <Box
            color="white"
            fontSize="40px"
            fontWeight="bold"
            textAlign={"left"}
          >
            {(() => {
              const categoriaNombre = categori?.nombre || ""; // Asegúrate de que la cadena no sea undefined
              const words = categoriaNombre.trim().split(/\s+/); // Divide la cadena en palabras
              const ultimaPalabra = words[words.length - 1]; // Devuelve la última palabra
              return ultimaPalabra;
            })()}
          </Box>
        </Box>
      </Box>
      {/* <Box position="relative" maxW="100dvw" mt={4} mb={4}>
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
              "&::WebkitScrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
            }}
            gap={4}
            px={4}
          >
            {categori?.sub_categorias?.map((category) => (
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
      </Box> */}
      <InputGroup bgColor={"#F2F2F2"}>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Buscar producto"
          sx={styles.input}
          _focus={{ borderColor: "blue.500" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      {searchTerm
        ? renderSearchResults()
        : categori?.sub_categorias?.map((subCat) => (
            <Box key={subCat.id} id={subCat.id} width="100%">
              <CategoryComponent Categoria={subCat} />
            </Box>
          ))}
      <Carousel />
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
