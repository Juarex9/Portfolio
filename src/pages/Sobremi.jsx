import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Image,
  Badge,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { useAccentColors } from "../hooks/useAccentColors";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);

const AboutMe = () => {
  const { bgColor, accentColor, cardBg, textColor } = useAccentColors();

  const sectionBg = useColorModeValue(
    `linear-gradient(135deg, ${bgColor} 55%, rgba(105,197,139,0.18) 100%)`,
    `radial-gradient(circle at top left, #020617 0, ${bgColor} 60%, #020617 100%)`
  );

  const secondaryText = useColorModeValue("gray.600", "gray.300");

  return (
    <Box w="100%" bg={sectionBg} py={{ base: 12, md: 20 }}>
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        {/* Header de sección */}
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={12}
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
              Sobre mí
            </Badge>

            <MotionHeading
              fontSize={{ base: "2xl", md: "3xl" }}
              color={useColorModeValue("gray.900", "white")}
              fontWeight="extrabold"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              mb={1}
            >
              Construyendo experiencias web desde el lado creativo y técnico
            </MotionHeading>

            <Text fontSize="sm" color={secondaryText} maxW="lg">
              Un poco de contexto sobre quién soy, cómo pienso los proyectos
              y hacia dónde quiero crecer como desarrollador.
            </Text>
          </Box>
        </Stack>

        {/* Bloque principal: imagen + texto */}
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={10}
          alignItems="center"
          mb={14}
        >
          {/* Mockup grande */}
          <MotionBox
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
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
          </MotionBox>

          {/* Texto */}
          <MotionVStack
            align="start"
            spacing={4}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            color={textColor}
          >
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
          <Box
            bg={cardBg}
            borderRadius="2xl"
            p={6}
            boxShadow="xl"
            transition="all 0.25s ease"
            _hover={{ transform: "translateY(-4px)", boxShadow: "2xl" }}
          >
            <Heading size="md" mb={3} color={accentColor}>
              Full Stack Mindset
            </Heading>
            <Text color={secondaryText} fontSize="sm">
              Me siento cómodo trabajando tanto en frontend como en backend:
              levantar APIs, diseñar modelos de datos y crear interfaces
              modernas.
            </Text>
          </Box>

          <Box
            bg={cardBg}
            borderRadius="2xl"
            p={6}
            boxShadow="xl"
            transition="all 0.25s ease"
            _hover={{ transform: "translateY(-4px)", boxShadow: "2xl" }}
          >
            <Heading size="md" mb={3} color={accentColor}>
              Comunidad &amp; Eventos
            </Heading>
            <Text color={secondaryText} fontSize="sm">
              Participo en comunidades como SaltaDev, workshops y hackathons,
              donde aprendo, conecto con otros devs y pruebo ideas nuevas.
            </Text>
          </Box>

          <Box
            bg={cardBg}
            borderRadius="2xl"
            p={6}
            boxShadow="xl"
            transition="all 0.25s ease"
            _hover={{ transform: "translateY(-4px)", boxShadow: "2xl" }}
          >
            <Heading size="md" mb={3} color={accentColor}>
              Web2 → Web3
            </Heading>
            <Text color={secondaryText} fontSize="sm">
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

export default AboutMe;
