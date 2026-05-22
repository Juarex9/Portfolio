import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Badge, Heading, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useStreamLayout } from "../hooks/useStreamLayout.js";
import { computeScannerClip, getProjectCodeOverlay } from "./featuredStreamUtils.js";

function FeaturedStreamCard({
  cardRef,
  project,
  clipRight,
  clipLeft,
  scanning,
  accentColor,
  borderColor,
  cardWidth,
  compact,
  t,
}) {
  const baseKey = `projects.items.${project.key}`;
  const title = t(`${baseKey}.title`);
  const description = t(`${baseKey}.description`);
  const tech = t(`${baseKey}.tech`, { returnObjects: true });
  const code = getProjectCodeOverlay(project.key, title, tech);
  const primaryLink = project.demo || project.github || "/proyectos";

  return (
    <Box
      as="article"
      flex={cardWidth ? `0 0 ${cardWidth}px` : "1 1 auto"}
      w={cardWidth ? `${cardWidth}px` : "full"}
      maxW="100%"
      role="group"
    >
      <LinkBox>
        <Box
          ref={cardRef}
          position="relative"
          h={{ base: "170px", sm: "190px", md: "220px" }}
          borderRadius="xl"
          overflow="hidden"
          border="1px solid"
          borderColor={scanning ? accentColor : borderColor}
          boxShadow={scanning ? `0 0 32px ${accentColor}44` : "md"}
          transition="border-color 0.2s ease, box-shadow 0.2s ease"
          bg="black"
        >
          <Box className="featured-card-normal" position="absolute" inset={0} sx={{ "--clip-right": `${clipRight}%` }}>
            {project.image ? (
              <Box as="img" src={project.image} alt={title} w="full" h="full" objectFit="cover" draggable={false} />
            ) : (
              <Box w="full" h="full" bgGradient={`linear(135deg, ${accentColor}, ${accentColor}99)`} />
            )}
          </Box>

          <Box className="featured-card-overlay" position="absolute" inset={0} sx={{ "--clip-left": `${clipLeft}%` }}>
            <Box
              as="pre"
              m={0}
              p={3}
              h="full"
              overflow="hidden"
              fontFamily="var(--font-mono)"
              fontSize={{ base: "9px", md: "10px" }}
              lineHeight="1.35"
              color={`${accentColor}cc`}
              whiteSpace="pre-wrap"
              className={scanning ? "featured-code-glitch" : undefined}
            >
              {code}
            </Box>
          </Box>

          <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.800, transparent 55%)" pointerEvents="none" />

          <Box position="absolute" bottom={3} left={3} right={3} zIndex={2}>
            <Badge borderRadius="full" px={2} py={0.5} mb={2} bg={`${accentColor}22`} color={accentColor} fontSize="xs">
              {t(`projects.types.${project.type}`)}
            </Badge>
            <Heading as="h3" size="sm" color="white" fontFamily="var(--font-display)" fontWeight="700" fontSize={{ base: "sm", md: "md" }}>
              {primaryLink.startsWith("http") ? (
                <LinkOverlay as="a" href={primaryLink} target="_blank" rel="noopener noreferrer" _hover={{ color: accentColor }}>
                  {title}
                </LinkOverlay>
              ) : (
                <LinkOverlay as={RouterLink} to={primaryLink} _hover={{ color: accentColor }}>
                  {title}
                </LinkOverlay>
              )}
            </Heading>
          </Box>
        </Box>

        {!compact && (
          <Text mt={3} fontSize="sm" color="gray.500" noOfLines={2} lineHeight="1.6" fontFamily="var(--font-body)">
            {description}
          </Text>
        )}
      </LinkBox>
    </Box>
  );
}

