import React from "react";
import { Box, Heading, Flex, Icon } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import ProductSimple from "./cardProd";
import 'animate.css';

const Carousel = () => {
  return (
    <Box>
      <Heading style={styles.h1}>LOS MAS VENDIDOS</Heading>
      <Flex style={styles.container}>
        <Icon as={ArrowForwardIcon} boxSize={6} color="grey.500" style={styles.icon} />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
        <ProductSimple className="animate__animated animate__backInUp" />
      </Flex>
    </Box>
  );
};

const styles = {
  container: {
    minWidth: "103%",
    display: "flex",
    overflowX: "auto",
    gap: "1rem",
    padding: "1rem",
    alignItems: "center",
  },
  h1: {
    fontWeight: "bold",
    fontSize: "2rem",
    textAlign: "left",
    paddingLeft: ".5rem",
  },
  icon: {
    cursor: "pointer",
  },
};

export default Carousel;
