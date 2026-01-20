import React, { useMemo } from "react";
import { Box, Container, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";

// Icons (react-icons)
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
} from "react-icons/si";
import { MdBuild } from "react-icons/md";

const MotionBox = motion(Box);

export default function TechMarquee({
  speedSeconds = 22,
  title = "Tech stack",
  showTitle = true,
}) {
  const { accentColor, bgColor, textColor } = useAccentColors();
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  // Lista “canónica”
  const items = useMemo(
    () => [
      { label: "JavaScript", Icon: SiJavascript },
      { label: "HTML", Icon: SiHtml5 },
      { label: "CSS", Icon: SiCss3 },
      { label: "Python", Icon: SiPython },
      { label: "React", Icon: SiReact },
      { label: "Node.js", Icon: SiNodedotjs },
      { label: "Express", Icon: SiExpress },
      { label: "SQL", Icon: SiPostgresql }, // si querés MySQL: SiMysql
      { label: "MongoDB", Icon: SiMongodb },
      { label: "Git", Icon: SiGit },
      { label: "Repair / Tech", Icon: MdBuild }, // referencia a técnico reparación
    ],
    []
  );

  // Duplicamos para loop infinito
  const loop = [...items, ...items];

  return (
    <Box w="full" bg={bgColor} py={{ base: 6, md: 7 }}>
      <Container maxW="6xl">
        <Box
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="2xl"
          bg={bgColor}
          overflow="hidden"
          position="relative"
          px={{ base: 4, md: 6 }}
          py={{ base: 4, md: 5 }}
        >
          {showTitle && (
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.14em"
              color={textColor}
              mb={3}
            >
              {title.toUpperCase()}
            </Text>
          )}

          {/* Fade edges (estructura, no color fuerte) */}
          <Box
            pointerEvents="none"
            position="absolute"
            insetY="0"
            left="0"
            w="56px"
            bgGradient={useColorModeValue(
              "linear(to-r, white, transparent)",
              "linear(to-r, #0B1220, transparent)"
            )}
          />
          <Box
            pointerEvents="none"
            position="absolute"
            insetY="0"
            right="0"
            w="56px"
            bgGradient={useColorModeValue(
              "linear(to-l, white, transparent)",
              "linear(to-l, #0B1220, transparent)"
            )}
          />

          {/* Marquee track */}
          <Box overflow="hidden">
            <MotionBox
              display="flex"
              gap={{ base: 3, md: 4 }}
              // clave: mover de 0% a -50% porque duplicamos el contenido
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: speedSeconds,
                ease: "linear",
                repeat: Infinity,
              }}
              w="max-content"
            >
              {loop.map(({ label, Icon }, idx) => (
                <TechPill
                  key={`${label}-${idx}`}
                  label={label}
                  Icon={Icon}
                  accentColor={accentColor}
                  borderColor={borderColor}
                  textColor={textColor}
                />
              ))}
            </MotionBox>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function TechPill({ label, Icon, accentColor, borderColor, textColor }) {
  return (
    <HStack
      spacing={2}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      px={{ base: 3, md: 4 }}
      py={{ base: 2, md: 2.5 }}
      flex="0 0 auto"
      userSelect="none"
      _hover={{ transform: "translateY(-1px)" }}
      transition="transform 0.15s ease"
    >
      <Box as={Icon} fontSize="18px" color={accentColor} />
      <Text fontSize="sm" color={textColor} whiteSpace="nowrap">
        {label}
      </Text>
    </HStack>
  );
}
