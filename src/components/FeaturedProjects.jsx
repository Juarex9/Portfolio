import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { featuredProjects } from "../data/projects.js";
import FeaturedProjectStream from "./FeaturedProjectStream.jsx";

const MotionBox = motion(Box);

export default function FeaturedProjects() {
  const { accentColor, borderColor } = useAccentColors();
  const { t } = useTranslation();
  const textColor = "gray.500";
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box w="full" py={{ base: 16, md: 24 }} bg="transparent" overflow="hidden" maxW="100vw">
      <Container maxW="6xl" px={{ base: 4, md: 6 }}>
        <MotionBox
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          viewport={{ once: true }}
          mb={{ base: 10, md: 12 }}
        >
          <HStack mb={4} gap={3}>
            <Box w="40px" h="2px" bg={accentColor} borderRadius="full" />
            <Badge px={4} py={1.5} borderRadius="full" fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="wider" bg={`${accentColor}15`} color={accentColor}>
              {t("featured.badge")}
            </Badge>
          </HStack>

          <Box display="flex" justifyContent="space-between" alignItems={{ base: "flex-start", md: "flex-end" }} flexDirection={{ base: "column", md: "row" }} gap={4}>
            <Box>
              <Heading as="h2" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} fontWeight="800" fontFamily="var(--font-display)" mb={3}>{t("featured.title")}</Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color={textColor} maxW="2xl" fontFamily="var(--font-body)">{t("featured.subtitle")}</Text>
            </Box>
            <Button as={RouterLink} to="/proyectos" variant="ghost" size="lg" fontWeight="600" fontFamily="var(--font-body)" color={accentColor} _hover={{ opacity: 0.8 }} transition="all 0.3s">
              {t("featured.view_all")}
            </Button>
          </Box>
        </MotionBox>

        <FeaturedProjectStream projects={featuredProjects} accentColor={accentColor} borderColor={borderColor} />
      </Container>
    </Box>
  );
}
