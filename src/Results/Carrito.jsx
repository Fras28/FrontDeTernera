import React, { useEffect, useMemo, useRef } from "react";
import { Box, Text, VStack, Flex, ChakraProvider, Button } from "@chakra-ui/react";
import BlackBox from "../Landing/InfoTopBox";
import BagCard from "../Carrito/BagCard";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "../Landing/MasVendidos";

const Arrow = (<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.15 6.99952H1C0.716667 6.99952 0.479167 6.90369 0.2875 6.71202C0.0958333 6.52036 0 6.28286 0 5.99952C0 5.71619 0.0958333 5.47869 0.2875 5.28702C0.479167 5.09536 0.716667 4.99952 1 4.99952H12.15L9.3 2.14952C9.1 1.94952 9.00417 1.71619 9.0125 1.44952C9.02083 1.18286 9.11667 0.949523 9.3 0.749523C9.5 0.549523 9.7375 0.445357 10.0125 0.437023C10.2875 0.42869 10.525 0.524523 10.725 0.724523L15.3 5.29952C15.4 5.39952 15.4708 5.50786 15.5125 5.62452C15.5542 5.74119 15.575 5.86619 15.575 5.99952C15.575 6.13286 15.5542 6.25786 15.5125 6.37452C15.4708 6.49119 15.4 6.59952 15.3 6.69952L10.725 11.2745C10.525 11.4745 10.2875 11.5704 10.0125 11.562C9.7375 11.5537 9.5 11.4495 9.3 11.2495C9.11667 11.0495 9.02083 10.8162 9.0125 10.5495C9.00417 10.2829 9.1 10.0495 9.3 9.84952L12.15 6.99952Z" fill="#1C1B1F"/>
    </svg>
    )

export default function Carrito() {
  const scrollRef = useRef(null);
  const location = useLocation();
  const { cart, cartTotal  } = useSelector(state => state.allData);

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
  }, [location]);


  return (
    <ChakraProvider>
      <Box position="relative" minHeight="100vh" bg="#F5F5F5">
        <VStack spacing={4} p={4} pb="180px">
          <BlackBox
            titulo="Mi carrito"
            info="Revisá que estén todos los productos que estás buscando"
            showBackButton={true}
          />
          <VStack w="100%" spacing={0}>
            {cart?.map((product, index) => (
              <BagCard key={index} producto={product} />
            ))}
          </VStack>
        <Carousel/>
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
          <Text fontSize="24px" fontWeight="bold">{cartTotal.toFixed(2)}</Text>
        </Flex>
        <Button as={NavLink} to="" w="100%" borderRadius={"24px"} bgColor="#CA0017" color="white" fontSize="1rem" height="3rem">
          Continuar
        </Button>
      </Box>
      </Box>
    </ChakraProvider>
  );
}

