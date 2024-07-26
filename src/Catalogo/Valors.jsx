import { Button } from "@chakra-ui/react";
import React from "react";

const ValorsBtn = ({ valor,onSelect  }) => {
  return (
    <Button
      color="black"
      borderRadius="full"
      border="solid black 2px"
      px={6}
      py={2}
      _hover={{ bg: "gray.800", color:"white" }}
      minWidth="auto"
      whiteSpace="nowrap"
      onClick={() => onSelect(valor)}
    >
      {valor?.attributes?.nombre}
    </Button>
  );
};

export default ValorsBtn;
