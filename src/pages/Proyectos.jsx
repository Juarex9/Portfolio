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
  Link,
} from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { projects } from "../data/projects.js";

const MotionBox = motion(Box);

export default function Proyectos() {
  const { accentColor, borderColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const secondaryText = "gray.500";
  const { t } = useTranslation();

  return (
    <>
      <Seo titleKey="seo.projects.title" descriptionKey="seo.projects.description" canonicalPath="/proyectos" />
      <Box w="full" minH="100vh" bg="transparent">
        <Container maxW="6xl" py={{ base: 8, md: 16 }}>
          <MotionBox
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            mb={8}
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "flex-end" }}
              spacing={4}
            >
              <Box>
                <HStack mb={3} gap={2}>
                  <Box w="32px" h="2px" bg={accentColor} borderRadius="full" />
                  <Badge
                    borderRadius="full"
                    px={3}
                    py={1}
                    bg={`${accentColor}15`}
                    color={accentColor}
                    textTransform="uppercase"
                    fontSize="xs"
                    fontWeight="600"
                    letterSpacing="wider"
                    fontFamily="var(--font-body)"
                  >
                    {t("projects.badge")}
                  </Badge>
                </HStack>

                <Heading
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                  fontWeight="800"
                  fontFamily="var(--font-display)"
                  letterSpacing="-0.02em"
                  lineHeight="1.2"
                  mb={2}
                >
                  {t("projects.title")}
                </Heading>

                <Text fontSize={{ base: "sm", md: "md" }} color={secondaryText} maxW="2xl" fontFamily="var(--font-body)">
                  {t("projects.subtitle")}
                </Text>
              </Box>

              <Button
                as={Link}
                href="https://github.com/Juarex9"
                target="_blank"
                variant="outline"
                borderRadius="full"
                px={5}
                size="sm"
                h={10}
                fontWeight="600"
                fontFamily="var(--font-body)"
                borderColor={accentColor}
                color={accentColor}
                _hover={{ bg: accentColor, color: "white" }}
                transition="all 0.3s"
              >
                {t("projects.github_button")}
              </Button>
            </Stack>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
            {projects.map((project, index) => {
              const baseKey = `projects.items.${project.key}`;
              const primaryLink = project.demo || project.github;

              return (
                <MotionBox
                  key={project.key}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : (index % 2) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <LinkBox
                    as="article"
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="xl"
                    overflow="hidden"
                    boxShadow="sm"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    {project.image && (
                      <Box h={{ base: "160px", md: "180px" }} position="relative" overflow="hidden">
                        <Box
                          as="img"
                          src={project.image}
                          alt={t(`${baseKey}.title`)}
                          position="absolute"
                          inset={0}
                          w="full"
                          h="full"
                          objectFit="cover"
                          loading="lazy"
                        />
                      </Box>
                    )}

                    <Box p={4}>
                      <HStack mb={2} spacing={2} flexWrap="wrap">
                        <Badge borderRadius="full" px={2} py={0.5} bg={`${accentColor}15`} color={accentColor} fontSize="xs">
                          {t(`projects.types.${project.type}`)}
                        </Badge>
                      </HStack>

                      <Heading size="sm" mb={1} fontFamily="var(--font-display)" fontWeight="700">
                        <LinkOverlay href={primaryLink} target="_blank" rel="noopener noreferrer" _hover={{ color: accentColor }} transition="color 0.3s">
                          {t(`${baseKey}.title`)}
                        </LinkOverlay>
                      </Heading>

                      <Text fontSize="xs" color={accentColor} mb={2} fontWeight="500" fontFamily="var(--font-body">
                        {t(`${baseKey}.subtitle`)}
                      </Text>

                      <Text fontSize="xs" color={secondaryText} lineHeight="1.6" fontFamily="var(--font-body)" mb={3}>
                        {t(`${baseKey}.description`)}
                      </Text>

                      <HStack spacing={1.5} wrap="wrap" mb={3}>
                        {t(`${baseKey}.tech`, { returnObjects: true }).slice(0, 4).map((techItem, i) => (
                          <Tag key={i} size="sm" borderRadius="full" bg={`${accentColor}15`} color={accentColor} fontFamily="var(--font-body)" fontSize="xs" fontWeight="500" px={2} py={0.5}>
                            {techItem}
                          </Tag>
                        ))}
                      </HStack>

                      <HStack spacing={2}>
                        <Button
                          as="a"
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="xs"
                          leftIcon={<FaGithub />}
                          variant="outline"
                          borderRadius="full"
                          borderColor={accentColor}
                          color={accentColor}
                          _hover={{ bg: `${accentColor}10` }}
                          fontFamily="var(--font-body)"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t("projects.code_button")}
                        </Button>
                        {project.demo && (
                          <Button
                            as="a"
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="xs"
                            leftIcon={<FaExternalLinkAlt />}
                            bg={accentColor}
                            color="white"
                            borderRadius="full"
                            _hover={{ opacity: 0.9 }}
                            fontFamily="var(--font-body)"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("projects.demo_button")}
                          </Button>
                        )}
                      </HStack>
                    </Box>
                  </LinkBox>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
