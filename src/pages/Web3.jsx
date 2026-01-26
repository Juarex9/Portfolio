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
import { useTranslation } from "react-i18next";

export default function Web3() {
  const { cardBg, bgColor, accentColor } = useAccentColors();
  const textColor = useColorModeValue("gray.600", "gray.300");
  const { t } = useTranslation();

  const projects = [
    {
      key: "sub0-front",
      github: "https://github.com/Juarex9/Sub0_front.git",
      demo: "",
    },
  ];

  return (
    <Box
      w="full"
      minH={{ base: "auto", md: "75vh" }}
      bg={`linear-gradient(135deg, ${bgColor} 70%, #69c58b 100%)`}
      py={{ base: 10, md: 20 }}
    >
      <Container
        maxW="6xl"                
        px={{ base: 4, md: 6 }}   
      >
        <SimpleGrid
          spacing={8}
          columns={{ base: 1, md: 2 }}
        >
          {projects.map((project) => {
            const baseKey = `projects.web3.items.${project.key}`;
            const title = t(`${baseKey}.title`);
            const subtitle = t(`${baseKey}.subtitle`);
            const description = t(`${baseKey}.description`);
            const tech = t(`${baseKey}.tech`, { returnObjects: true });

            return (
              <LinkBox
                as="article"
                key={project.key}
                bg={cardBg}
                borderRadius="xl"
                boxShadow="lg"
                p={{ base: 5, md: 6 }}
                transition="all 0.3s ease"
                _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
              >
                <Heading size="md" mb={1}>
                  <LinkOverlay href={project.github} target="_blank">
                    {title}
                  </LinkOverlay>
                </Heading>

                <Text fontSize="sm" color={textColor} mb={3}>
                  {subtitle}
                </Text>

                <Text mb={4} color={textColor}>
                  {description}
                </Text>

                <HStack spacing={2} wrap="wrap" mb={4}>
                  {tech.map((techItem, i) => (
                    <Tag
                      key={i}
                      size="sm"
                      borderRadius="full"
                      bg={accentColor}
                      color="white"
                    >
                      {techItem}
                    </Tag>
                  ))}
                </HStack>

                <HStack spacing={3} wrap="wrap">
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
                    >
                      Demo
                    </Button>
                  )}
                </HStack>
              </LinkBox>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}