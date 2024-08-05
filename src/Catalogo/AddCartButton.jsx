import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, agregarArticuloPedido, crearPedido } from "../Redux/Slice";

const AddToCartButton = ({ articulo, selectedValor, cantidad }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pedidoActual, user, articulos, valores } = useSelector((state) => state);

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  const getArticuloNombre = (id) => {
    const foundArticulo = articulos.find(art => art.id === id);
    return foundArticulo ? foundArticulo.nombre : 'Artículo desconocido';
  };

  const getValorNombre = (id) => {
    const foundValor = valores.find(val => val.id === id);
    return foundValor ? foundValor.attributes.nombre : 'Valor desconocido';
  };

  const handleAddToCart = async () => {
    if (!user) {
      onOpen();
      return;
    }

    if (!selectedValor || !selectedValor.attributes) {
      alert("Por favor, seleccione una opción válida");
      return;
    }

    try {
      let pedidoId = pedidoActual ? pedidoActual.id : null;

      if (!pedidoId) {
        const resultAction = await dispatch(crearPedido());
        if (crearPedido?.fulfilled?.match(resultAction)) {
          pedidoId = resultAction.payload.id;
        } else {
          throw new Error(resultAction.error?.message || "Error al crear el pedido");
        }
      }

      let precioBase = articulo.precioKG;
      if (articulo.DescPorciento > 0) {
        precioBase = calculateDiscountedPrice(precioBase, articulo.DescPorciento);
      }
      const precio = precioBase * (selectedValor.attributes.GrsPorcion / 1000);

      const articuloData = {
        pedidoId,
        articuloId: articulo.id,
        valorId: selectedValor.id,
        cantidad,
        precio,
      };

      const resultAction = await dispatch(agregarArticuloPedido(articuloData));

      if (agregarArticuloPedido.fulfilled.match(resultAction)) {
        dispatch(
          addToCart({
            articleId: articulo.id,
            name: getArticuloNombre(articulo.id),
            price: precioBase,
            quantity: cantidad,
            valor: getValorNombre(selectedValor.id),
            valorId: selectedValor.id,
            precioFinal: precio,
          })
        );
        alert("Producto agregado al carrito");
      } else {
        throw new Error(resultAction.error?.message || "Error al agregar el artículo al pedido");
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Error al agregar al carrito");
    }
  };

  return (
    <>
      <Button
        rounded="none"
        w="full"
        size="lg"
        py="7"
        bg="#CA0017"
        borderRadius="24px"
        textTransform="uppercase"
        color="white"
        fontWeight="bold"
        fontSize="1rem"
        zIndex={"9999"}
        _hover={{
          transform: "translateY(2px)",
          boxShadow: "lg",
        }}
        onClick={handleAddToCart}
      >
        Agregar al carrito
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} padding={"1rem"} top={"20%"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Iniciar sesión requerida</ModalHeader>
          <ModalBody>
            Para agregar productos al carrito o iniciar el proceso de compras, es necesario estar logueado.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => navigate("/login")}>
              Iniciar sesión
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddToCartButton;