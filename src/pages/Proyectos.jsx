import React from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Image,
  LinkBox,
  LinkOverlay,
  Container,
  Badge,
  HStack,
  Stack,
  Button,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";

const MotionBox = motion(Box);

export default function Proyectos() {
  const { cardBg, bgColor, accentColor } = useAccentColors();

  const sectionBg = useColorModeValue(
    `linear-gradient(135deg, ${bgColor} 55%, rgba(105,197,139,0.25) 100%)`,
    `linear-gradient(135deg, ${bgColor} 70%, rgba(56,161,105,0.45) 100%)`
  );

  const cardTextColor = useColorModeValue("gray.700", "gray.200");

  const cards = [
    {
      title: "Web2",
      tag: "Frontend · Backend",
      description:
        "Proyectos desarrollados con tecnologías tradicionales del entorno web, como React, Node.js y bases de datos SQL o NoSQL.",
      image: "/web2.jpg",
      link: "/web2",
    },
    {
      title: "Web3",
      tag: "Blockchain · Smart Contracts",
      description:
        "Proyectos que integran blockchain, contratos inteligentes y herramientas descentralizadas del nuevo ecosistema web.",
      image: "/web3.jpg",
      link: "/web3",
    },
  ];

  return (
    <Box w="full" bg={sectionBg} py={{ base: 12, md: 20 }}>
      <Container maxW="6xl">
        {/* HEADER DE SECCIÓN */}
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={10}
          spacing={4}
        >
          <Box>
            <Badge
              borderRadius="full"
              px={3}
              py={1}
              mb={2}
              bg={useColorModeValue("green.50", "green.900")}
              color={useColorModeValue("green.700", "green.200")}
              textTransform="uppercase"
              fontSize="xs"
              letterSpacing="wider"
            >
              Portfolio
            </Badge>

            <Heading
              fontSize={{ base: "2xl", md: "3xl" }}
              color={useColorModeValue("gray.900", "white")}
              mb={1}
            >
              Proyectos Web2 & Web3
            </Heading>

            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.300")}
              maxW="lg"
            >
              Una selección de proyectos donde aplico mi stack full-stack,
              desde aplicaciones tradicionales hasta integraciones con
              blockchain.
            </Text>
          </Box>

          <Button
            as={Link}
            href="https://github.com/Juarex9"
            target="_blank"
            variant="outline"
            borderRadius="full"
            px={6}
            fontSize="sm"
          >
            Ver más en GitHub
          </Button>
        </Stack>

        {/* CARDS */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {cards.map((card, index) => (
            <MotionBox
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
            >
              <LinkBox
                as="article"
                bg={cardBg}
                borderRadius="2xl"
                boxShadow="xl"
                overflow="hidden"
                cursor="pointer"
                transition="all 0.25s ease"
                _hover={{
                  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.25)",
                }}
              >
                {/* Imagen */}
                <Box position="relative" h="220px" overflow="hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    transition="transform 0.4s ease"
                  />
                  <Box
                    position="absolute"
                    inset="0"
                    bgGradient="linear(to-t, rgba(0,0,0,0.45), transparent)"
                  />
                  <HStack position="absolute" bottom={3} left={4} spacing={2}>
                    <Badge
                      borderRadius="full"
                      px={3}
                      py={1}
                      bg="rgba(15,118,110,0.9)"
                      color="white"
                      fontSize="xs"
                    >
                      {card.tag}
                    </Badge>
                  </HStack>
                </Box>

                {/* Contenido */}
                <Box p={6}>
                  <Heading size="md" mb={2}>
                    <LinkOverlay href={card.link}>{card.title}</LinkOverlay>
                  </Heading>
                  <Text fontSize="sm" color={cardTextColor}>
                    {card.description}
                  </Text>
                </Box>
              </LinkBox>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
