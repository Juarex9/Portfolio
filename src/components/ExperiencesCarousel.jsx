import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function ExperienceCard({ title, subtitle, date, description, imageSrc, opacity = 1 }) {
  const { accentColor } = useAccentColors();
  const cardBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const secondaryText = "gray.500";

  return (
    <Box
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      minW={{ base: "260px", md: "320px" }}
      maxW="360px"
      opacity={opacity}
      transition="all 0.3s ease"
      transform={opacity === 1 ? "scale(1.05)" : "scale(0.95)"}
      _hover={{
        transform: "scale(1.05) translateY(-4px)",
        boxShadow: "lg",
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
          {title}
        </Heading>

        <Text fontSize="xs" color={accentColor} fontWeight="600">
          {subtitle}
        </Text>

        <Text fontSize="xs" color={secondaryText}>
          {date}
        </Text>

        <Text fontSize="sm" color={secondaryText} lineHeight="1.6" noOfLines={3}>
          {description}
        </Text>
      </VStack>
    </Box>
  );
}

export default function ExperiencesCarousel() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const experiences = t("experiences.items", { returnObjects: true });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, experiences.length]);

  const getVisibleCards = () => {
    const prevIndex = currentIndex === 0 ? experiences.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === experiences.length - 1 ? 0 : currentIndex + 1;
    return [
      { ...experiences[prevIndex], opacity: 0.4 },
      { ...experiences[currentIndex], opacity: 1 },
      { ...experiences[nextIndex], opacity: 0.4 },
    ];
  };

  const visibleCards = getVisibleCards();

  return (
    <MotionBox
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
      viewport={{ once: true }}
      w="full"
    >
      <Box mb={6}>
        <Heading fontSize={{ base: "xl", md: "2xl" }} fontWeight="800" fontFamily="var(--font-display)" letterSpacing="-0.02em">
          {t("experiences.title")}
        </Heading>
      </Box>

      <HStack justify="center" spacing={4} w="full">
        {visibleCards.map((exp, idx) => (
          <MotionBox
            key={`${currentIndex}-${idx}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: exp.opacity, x: 0 }}
            transition={{ duration: 0.4 }}
            flexShrink={0}
          >
            <ExperienceCard {...exp} />
          </MotionBox>
        ))}
      </HStack>
    </MotionBox>
  );
}