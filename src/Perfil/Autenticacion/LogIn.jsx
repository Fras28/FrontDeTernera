import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

import { Navigate } from "react-router-dom";

import { loginUser } from "../../Redux/Slice";
import InicioButton from "../../Results/InicioButton";
import SignInBtn from "./signInBtn";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const { status, error } = useSelector((state) => state);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setLoginSuccess(true);
    } catch (err) {
      toast({
        title: "Login failed",
        description: error || "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Redireccionar al usuario después del inicio de sesión exitoso
  if (loginSuccess) {
    return <Navigate to="/" />;
  }

  // Estilos condicionales basados en el tema
  const bgColor = "gray.50"; // Color claro
  const textColor = "gray.600"; // Color de texto regular
  const linkColor = "blue.400"; // Color del enlace

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={bgColor} // Aplicando el color de fondo
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Identificate</Heading>
          <Text fontSize={"lg"} color={textColor}>
            para difrutar al maximo el servicio ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={"white"} // Fondo blanco
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} as="form" onSubmit={handleSubmit}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                {/* <Checkbox>Remember me</Checkbox>
                <Text color={linkColor}>Forgot password?</Text> */}
              </Stack>
              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={status === "loading"}
              >
                Acceder
              </Button>
              <SignInBtn/>
              <InicioButton />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
