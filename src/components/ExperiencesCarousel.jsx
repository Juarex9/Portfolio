import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  useColorModeValue,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { experiences } from "../data/experiences.js";

const MotionBox = motion(Box);

function ExperienceCard({ slug, title, subtitle, date, summary, imageSrc, opacity = 1, readMoreLabel }) {
  const { accentColor } = useAccentColors();
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const secondaryText = "gray.500";

  return (
    <LinkBox
      as="article"
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      minW={{ base: "260px", md: "300px" }}
      maxW="360px"
      opacity={opacity}
      transition="all 0.3s ease"
      transform={opacity === 1 ? "scale(1.02)" : "scale(0.95)"}
      _hover={{
        transform: "scale(1.02) translateY(-4px)",
        boxShadow: "lg",
        borderColor: accentColor,
      }}
    >
      <Box h="160px" overflow="hidden">
        <Image
          src={imageSrc}
          alt={title}
          w="100%"
          h="100%"
          objectFit="cover"
          opacity={opacity}
        />
      </Box>

      <VStack align="start" spacing={2} p={4}>
        <Heading as="h3" fontSize="md" fontWeight="700" fontFamily="var(--font-display)" noOfLines={2}>
          <LinkOverlay as={RouterLink} to={`/experiencias/${slug}`} _hover={{ color: accentColor }}>
            {title}
          </LinkOverlay>
        </Heading>

        <Text fontSize="xs" color={accentColor} fontWeight="600">
          {subtitle}
        </Text>

        <Text fontSize="xs" color={secondaryText}>
          {date}
        </Text>

        <Text fontSize="sm" color={secondaryText} lineHeight="1.6" noOfLines={3}>
          {summary}
        </Text>

        <Text fontSize="xs" color={accentColor} fontWeight="600" fontFamily="var(--font-body)">
          {readMoreLabel} →
        </Text>
      </VStack>
    </LinkBox>
  );
}

export default function ExperiencesCarousel() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = experiences.map((exp) => ({
    slug: exp.slug,
    imageSrc: exp.image,
    title: t(`experiences.items.${exp.slug}.title`),
    subtitle: t(`experiences.items.${exp.slug}.subtitle`),
    date: t(`experiences.items.${exp.slug}.date`),
    summary: t(`experiences.items.${exp.slug}.summary`),
  }));

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, items.length]);

  const getVisibleCards = () => {
    if (prefersReducedMotion) return items.map((item) => ({ ...item, opacity: 1 }));

    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    return [
      { ...items[prevIndex], opacity: 0.45 },
      { ...items[currentIndex], opacity: 1 },
      { ...items[nextIndex], opacity: 0.45 },
    ];
  };

  const visibleCards = getVisibleCards();
  const readMoreLabel = t("experiences.read_more");

  return (
    <MotionBox
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
      viewport={{ once: true }}
      w="full"
      overflowX="hidden"
    >
      <Box mb={6}>
        <Heading fontSize={{ base: "xl", md: "2xl" }} fontWeight="800" fontFamily="var(--font-display)" letterSpacing="-0.02em">
          {t("experiences.title")}
        </Heading>
      </Box>

      <HStack
        justify={{ base: "flex-start", md: "center" }}
        spacing={4}
        w="full"
        overflowX={{ base: "auto", md: "visible" }}
        pb={{ base: 2, md: 0 }}
        px={{ base: 1, md: 0 }}
        sx={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
      >
        {visibleCards.map((exp) => (
          <MotionBox
            key={exp.slug}
            flexShrink={0}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: exp.opacity, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ExperienceCard {...exp} readMoreLabel={readMoreLabel} />
          </MotionBox>
        ))}
      </HStack>
    </MotionBox>
  );
}
