import { useCallback, useEffect, useRef, useState } from "react";
import { Box, HStack, IconButton, Text, VisuallyHidden, useBreakpointValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

const SPRING = { type: "spring", stiffness: 280, damping: 32, mass: 0.8 };

function getCardTransform(index, activeIndex, introProgress, metrics) {
  const offset = index - activeIndex;
  const spread = introProgress;
  const abs = Math.abs(offset);

  return {
    x: offset * metrics.xStep * spread,
    z: -abs * metrics.zStep * spread,
    rotateY: offset * -metrics.rotateStep * spread,
    scale: (1 - abs * 0.07) * (0.88 + 0.12 * spread),
    opacity: Math.max(0.35, 1 - abs * 0.22),
    zIndex: 10 - abs,
  };
}

export default function ProjectMagazineCarousel({ images, accentColor }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const framerReducedMotion = useFramerReducedMotion();
  const reducedMotion = prefersReducedMotion || framerReducedMotion;

  const metrics = useBreakpointValue({
    base: { xStep: 64, zStep: 40, rotateStep: 20, cardW: 168, cardH: 112, offsetX: 84, offsetY: 56 },
    sm: { xStep: 88, zStep: 52, rotateStep: 26, cardW: 208, cardH: 138, offsetX: 104, offsetY: 69 },
    md: { xStep: 118, zStep: 72, rotateStep: 32, cardW: 260, cardH: 172, offsetX: 130, offsetY: 86 },
    lg: { xStep: 118, zStep: 72, rotateStep: 32, cardW: 300, cardH: 192, offsetX: 150, offsetY: 96 },
  }) ?? { xStep: 64, zStep: 40, rotateStep: 20, cardW: 168, cardH: 112, offsetX: 84, offsetY: 56 };

  const [activeIndex, setActiveIndex] = useState(0);
  const [introProgress, setIntroProgress] = useState(reducedMotion ? 1 : 0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const containerRef = useRef(null);
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

  useEffect(() => {
    if (reducedMotion) return undefined;
    const timer = setTimeout(() => setIntroProgress(1), 120);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || reducedMotion) return undefined;

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      event.preventDefault();
      goTo(activeIndex + (event.deltaY > 0 ? 1 : -1));
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [activeIndex, goTo, reducedMotion]);

  const onPointerDown = (event) => {
    if (reducedMotion) return;
    setIsDragging(true);
    dragStartX.current = event.clientX;
  };

  const onPointerMove = (event) => {
    if (!isDragging || reducedMotion) return;
    const delta = event.clientX - dragStartX.current;
    if (Math.abs(delta) > 72) {
      setActiveIndex((prev) => (delta > 0 ? (prev - 1 + count) % count : (prev + 1) % count));
      dragStartX.current = event.clientX;
    }
  };

  const onPointerUp = () => setIsDragging(false);

  if (reducedMotion) {
    return (
      <Box
        display="flex"
        gap={4}
        overflowX="auto"
        pb={3}
        w="full"
        maxW="100%"
        sx={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
      >
        {images.map((img) => (
          <Box
            key={img.src}
            flex="0 0 auto"
            w={{ base: "min(220px, 78vw)", md: "280px" }}
            borderRadius="lg"
            overflow="hidden"
            border="1px solid"
            borderColor="blackAlpha.200"
            _dark={{ borderColor: "whiteAlpha.200" }}
          >
            <Box as="img" src={img.src} alt={img.label} w="full" h="auto" loading="lazy" />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box ref={containerRef} position="relative" userSelect="none" touchAction="pan-y" w="full" maxW="100%" overflow="hidden">
      <Box
        position="relative"
        h={{ base: "200px", sm: "240px", md: "300px", lg: "340px" }}
        mx="auto"
        maxW={{ base: "100%", md: "640px" }}
        px={{ base: 2, md: 0 }}
        sx={{ perspective: "1400px", perspectiveOrigin: "50% 42%" }}
        tabIndex={0}
        role="region"
        aria-label={t("presentation.carousel_hint")}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") goTo(activeIndex - 1);
          if (event.key === "ArrowRight") goTo(activeIndex + 1);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        cursor={isDragging ? "grabbing" : "grab"}
      >
        <Box position="relative" w="full" h="full" sx={{ transformStyle: "preserve-3d" }}>
          {images.map((img, index) => {
            const transform = getCardTransform(index, activeIndex, introProgress, metrics);
            const isActive = index === activeIndex;

            return (
              <MotionBox
                key={img.src}
                position="absolute"
                top="50%"
                left="50%"
                w={`${metrics.cardW}px`}
                ml={`-${metrics.offsetX}px`}
                mt={`-${metrics.offsetY}px`}
                borderRadius="md"
                overflow="hidden"
                zIndex={transform.zIndex}
                animate={{
                  x: transform.x,
                  z: transform.z,
                  rotateY: transform.rotateY,
                  scale: transform.scale,
                  opacity: transform.opacity,
                }}
                transition={SPRING}
                sx={{ transformStyle: "preserve-3d" }}
              >
                <Box
                  position="relative"
                  borderRadius="md"
                  overflow="hidden"
                  boxShadow={
                    isActive
                      ? `0 28px 60px -16px ${accentColor}55, 0 16px 40px rgba(0,0,0,0.28)`
                      : "0 12px 32px rgba(0,0,0,0.18)"
                  }
                  border="1px solid"
                  borderColor={isActive ? `${accentColor}55` : "blackAlpha.200"}
                  _dark={{ borderColor: isActive ? `${accentColor}66` : "whiteAlpha.200" }}
                  _before={{
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    bgGradient: "linear(to-r, blackAlpha.400, transparent 18%)",
                    zIndex: 1,
                    pointerEvents: "none",
                    opacity: isActive ? 0.35 : 0.55,
                  }}
                >
                  <Box
                    as="img"
                    src={img.src}
                    alt={img.label}
                    w="full"
                    h={`${metrics.cardH}px`}
                    objectFit="cover"
                    display="block"
                    loading={index <= 1 ? "eager" : "lazy"}
                    draggable={false}
                  />
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    px={3}
                    py={2}
                    bgGradient="linear(to-t, blackAlpha.800, transparent)"
                    zIndex={2}
                  >
                    <Text
                      fontSize="xs"
                      fontWeight="700"
                      color="white"
                      fontFamily="var(--font-display)"
                      letterSpacing="-0.01em"
                      noOfLines={1}
                    >
                      {img.label}
                    </Text>
                  </Box>
                </Box>
              </MotionBox>
            );
          })}
        </Box>
      </Box>

      <HStack justify="space-between" align="center" mt={6} gap={2} flexWrap="wrap">
        <HStack spacing={2}>
          <IconButton
            aria-label={t("presentation.carousel_prev")}
            icon={<ChevronLeftIcon boxSize={5} />}
            size="sm"
            variant="ghost"
            borderRadius="full"
            color={accentColor}
            onClick={() => goTo(activeIndex - 1)}
          />
          <IconButton
            aria-label={t("presentation.carousel_next")}
            icon={<ChevronRightIcon boxSize={5} />}
            size="sm"
            variant="ghost"
            borderRadius="full"
            color={accentColor}
            onClick={() => goTo(activeIndex + 1)}
          />
        </HStack>

        <Text fontSize="xs" color="gray.500" fontFamily="var(--font-mono)" letterSpacing="wider">
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </Text>

        <Text fontSize="xs" color="gray.500" fontFamily="var(--font-body)" display={{ base: "none", md: "block" }}>
          {t("presentation.carousel_hint")}
        </Text>
      </HStack>

      <HStack justify="center" spacing={2} mt={3}>
        {images.map((img, index) => (
          <Box
            key={img.src}
            as="button"
            type="button"
            aria-label={img.label}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            w={index === activeIndex ? "20px" : "8px"}
            h="8px"
            borderRadius="full"
            bg={index === activeIndex ? accentColor : "gray.300"}
            _dark={{ bg: index === activeIndex ? accentColor : "whiteAlpha.300" }}
            transition="all 0.25s ease"
            border="none"
            p={0}
            cursor="pointer"
          />
        ))}
      </HStack>

      <VisuallyHidden aria-live="polite">
        {images[activeIndex]?.label}
      </VisuallyHidden>
    </Box>
  );
}