export default function FeaturedProjectStream({ projects, accentColor, borderColor }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const positionRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startPos: 0 });
  const autoScrollRef = useRef(true);

  const { cardWidth, cardGap, cardStep, isMobile } = useStreamLayout(containerRef);
  const streamProjects = useMemo(() => [...projects, ...projects, ...projects], [projects]);
  const loopWidth = projects.length * cardStep;

  const [clips, setClips] = useState(() => streamProjects.map(() => ({ clipRight: 0, clipLeft: 0, scanning: false })));

  const applyTrackTransform = useCallback((value) => {
    positionRef.current = value;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${value}px)`;
    }
  }, []);

  useEffect(() => {
    if (loopWidth > 0) {
      applyTrackTransform(-loopWidth);
    }
  }, [loopWidth, applyTrackTransform]);

  const wrapPosition = useCallback(
    (value) => {
      if (loopWidth <= 0) return value;
      if (value < -loopWidth * 2) return value + loopWidth;
      if (value > 0) return value - loopWidth;
      return value;
    },
    [loopWidth]
  );

  const updateClips = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scannerX = container.getBoundingClientRect().left + container.clientWidth / 2;
    const next = cardRefs.current.map((node) => {
      if (!node) return { clipRight: 0, clipLeft: 0, scanning: false };
      return computeScannerClip(node.getBoundingClientRect(), scannerX);
    });

    setClips((prev) => {
      const changed = next.some((clip, index) => (
        clip.clipRight !== prev[index]?.clipRight
        || clip.clipLeft !== prev[index]?.clipLeft
        || clip.scanning !== prev[index]?.scanning
      ));
      return changed ? next : prev;
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || loopWidth <= 0) return undefined;
    let frameId = 0;

    const tick = () => {
      if (autoScrollRef.current && !dragRef.current.active) {
        const next = wrapPosition(positionRef.current - (isMobile ? 0.25 : 0.35));
        if (next !== positionRef.current) {
          applyTrackTransform(next);
        }
      }
      updateClips();
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [prefersReducedMotion, updateClips, wrapPosition, loopWidth, isMobile, applyTrackTransform]);

  useEffect(() => {
    const onResize = () => updateClips();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateClips]);

  const onPointerDown = (event) => {
    if (prefersReducedMotion) return;
    dragRef.current = { active: true, startX: event.clientX, startPos: positionRef.current };
    autoScrollRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!dragRef.current.active) return;
    const delta = event.clientX - dragRef.current.startX;
    const next = wrapPosition(dragRef.current.startPos + delta);
    applyTrackTransform(next);
  };

  const onPointerUp = (event) => {
    dragRef.current.active = false;
    autoScrollRef.current = true;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onWheel = (event) => {
    if (prefersReducedMotion) return;
    event.preventDefault();
    autoScrollRef.current = false;
    const delta = event.deltaY > 0 ? -24 : 24;
    const next = wrapPosition(positionRef.current + delta);
    applyTrackTransform(next);
    window.setTimeout(() => {
      autoScrollRef.current = true;
    }, 1800);
  };

  if (prefersReducedMotion) {
    return (
      <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
        {projects.map((project) => (
          <FeaturedStreamCard
            key={project.key}
            project={project}
            clipRight={0}
            clipLeft={0}
            scanning={false}
            accentColor={accentColor}
            borderColor={borderColor}
            t={t}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box position="relative" mt={4} w="full" maxW="100%">
      <Box
        ref={containerRef}
        position="relative"
        w="full"
        minH={{ base: "210px", sm: "230px", md: "260px" }}
        overflow="hidden"
        onPointerEnter={() => { autoScrollRef.current = false; }}
        onPointerLeave={() => { autoScrollRef.current = true; }}
      >
        <Box className="featured-scanner-beam" sx={{ "--scanner-color": accentColor }} aria-hidden="true">
          <Text className="featured-scanner-label" sx={{ color: accentColor }}>
            scan
          </Text>
        </Box>

        <Box
          ref={trackRef}
          className="featured-card-track"
          display="flex"
          alignItems="flex-start"
          gap={`${cardGap}px`}
          pl={`calc(50% - ${cardWidth / 2}px)`}
          pr={`calc(50% - ${cardWidth / 2}px)`}
          cursor="grab"
          userSelect="none"
          touchAction="pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
          _active={{ cursor: "grabbing" }}
        >
          {streamProjects.map((project, index) => (
            <FeaturedStreamCard
              key={`${project.key}-${index}`}
              cardRef={(node) => {
                cardRefs.current[index] = node;
              }}
              project={project}
              clipRight={clips[index]?.clipRight ?? 0}
              clipLeft={clips[index]?.clipLeft ?? 0}
              scanning={clips[index]?.scanning ?? false}
              accentColor={accentColor}
              borderColor={borderColor}
              cardWidth={cardWidth}
              compact
              t={t}
            />
          ))}
        </Box>
      </Box>

      <Text mt={4} textAlign="center" fontSize="xs" color="gray.500" fontFamily="var(--font-body)" px={2}>
        {t("featured.stream_hint")}
      </Text>
    </Box>
  );
}
