import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ValorsBtn from "./Valors";
import { useRef, useState, useEffect } from "react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import genericImg from "../assets/oferta.jpeg";
import Carousel from "../Landing/MasVendidos";
import TopNav from "../Landing/logoTop";
import { addToCart, removeFromCart } from "../Redux/Slice";

export default function DetalleProducto() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const articulo = useSelector((state) =>
    state.allData?.articulos?.find((art) => art?.id === parseInt(id))
  );
  const { cart, categories } = useSelector((state) => state.allData);
  const oferta = categories.filter((cat) => cat.id === 1);
  console.log(oferta[0]?.sub_categorias, "oferta");
  const scrollRef = useRef(null);
  const [selectedValor, setSelectedValor] = useState(null);
  const [cantidad, setCantidad] = useState(0); // Estado para la cantidad
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  useEffect(() => {
    updateArrowVisibility();
  }, []);

  useEffect(() => {
    if (selectedValor) {
      const existingItem = cart?.find(
        (item) =>
          item.articleId === articulo.id && item.valorId === selectedValor.id
      );
      setCantidad(existingItem ? existingItem.quantity : 0);
    }
  }, [selectedValor, articulo, cart]);

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

  const handleValorSelect = (valor) => {
    setSelectedValor(valor);
  };

  const handleRemoveFromCart = () => {
    if (selectedValor && articulo) {
      dispatch(
        removeFromCart({
          articleId: articulo.id,
          valorId: selectedValor.id,
        })
      );
      setCantidad(0); // Reinicia la cantidad a 0
    }
  };

  const incrementarCantidad = () => setCantidad(cantidad + 1);
  const decrementarCantidad = () => {
    if (cantidad > 0) {
      const newQuantity = cantidad - 1;
      if (newQuantity === 0) {
        handleRemoveFromCart(); // Eliminar del carrito si la cantidad llega a 0
      } else {
        setCantidad(newQuantity);
      }
    }
  };
  const handleAddToCart = () => {
    if (selectedValor && articulo) {
      if (cantidad > 0) {
        const discountedPrice = articulo.DescPorciento 
          ? calculateDiscountedPrice(articulo.precioKG, articulo.DescPorciento)
          : articulo.precioKG;

        dispatch(
          addToCart({
            articleId: articulo.id,
            name: articulo.nombre,
            price: discountedPrice, // Use discounted price
            quantity: cantidad,
            valor: selectedValor.attributes.nombre,
            valorId: selectedValor.id,
            precioFinal: discountedPrice * selectedValor.attributes.GrsPorcion,
            discountPercentage: articulo.DescPorciento || 0,
          })
        );
      } else {
        handleRemoveFromCart();
      }
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== "number") return price;
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };
  return (
    <div>
      <TopNav showBackButton={true} />
      <Container maxW="7xl">
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex position="relative">
          <Image
              rounded="md"
              alt="product image"
              src={genericImg}
              fit="cover"
              align="center"
              w="100%"
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
              {articulo?.DescPorciento != null && articulo?.DescPorciento !== 0 && (
              <Box
                position="absolute"
                top="15px"
                left="15px"
                bg="#318215"
                color="white"
                px="2"
                py="1"
                borderRadius="md"
                fontSize="sm"
                fontWeight="bold"
                zIndex="1"
              >
                -{articulo.DescPorciento}% OFF
              </Box>
            )}
            <Box
              position="absolute"
              bottom=".2rem"
              left="0"
              right="0"
              bg="rgba(0,0,0,0.7)"
              p={4}
            >
              <Heading
                color="white"
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                fontWeight="bold"
              >
                {articulo?.nombre}
              </Heading>
            </Box>
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as="header">
              {articulo?.DescPorciento != null &&
              articulo?.DescPorciento !== 0 ? (
                <Flex alignItems="center" gap={2}>
                  <Text
                    color="#318215"
                    fontWeight="bold"
                    fontSize="32px"
                    textAlign="left"
                  >
                    $
                    {formatPrice(
                      calculateDiscountedPrice(
                        Number(articulo?.precioKG),
                        articulo?.DescPorciento
                      )
                    )}{" "}
                    /Kg
                  </Text>
                  <Text
                    as="s"
                    color={"gray.400"}
                    fontSize="l"
                    textAlign="left"
                  >
                    ${formatPrice(Number(articulo?.precioKG))} /Kg
                  </Text>
                </Flex>
              ) : (
                <Text
                  color={"gray.900"}
                  fontWeight="bold"
                  fontSize="32px"
                  textAlign="left"
                >
                  ${formatPrice(Number(articulo?.precioKG))} /Kg
                </Text>
              )}
            </Box>
            {/* {articulo?.DescPorciento != null &&
              articulo?.DescPorciento !== 0 && (
                <Box
                  bg="#318215"
                  color="white"
                  px={2}
                  py={1}
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight="bold"
                  alignSelf="flex-start"
                >
                  -{articulo.DescPorciento}% OFF
                </Box>
              )} */}
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction="column"
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack spacing={{ sm: 6 }} alignItems="flex-start">
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize="2xl"
                  fontWeight="300"
                  maxW="100%"
                  whiteSpace="pre-wrap"
                  wordBreak="break-word"
                >
                  {articulo?.detalle?.length < 36 ||
                  articulo?.detalle?.length === null ? (
                    <Text textAlign={"left"} fontSize="1rem">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut et massa mi. Aliquam in hendrerit urna. Pellentesque
                      sit amet sapien fringilla, mattis ligula consectetur,
                      ultrices mauris. Maecenas vitae mattis tellus. Nullam quis
                      imperdiet augue.
                    </Text>
                  ) : (
                    <Text textAlign={"left"}>{articulo?.detalle}</Text>
                  )}
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. */}
                </Text>
                <Box position="relative" maxW="100%" mt={4} mb={4}>
                  <Text
                    textAlign="left"
                    fontWeight="bold"
                    paddingBottom=".5rem"
                  >
                    Seleccioná opción
                  </Text>
                  <Flex
                    position="relative"
                    alignItems="center"
                    overflow="hidden"
                  >
                    {showLeftArrow && (
                      <Button
                        onClick={() => scroll(-200)}
                        position="absolute"
                        left="0"
                        zIndex={1}
                        bg="white"
                        _hover={{ bg: "gray.100" }}
                        borderRadius="full"
                        size="sm"
                        boxShadow="md"
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
                      maxW="100%"
                    >
                      {articulo?.valors?.data?.map((valor) => (
                        <ValorsBtn
                          key={valor.id}
                          valor={valor}
                          onSelect={handleValorSelect}
                        />
                      ))}
                    </Flex>
                    {showRightArrow && (
                      <Button
                        onClick={() => scroll(200)}
                        position="absolute"
                        right="0"
                        zIndex={1}
                        bg="white"
                        _hover={{ bg: "gray.100" }}
                        borderRadius="full"
                        size="sm"
                        boxShadow="md"
                      >
                        <Icon
                          as={ArrowForwardIcon}
                          boxSize={4}
                          color="gray.500"
                        />
                      </Button>
                    )}
                  </Flex>
                </Box>
              </VStack>
              <Box>
                <Carousel />
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>
        {selectedValor && (
          <Box
            position="sticky"
            bottom="0"
            width="100%"
            bg="white"
            p={4}
            boxShadow="lg"
            zIndex={2}
            textAlign="center"
            display={"flex"}
            gap={"1rem"}
          >
            <Flex
              justify="center"
              alignItems="center"
              mb={4}
              overflow="hidden"
              borderRadius="full"
              width="200px"
              height="50px"
              bg="black"
              color="white"
            >
              <Button
                onClick={decrementarCantidad}
                bg="black"
                color="white"
                borderRadius="none"
                height="100%"
                width="33%"
                _hover={{ bg: "gray.800" }}
                _active={{ bg: "gray.700" }}
              >
                -
              </Button>
              <Box
                width="34%"
                bg="white"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="solid black 2px"
              >
                <Text fontSize="lg" color="black" fontWeight="bold">
                  {cantidad}
                </Text>
              </Box>
              <Button
                onClick={incrementarCantidad}
                bg="black"
                color="white"
                borderRadius="none"
                height="100%"
                width="33%"
                _hover={{ bg: "gray.800" }}
                _active={{ bg: "gray.700" }}
              >
                +
              </Button>
            </Flex>
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
          </Box>
        )}
      </Container>
    </div>
  );
}
