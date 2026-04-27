import React from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  useColorModeValue,
  Container,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useAccentColors } from "../hooks/useAccentColors";
import ExperiencesCarousel from "../components/ExperiencesCarousel";

const BlogTags = ({ marginTop = 0, tags = [] }) => {
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => (
        <Tag size="md" variant="solid" colorScheme="orange" key={tag}>
          {tag}
        </Tag>
      ))}
    </HStack>
  );
};

const BlogAuthor = ({ date, name }) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${name}`}
      />
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{new Date(date).toLocaleDateString()}</Text>
    </HStack>
  );
};

const ArticleList = () => {
  const { bgColor, textColor, cardBg, accentColor } = useAccentColors();
  return (
    <Container maxW="100%" p={0} bg={`linear-gradient(135deg, ${bgColor} 70%, #69c58b 100%)`} color={textColor}>
      <Box p={{ base: 6, md: 12 }}>
        <Heading as="h1" color={accentColor} mb={8}>
          Un poco sobre mi
        </Heading>

        {/* Sección About Me con Cards */}
        <Box
          marginTop={{ base: "4", sm: "8" }}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          gap={8}
        >
          {/* Columna de imagen */}
          <Box
            display="flex"
            flex="1"
            position="relative"
            alignItems="center"
            minW={{ base: "100%", md: "auto" }}
          >
            <Box
              width={{ base: "100%", md: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", md: "5%" }}
            >
              <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  borderRadius="lg"
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80"
                  alt="Agustín"
                  objectFit="contain"
                />
              </Box>
            </Box>

            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  "radial(orange.600 1px, transparent 1px)",
                  "radial(orange.300 1px, transparent 1px)"
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>

          {/* Columna de contenido con cards */}
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="flex-start"
            marginTop={{ base: "3", md: "0" }}
          >
            <Heading mb={6}>
              <Text
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                color={accentColor}
              >
                ¿Quién soy?
              </Text>
            </Heading>

            {/* Cards Container */}
            <VStack align="start" spacing={4} w="full">
              {/* Card 1 */}
              <Box
                bg={useColorModeValue(
                  "rgba(255, 255, 255, 0.1)",
                  "rgba(255, 255, 255, 0.05)"
                )}
                borderLeft="4px solid"
                borderColor="orange.400"
                p={6}
                borderRadius="lg"
                backdropFilter="blur(10px)"
                transition="all 0.3s ease"
                _hover={{
                  bg: useColorModeValue(
                    "rgba(255, 255, 255, 0.15)",
                    "rgba(255, 255, 255, 0.08)"
                  ),
                  transform: "translateX(4px)",
                }}
              >
                <Heading as="h3" size="sm" mb={2} color={accentColor}>
                  Apasionado por la Tecnología
                </Heading>
                <Text
                  color={useColorModeValue("gray.700", "gray.200")}
                  fontSize="md"
                  lineHeight="tall"
                >
                  Me llamo Agustín, vivo en Salta – Argentina y soy un apasionado
                  de la informática, la tecnología y el desarrollo. Me dedico a
                  crear aplicaciones web modernas y accesibles.
                </Text>
              </Box>

              {/* Card 2 */}
              <Box
                bg={useColorModeValue(
                  "rgba(255, 255, 255, 0.1)",
                  "rgba(255, 255, 255, 0.05)"
                )}
                borderLeft="4px solid"
                borderColor="orange.400"
                p={6}
                borderRadius="lg"
                backdropFilter="blur(10px)"
                transition="all 0.3s ease"
                _hover={{
                  bg: useColorModeValue(
                    "rgba(255, 255, 255, 0.15)",
                    "rgba(255, 255, 255, 0.08)"
                  ),
                  transform: "translateX(4px)",
                }}
              >
                <Heading as="h3" size="sm" mb={2} color={accentColor}>
                  Aprendizaje Continuo
                </Heading>
                <Text
                  color={useColorModeValue("gray.700", "gray.200")}
                  fontSize="md"
                  lineHeight="tall"
                >
                  Siempre buscando aprender y mejorar mis habilidades. Me encanta
                  colaborar en proyectos y compartir conocimientos con la
                  comunidad.
                </Text>
              </Box>

              {/* Card 3 */}
              <Box
                bg={useColorModeValue(
                  "rgba(255, 255, 255, 0.1)",
                  "rgba(255, 255, 255, 0.05)"
                )}
                borderLeft="4px solid"
                borderColor="orange.400"
                p={6}
                borderRadius="lg"
                backdropFilter="blur(10px)"
                transition="all 0.3s ease"
                _hover={{
                  bg: useColorModeValue(
                    "rgba(255, 255, 255, 0.15)",
                    "rgba(255, 255, 255, 0.08)"
                  ),
                  transform: "translateX(4px)",
                }}
              >
                <Heading as="h3" size="sm" mb={2} color={accentColor}>
                  Full Stack Developer
                </Heading>
                <Text
                  color={useColorModeValue("gray.700", "gray.200")}
                  fontSize="md"
                  lineHeight="tall"
                >
                  Actualmente estudio Ingeniería Informática y me interesa mucho
                  el desarrollo Full Stack. Disfruto de todos los aspectos de la
                  programación.
                </Text>
              </Box>
            </VStack>
          </Box>
        </Box>

        <Divider my={12} borderColor="orange.300" opacity={0.5} />

        <Heading as="h2" marginTop="8" marginBottom="6" color={accentColor}>
          Mi paso a Web3
        </Heading>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} alignItems="start">
        <GridItem spacing="30px" marginTop="5">
            <Box>
              <Box borderRadius="lg" overflow="hidden">
                  <Image
                    transform="scale(1.0)"
                    src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80"
                    alt="some text"
                    objectFit="contain"
                    maxW="640px"
                    transition="0.3s ease-in-out"
                    _hover={{ transform: "scale(1.05)" }}
                  />
              </Box>
            </Box>
        </GridItem>

        <VStack align="start"
            spacing={4}
            mt="2"
            maxW="70ch"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
            lineHeight="tall">
          <Heading as="h3" size="md" color={accentColor}>Blockchain y Web3</Heading>
          <Text>
            En el año 2025 comencé a interesarme por el mundo de la blockchain y las tecnologías descentralizadas.
            Decidí adentrarme en este campo y aprender sobre contratos inteligentes, dApps y las posibilidades que ofrece la Web3.
          </Text>
          <Text>
           Actualmente podría decirse que soy un programador Web2 migrando a Web3, pero sin abandonar mis conocimientos previos.
          </Text>
          <Text>
            Mi objetivo es aplicar los principios de seguridad, descentralización e innovación que caracterizan a Web3 en mis proyectos futuros.
          </Text>
        </VStack>
        </Grid>
      </Box>

      {/* Sección de Experiencias */}
      <ExperiencesCarousel />
    </Container>
  );
};

export default ArticleList;
