import React, { useRef, useState } from "react";
import { Box, Heading, Flex, Icon, Button } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import "animate.css";
import { useSelector } from "react-redux";
import ProductCard from "./cardProd";

const Carousel = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { categories } = useSelector((state) => state);
  // Obtén todos los artículos de todas las subcategorías
  const CatOfer = categories?.filter((cat) => cat.id === 1);
  // Extrae todos los artículos de las subcategorías filtradas
  const valoresArticulos = [];

   // Check if CatOfer[0] exists and has sub_categorias
   if (CatOfer?.length > 0 && CatOfer[0]?.sub_categorias) {
    CatOfer[0].sub_categorias.forEach((sub_categoria) => {
      sub_categoria?.articulos?.forEach((articulo) => {
        valoresArticulos.push(articulo);
      });
    });
  }

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
    updateArrowVisibility();
  };

  const updateArrowVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  return (
    <Box position="relative" maxW={"100dvw"}>
      <Heading style={styles.h1}>Ofertas</Heading>
      <Flex position="relative">
        {showLeftArrow && (
          <Button
            onClick={() => scroll(-200)}
            position="absolute"
            left="-.5rem"
            top="50%"
            transform="translateY(-50%)"
            zIndex="1"
            bg="white"
            _hover={{ bg: "gray.100" }}
          >
            <Icon as={ArrowBackIcon} boxSize={6} color="gray.500" />
          </Button>
        )}
        <Flex
          ref={scrollRef}
          style={styles.container}
          onScroll={updateArrowVisibility}
        >
          {valoresArticulos.map((articulo) => (
            <ProductCard
              product={articulo}
              className="animate__animated animate__backInUp"
            />
          ))}
        </Flex>
        {showRightArrow && (
          <Button
            onClick={() => scroll(200)}
            position="absolute"
            right="0"
            top="50%"
            transform="translateY(-50%)"
            zIndex="1"
            bg="white"
            _hover={{ bg: "gray.100" }}
          >
            <Icon as={ArrowForwardIcon} boxSize={6} color="gray.500" />
          </Button>
        )}
      </Flex>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    overflowX: "scroll",
    scrollBehavior: "smooth",
    gap: "1rem",
    padding: "1rem",
    alignItems: "center",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::WebkitScrollbar": {
      display: "none",
    },
  },
  h1: {
    fontWeight: "bold",
    fontSize: "2rem",
    textAlign: "left",
    paddingLeft: ".5rem",
    marginBottom: "1rem",
  },
};

export default Carousel;
