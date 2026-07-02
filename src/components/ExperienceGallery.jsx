import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useColorModeValue } from "../hooks/useColorModeValue.js";

const MotionBox = motion(Box);

function galleryAltKey(src) {
  const filename = src.split("/").pop() || "";
  return filename.replace(/\.[^.]+$/, "").toLowerCase();
}

export default function ExperienceGallery({ images, title, getAlt, borderColor }) {
  const { t } = useTranslation();
  const { accentColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const imageBg = useColorModeValue("#f9fafb", "#1f2937");
  const navBtnBg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(0, 0, 0, 0.6)");
  const navBtnHoverBg = useColorModeValue("#ffffff", "#374151");
  const dotInactiveBg = useColorModeValue("#d1d5db", "rgba(255, 255, 255, 0.3)");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const count = images.length;

  const goTo = useCallback(
    (next) => {
      if (next < 0) {
        setActiveIndex(count - 1);
        return;
      }
      if (next >= count) {
        setActiveIndex(0);
        return;
      }
      setActiveIndex(next);
    },
    [count]
  );

  const activeSrc = images[activeIndex];
  const activeAlt = getAlt(galleryAltKey(activeSrc));

  if (prefersReducedMotion) {
    return (
      <VStack align="stretch" spacing={4} mb={8} w="full">
        {title && (
          <Heading as="h2" size="sm" fontFamily="var(--font-display)" color="gray.500">
            {title}
          </Heading>
        )}
        <HStack
          gap={4}
          overflowX="auto"
          pb={3}
          w="full"
          sx={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
        >
          {images.map((src) => (
            <Box
              key={src}
              flex="0 0 auto"
              w={{ base: "min(300px, 88vw)", md: "420px" }}
              borderRadius="xl"
              overflow="hidden"
              border="1px solid"
              borderColor={borderColor}
              bg={imageBg}
            >
              <Image src={src} alt={getAlt(galleryAltKey(src))} w="100%" h="auto" objectFit="contain" loading="lazy" />
            </Box>
          ))}
        </HStack>
      </VStack>
    );
  }

  return (
    <VStack align="stretch" spacing={4} mb={8} w="full">
      {title && (
        <Heading as="h2" size="sm" fontFamily="var(--font-display)" color="gray.500">
          {title}
        </Heading>
      )}

      <Box
        position="relative"
        borderRadius="xl"
        overflow="hidden"
        border="1px solid"
        borderColor={borderColor}
        bg={imageBg}
        w="full"
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") goTo(activeIndex - 1);
          if (event.key === "ArrowRight") goTo(activeIndex + 1);
        }}
        onPointerDown={(event) => {
          setIsDragging(true);
          dragStartX.current = event.clientX;
        }}
        onPointerMove={(event) => {
          if (!isDragging) return;
          const delta = event.clientX - dragStartX.current;
          if (Math.abs(delta) > 56) {
            goTo(activeIndex + (delta > 0 ? -1 : 1));
            dragStartX.current = event.clientX;
          }
        }}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
        cursor={isDragging ? "grabbing" : "grab"}
        touchAction="pan-y"
      >
        <Box position="relative" minH={{ base: "240px", sm: "320px", md: "420px" }} display="flex" alignItems="center" justifyContent="center" px={{ base: 10, md: 12 }} py={4}>
          <AnimatePresence mode="wait" initial={false}>
            <MotionBox
              key={activeSrc}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              w="full"
              display="flex"
              justifyContent="center"
            >
              <Image
                src={activeSrc}
                alt={activeAlt}
                maxH={{ base: "360px", md: "520px" }}
                maxW="100%"
                w="auto"
                h="auto"
                objectFit="contain"
                loading="eager"
              />
            </MotionBox>
          </AnimatePresence>
        </Box>

        <IconButton
          aria-label={t("experiences.gallery_prev")}
          icon={<ChevronLeftIcon boxSize={6} />}
          position="absolute"
          left={{ base: 1, md: 2 }}
          top="50%"
          transform="translateY(-50%)"
          size="sm"
          variant="ghost"
          borderRadius="full"
          color={accentColor}
          bg={navBtnBg}
          _hover={{ bg: navBtnHoverBg }}
          onClick={() => goTo(activeIndex - 1)}
          zIndex={2}
        />
        <IconButton
          aria-label={t("experiences.gallery_next")}
          icon={<ChevronRightIcon boxSize={6} />}
          position="absolute"
          right={{ base: 1, md: 2 }}
          top="50%"
          transform="translateY(-50%)"
          size="sm"
          variant="ghost"
          borderRadius="full"
          color={accentColor}
          bg={navBtnBg}
          _hover={{ bg: navBtnHoverBg }}
          onClick={() => goTo(activeIndex + 1)}
          zIndex={2}
        />
      </Box>

      <HStack justify="space-between" align="center" flexWrap="wrap" gap={2}>
        <Text fontSize="sm" color="gray.500" fontFamily="var(--font-body)" noOfLines={2} flex={1}>
          {activeAlt}
        </Text>
        <Text fontSize="xs" color="gray.500" fontFamily="var(--font-mono)" letterSpacing="wider" flexShrink={0}>
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </Text>
      </HStack>

      <HStack justify="center" spacing={2}>
        {images.map((src, index) => (
          <Box
            key={src}
            as="button"
            type="button"
            aria-label={getAlt(galleryAltKey(src))}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            w={index === activeIndex ? "20px" : "8px"}
            h="8px"
            borderRadius="full"
            bg={index === activeIndex ? accentColor : dotInactiveBg}
            transition="all 0.25s ease"
            border="none"
            p={0}
            cursor="pointer"
          />
        ))}
      </HStack>

      <VisuallyHidden aria-live="polite">{activeAlt}</VisuallyHidden>
    </VStack>
  );
}
