import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Grid,
  GridItem,
  VStack,
  HStack,
  Tag,
  Image,
  Badge,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { useAccentColors } from "../hooks/useAccentColors";
import { motion } from "framer-motion";


const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const ArticleList = () => {
 const { bgColor, accentColor, cardBg } = useAccentColors();
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box
      w="100%"
      bg={`radial-gradient(circle at top left, #111 0, ${bgColor} 45%, #020617 100%)`}
      py={{ base: 10, md: 20 }}
    >
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={10}
          alignItems="center"
          mb={16}
        >
          {/* Mockup grande */}
          <MotionBox
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              bg={cardBg}
              borderRadius="2xl"
              p={3}
              boxShadow="2xl"
              overflow="hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                alt="Workspace mockup"
                borderRadius="xl"
                objectFit="cover"
                h={{ base: "260px", md: "340px" }}
                w="100%"
              />
            </Box>

            {/* mini galería */}
            <HStack spacing={4} mt={4}>
              {[1, 2, 3].map((n) => (
                <Box
                  key={n}
                  flex="1"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                >
                  <Image
                    src={`https://images.unsplash.com/photo-15${n}9951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80`}
                    alt={`Mini shot ${n}`}
                    objectFit="cover"
                    h="90px"
                    w="100%"
                  />
                </Box>
              ))}
            </HStack>
          </MotionBox>

          {/* Texto */}
          <MotionVStack
            align="start"
            spacing={5}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            color={textColor}
          >
            <Badge
              bg={accentColor}
              color="white"
              borderRadius="full"
              px={3}
              py={1}
            >
              About me
            </Badge>
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "3xl" }}
              color={accentColor}
            >
              Construyendo experiencias web desde el lado creativo y técnico
            </Heading>
            <Text>
              Soy Agustín, desarrollador full stack e ingeniero en formación.
              Me gusta trabajar en la intersección entre diseño, código y
              experiencia de usuario.
            </Text>
            <Text>
              Disfruto de armar proyectos bien pensados, desde la idea hasta el
              despliegue, usando herramientas como React, Node.js, Express,
              Python y bases de datos SQL/NoSQL.
            </Text>
            <Text>
              En paralelo, estoy metiéndome fuerte en el mundo Web3, buscando
              formas de integrar contratos inteligentes y blockchain a
              productos que la gente realmente use.
            </Text>
          </MotionVStack>
        </SimpleGrid>

        {/* Segunda sección: 3 cards resumidas */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <Box bg={cardBg} borderRadius="2xl" p={6} boxShadow="xl">
            <Heading size="md" mb={3} color={accentColor}>
              Full Stack Mindset
            </Heading>
            <Text color={textColor} fontSize="sm">
              Me siento cómodo trabajando tanto en frontend como en backend:
              levantar APIs, diseñar modelos de datos y crear interfaces
              modernas.
            </Text>
          </Box>

          <Box bg={cardBg} borderRadius="2xl" p={6} boxShadow="xl">
            <Heading size="md" mb={3} color={accentColor}>
              Comunidad & Eventos
            </Heading>
            <Text color={textColor} fontSize="sm">
              Participo en comunidades como SaltaDev, workshops y hackathons,
              donde aprendo, conecto con otros devs y pruebo ideas nuevas.
            </Text>
          </Box>

          <Box bg={cardBg} borderRadius="2xl" p={6} boxShadow="xl">
            <Heading size="md" mb={3} color={accentColor}>
              Web2 → Web3
            </Heading>
            <Text color={textColor} fontSize="sm">
              Mi objetivo es combinar lo mejor del desarrollo tradicional con
              la tecnología blockchain para construir soluciones reales, útiles
              y preparadas para el futuro.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ArticleList;
