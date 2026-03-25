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
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

export default function Personal() {
  const { accentColor, bgColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const secondaryText = "gray.500";
  const { t } = useTranslation();

  const projects = [
    { key: "scraper-precios", github: "https://github.com/Juarex9/prices-scraper.git", demo: "https://precios.agustinjz.dev/" },
    { key: "gestor-finanzas", github: "https://github.com/Juarex9/fintrack-app.git", demo: "" },
    { key: "real-time-chat", github: "https://github.com/Juarex9/chat-realtime.git", demo: "https://backend1-coderhouse.onrender.com/" },
    { key: "portfolio", github: "https://github.com/Juarex9/Portfolio.git", demo: "https://www.agustinjz.dev/" },
    { key: "ink-ai-risk-detector", github: "https://github.com/Juarex9/aleph-backend.git", demo: "https://ink-three-iota.vercel.app/" },
  ];

  return (
    <>
      <Seo titleKey="seo.personal.title" descriptionKey="seo.personal.description" canonicalPath="/personal" />
      <Box w="full" minH="100vh" bg={bgColor}>
        <Container maxW="6xl" py={{ base: 12, md: 20 }}>
          <MotionBox initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.6 }} viewport={{ once: true }} mb={10}>
            <Stack direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "flex-end" }} spacing={4}>
              <Box>
                <HStack mb={4} gap={3}>
                  <Box w="40px" h="2px" bg={accentColor} borderRadius="full" />
                  <Badge borderRadius="full" px={4} py={1.5} bg={`${accentColor}15`} color={accentColor} textTransform="uppercase" fontSize="xs" fontWeight="600" letterSpacing="wider" fontFamily="var(--font-body)">{t("projects.personal.badge")}</Badge>
                </HStack>
                <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="800" fontFamily="var(--font-display)" letterSpacing="-0.02em" lineHeight="1.1" mb={3}>{t("projects.personal.title")}</Heading>
                <Text fontSize={{ base: "md", md: "lg" }} color={secondaryText} maxW="2xl" fontFamily="var(--font-body)">{t("projects.personal.desc")}</Text>
              </Box>
              <Button as={Link} href="https://github.com/Juarex9" target="_blank" variant="outline" borderRadius="full" px={6} h={12} fontWeight="600" fontFamily="var(--font-body)" borderColor={accentColor} color={accentColor} _hover={{ bg: accentColor, color: "white" }} transition="all 0.3s">{t("projects.github_button")}</Button>
            </Stack>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }}>
            {projects.map((project, index) => {
              const baseKey = `projects.personal.items.${project.key}`;
              return (
                <MotionBox key={project.key} initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : (index % 2) * 0.1 }} viewport={{ once: true }}>
                  <LinkBox as="article">
                    <Heading size="lg" mb={2} fontFamily="var(--font-display)" fontWeight="700">
                      <LinkOverlay href={project.github} target="_blank" _hover={{ color: accentColor }} transition="color 0.3s">{t(`${baseKey}.title`)}</LinkOverlay>
                    </Heading>
                    <Text fontSize="sm" color={accentColor} mb={3} fontWeight="500" fontFamily="var(--font-body)">{t(`${baseKey}.subtitle`)}</Text>
                    <Text mb={5} color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)">{t(`${baseKey}.description`)}</Text>
                    <HStack spacing={2} wrap="wrap" mb={5}>
                      {t(`${baseKey}.tech`, { returnObjects: true }).map((techItem, i) => (
                        <Tag key={i} size="md" borderRadius="full" bg={`${accentColor}15`} color={accentColor} fontFamily="var(--font-body)" fontSize="xs" fontWeight="500">{techItem}</Tag>
                      ))}
                    </HStack>
                    <HStack spacing={3}>
                      <Button as="a" href={project.github} target="_blank" size="md" leftIcon={<FaGithub />} variant="outline" borderRadius="full" borderColor={accentColor} color={accentColor} _hover={{ bg: `${accentColor}10` }} fontFamily="var(--font-body)">Código</Button>
                      {project.demo && <Button as="a" href={project.demo} target="_blank" size="md" leftIcon={<FaExternalLinkAlt />} bg={accentColor} color="white" borderRadius="full" _hover={{ opacity: 0.9 }} fontFamily="var(--font-body)">Demo</Button>}
                    </HStack>
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
