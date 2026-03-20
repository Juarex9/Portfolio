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
  Badge,
  Stack,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";

export default function Personal() {
  const { cardBg, bgColor, accentColor } = useAccentColors();
  const textColor = useColorModeValue("gray.600", "gray.300");
  const { t } = useTranslation();

  const projects = [
    {
      key: "scraper-precios",
      github: "https://github.com/Juarex9/prices-scraper.git",
      demo: "",
    },
    {
      key: "gestor-finanzas",
      github: "https://github.com/Juarex9/fintrack-app.git",
      demo: "",
    },
    {
      key: "real-time-chat",
      github: "https://github.com/Juarex9/chat-realtime.git",
      demo: "https://backend1-coderhouse.onrender.com/",
    },
    {
      key: "portfolio",
      github: "https://github.com/Juarex9/Portfolio.git",
      demo: "https://www.agustinjz.dev/"
    }
  ];

  return (
    <>
      <Seo
        titleKey="seo.personal.title"
        descriptionKey="seo.personal.description"
        canonicalPath="/personal"
      />
      <Box
        w="full"
        bg={`linear-gradient(135deg, ${bgColor} 70%, #69c58b 100%)`}
        py={{ base: 10, md: 20 }}
      >
        <Container maxW="6xl">
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
                {t("projects.personal.badge")}
              </Badge>

              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                color={useColorModeValue("gray.900", "white")}
                mb={1}
              >
                {t("projects.personal.title")}
              </Heading>

              <Text
                fontSize="sm"
                color={textColor}
                maxW="lg"
              >
                {t("projects.personal.desc")}
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
              {t("projects.github_button")}
            </Button>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {projects.map((project) => {
              const baseKey = `projects.personal.items.${project.key}`;
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
                  p={6}
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
              );
            })}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
