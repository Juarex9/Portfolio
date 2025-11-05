import React from "react";
import { Container, Heading, Text } from "@chakra-ui/react";

export default function Web3() {
  return (
    <Container maxW="6xl" py={10}>
      <Heading mb={4}>Proyectos Web3</Heading>
      <Text color="gray.400">
        Acá mostrarás tus proyectos blockchain, contratos inteligentes y dApps.
      </Text>
    </Container>
  );
}
