import React, { useEffect, useRef } from "react";
import { Box, Text, VStack, Flex, ChakraProvider, Button } from "@chakra-ui/react";
import BlackBox from "../Landing/InfoTopBox";
import BagCard from "./BagCard";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "../Landing/MasVendidos";
import { finalizarPedido, updateCartQuantity } from "../Redux/Slice";

export default function Carrito() {
  const scrollRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pedidoActual, articulos, valores } = useSelector(state => state);

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

  const handleQuantityChange = (articleId, valorId, quantity) => {
    dispatch(updateCartQuantity({ articleId, valorId, quantity }));
  };

  const getArticuloNombre = (id) => {
    const foundArticulo = articulos.find(art => art.id === id);
    console.log(foundArticulo, id ,"foundArticulo");
    
    return foundArticulo ? foundArticulo.nombre : 'Artículo desconocido';
  };

  const getValorNombre = (id) => {
    const foundValor = valores.find(val => val.id === id);
    console.log(foundValor, id, "foundValor");
    return foundValor ? foundValor.attributes.nombre : 'Valor desconocido';
  };

  const createWhatsAppMessage = () => {
    let message = `¡Hola! He realizado un nuevo pedido: Número #${pedidoActual?.id}\n\n`;
    pedidoActual?.attributes?.pedido_articulos.forEach((product, index) => {
      const articuloNombre = getArticuloNombre(product?.articleId);
      const valorNombre = getValorNombre(product?.valorId);
      message += `${index + 1}. ${articuloNombre} - ${valorNombre}\n`;
      message += `   Cantidad: ${product.cantidad}, Precio unitario: $${product?.precioFinal}\n`;
    });
    message += `\nTotal del pedido: $${pedidoActual?.attributes?.total}`;
    message += `\n\nNúmero de pedido: #${pedidoActual?.id}`;
    return message;
  };

  const handleFinalizarPedido = () => {
    if (pedidoActual?.id) {
      dispatch(finalizarPedido(pedidoActual.id)).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          // If the order was successfully finalized, redirect to PedidoExitoso
          navigate(`/Exito/${pedidoActual?.id}`);
        } else {
          // If there was an error, you might want to show an error message
          console.error('Error al finalizar el pedido');
          // Optionally, you can show an error message to the user here
        }
        
        // Create and open WhatsApp message
        const phoneNumber = "2915729501";
        const message = encodeURIComponent(createWhatsAppMessage());
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
      });
    }
  };

  return (
    <ChakraProvider>
      <Box position="relative" minHeight="100vh" bg="#F5F5F5">
        <VStack spacing={4} p={4} pb="180px">
          <BlackBox
            titulo={`Mi carrito #${pedidoActual?.id}`}
            info="Revisá que estén todos los productos que estás buscando"
            showBackButton={true}
          />
          <VStack w="100%" spacing={0}>
            {pedidoActual?.attributes?.pedido_articulos.map((product, index) => (
              <BagCard
                key={index}
                producto={product}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </VStack>
          <Carousel />
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
            <Text fontSize="24px" fontWeight="bold">{pedidoActual?.attributes?.total?.toFixed(2)}</Text>
          </Flex>
          <Button
            w="100%"
            borderRadius={"24px"}
            bgColor="#CA0017"
            color="white"
            fontSize="1rem"
            height="3rem"
            onClick={handleFinalizarPedido}
          >
            Finalizar y Contactar por WhatsApp
          </Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
}