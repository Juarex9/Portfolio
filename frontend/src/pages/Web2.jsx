import React from "react";
import { Container, Heading, Text } from "@chakra-ui/react";

export default function Web2() {
  return (
    <Container maxW="6xl" py={10}>
      <Heading mb={4}>Proyectos Web2</Heading>
      <Text color="gray.400">
        Acá irán tus proyectos desarrollados con tecnologías como React, Node.js, Express, SQL, etc.
      </Text>
    </Container>
  );
}
