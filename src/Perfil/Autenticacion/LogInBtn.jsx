import React from "react";
import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const LogInBtn = () => {
  return (
    <Button
      as={RouterLink}
      to="/login"
      colorScheme="blue"
    >
      Identificarte
    </Button>
  );
};

export default LogInBtn;
