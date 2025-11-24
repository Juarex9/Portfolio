import React from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  Container,
  HStack,
  Tag,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useAccentColors } from "../hooks/useAccentColors";

export default function Web2() {
  const { cardBg, bgColor, accentColor } = useAccentColors();
  const textColor = useColorModeValue("gray.600", "gray.300");

  const projects = [
    {
      title: "automatic-form",
      subtitle: "Form digitizer with AI",
      description:
        "Herramienta para digitalizar formularios usando IA, pensada para automatizar la carga de datos.",
      tech: ["Python", "IA", "Automatización"],
      github: "https://github.com/Juarex9/automatic-form.git",
      demo: "", // si tenés demo, poné la URL acá
    },
    {
      title: "express-passport-jwt-auth-template",
      subtitle: "Reusable Express backend",
      description:
        "Template reutilizable de backend con Express, Passport y JWT para autenticación y protección de rutas.",
      tech: ["Node.js", "Express", "MongoDB", "Passport", "JWT"],
      github:
        "https://github.com/Juarex9/express-passport-jwt-auth-template.git",
      demo: "",
    },
    {
      title: "e-commerce",
      subtitle: "React frontend",
      description:
        "Frontend de un e-commerce desarrollado en React, enfocado en la experiencia de usuario.",
      tech: ["React", "JavaScript", "Firebase"],
      github: "https://github.com/Juarex9/e-commerce.git",
      demo: "",
    },
  ];

  return (
    <Box
      w="full"
      bg={`linear-gradient(135deg, ${bgColor} 70%, #69c58b 100%)`}
      py={{ base: 10, md: 20 }}
    >
      <Container maxW="6xl">
        <Heading
          as="h1"
          textAlign="center"
          mb={4}
          color={useColorModeValue("green.500", "green.300")}
        >
          Proyectos Web2
        </Heading>

        <Text
          textAlign="center"
          mb={10}
          maxW="2xl"
          mx="auto"
          color={textColor}
        >
          Acá están algunos de mis proyectos desarrollados con tecnologías
          como React, Node.js, Express, Python y bases de datos SQL/NoSQL.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {projects.map((project, index) => (
            <LinkBox
              as="article"
              key={index}
              bg={cardBg}
              borderRadius="xl"
              boxShadow="lg"
              p={6}
              transition="all 0.3s ease"
              _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
            >
              <Heading size="md" mb={1}>
                <LinkOverlay href={project.github} target="_blank">
                  {project.title}
                </LinkOverlay>
              </Heading>

              <Text fontSize="sm" color={textColor} mb={3}>
                {project.subtitle}
              </Text>

              <Text mb={4} color={textColor}>
                {project.description}
              </Text>

              <HStack spacing={2} wrap="wrap" mb={4}>
                {project.tech.map((t, i) => (
                  <Tag
                    key={i}
                    size="sm"
                    borderRadius="full"
                    bg={accentColor}
                    color="white"
                  >
                    {t}
                  </Tag>
                ))}
              </HStack>

              <HStack spacing={3}>
                <Button
                  as="a"
                  href={project.github}
                  target="_blank"
                  size="sm"
                  leftIcon={<FaGithub />}
                  variant="outline"
                >
                  Código
                </Button>

                {project.demo && (
                  <Button
                    as="a"
                    href={project.demo}
                    target="_blank"
                    size="sm"
                    leftIcon={<FaExternalLinkAlt />}
                    colorScheme="green"
                    variant="solid"
                  >
                    Demo
                  </Button>
                )}
              </HStack>
            </LinkBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
