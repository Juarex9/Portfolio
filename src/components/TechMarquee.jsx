import React, { useMemo } from "react";
import { Box, Container, HStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";

import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiReact,
  SiExpress,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiTypescript,
  SiChakraui,
} from "react-icons/si";

const MotionBox = motion(Box);

export default function TechMarquee({ speedSeconds = 22, title = "Tech stack", showTitle = true }) {
  const { accentColor, contentBgColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();

  const items = useMemo(
    () => [
      { label: "JavaScript", Icon: SiJavascript },
      { label: "TypeScript", Icon: SiTypescript },
      { label: "HTML5", Icon: SiHtml5 },
      { label: "CSS3", Icon: SiCss3 },
      { label: "Python", Icon: SiPython },
      { label: "React", Icon: SiReact },
      { label: "Chakra UI", Icon: SiChakraui },
      { label: "Node.js", Icon: SiNodedotjs },
      { label: "Express", Icon: SiExpress },
      { label: "PostgreSQL", Icon: SiPostgresql },
      { label: "MongoDB", Icon: SiMongodb },
      { label: "Git", Icon: SiGit },
    ],
    []
  );

  const loop = [...items, ...items];

  return (
    <Box w="full" py={{ base: 6, md: 10 }} bg={contentBgColor}>
      <Container maxW="6xl">
        {showTitle && (
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Box w="20px" h="2px" bg={accentColor} borderRadius="full" />
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="wider"
              textTransform="uppercase"
              color={accentColor}
              fontFamily="var(--font-body)"
            >
              {title}
            </Text>
          </Box>
        )}

        <Box overflow="hidden">
          <MotionBox
            display="flex"
            gap={{ base: 2, md: 3 }}
            animate={prefersReducedMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
            transition={{
              duration: speedSeconds,
              ease: "linear",
              repeat: prefersReducedMotion ? 0 : Infinity,
            }}
            w="max-content"
          >
            {loop.map(({ label, Icon }, idx) => (
              <HStack
                key={`${label}-${idx}`}
                spacing={1.5}
                borderRadius="lg"
                px={{ base: 2, md: 3 }}
                py={{ base: 1.5, md: 2 }}
                flex="0 0 auto"
                userSelect="none"
                cursor="default"
              >
                <Box as={Icon} fontSize={{ base: "14px", md: "16px" }} color={accentColor} />
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="500"
                  whiteSpace="nowrap"
                  fontFamily="var(--font-body)"
                  color="gray.500"
                >
                  {label}
                </Text>
              </HStack>
            ))}
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
