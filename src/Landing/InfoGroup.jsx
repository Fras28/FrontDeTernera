import React from "react";
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLifeRing,
  faHandHoldingHeart,
  faTruck,
} from "@fortawesome/free-solid-svg-icons"; // Ejemplos de iconos de Font Awesome

const Feature = ({ title, text, icon }) => {
  return (
    <Stack
      style={{
        backgroundColor: "#000000a1",
        borderRadius: "12px",
      }}
    >
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        <FontAwesomeIcon icon={icon} size="lg" />
      </Flex>
      <Text fontWeight={600} color={"#F28A2E"}>{title}</Text>
      <Text color={"whiteSmoke"}>{text}</Text>
    </Stack>
  );
};

const SimpleThreeColumns = () => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={faLifeRing}
          title={"Lifetime Support"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
        <Feature
          icon={faHandHoldingHeart}
          title={"Unlimited Donations"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
        <Feature
          icon={faTruck}
          title={"Instant Delivery"}
          text={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
          }
        />
      </SimpleGrid>
    </Box>
  );
};

export default SimpleThreeColumns;
