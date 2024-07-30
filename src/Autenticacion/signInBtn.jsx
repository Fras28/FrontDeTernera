import React from "react";
import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SignInBtn = () => {
  return (
    <Button
      as={RouterLink}
      to="/Signup"
      colorScheme="blue"
    >
      Registrarte
    </Button>
  );
};

export default SignInBtn;
