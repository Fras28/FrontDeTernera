import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Text,
  Link,
  useToast,
  Container,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { loginUser } from "../../Redux/Slice";
import BlackBox from "../../Landing/InfoTopBox";
import SignInBtn from "./signInBtn";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();
  const { status, error } = useSelector((state) => state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast({
        title: "Inicio de sesión exitoso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setLoginSuccess(true);
    } catch (err) {
      toast({
        title: "Error en el inicio de sesión",
        description: error || "Ocurrió un error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loginSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxW="container.sm" pt={4}>
      <VStack spacing={6} align="stretch" bg="white" p={6} borderRadius="md" boxShadow="md">
        <BlackBox showBackButton={true} info={"Inicia sesión para disfrutar al máximo el servicio."} titulo={"Iniciar Sesión"} />
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="email" isRequired>
              <FormLabel>Dirección de correo electrónico</FormLabel>
              <Input
                style={styles.Input}
                type="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  style={styles.Input}
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              colorScheme="red"
              size="lg"
              width="full"
              isLoading={status === "loading"}
              style={styles.button}
            >
              Acceder
            </Button>
          </VStack>
        </form>
        {/* <SignInBtn /> */}
        <Text align="center">
          ¿No tienes cuenta? <Link as={RouterLink} to="/signup" color="red.500">Regístrate</Link>
        </Text>
      </VStack>
    </Container>
  );
}

const styles = {
  Input: {
    borderRadius: "24px",
    backgroundColor: "#F2F2F2",
    width: "100%"
  },
  button:{
    borderRadius:"24px",
    backgroundColor :"#CA0017",
    color:"white",
    width:"100%",
    padding:"12px 24px"
  }
};