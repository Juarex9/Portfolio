import React, { useEffect, useMemo, useState } from "react";
import { Box, Container, VStack, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import styles from "../styles/waterfall.module.css"; // <-- (ajustá la ruta si tu estructura difiere)

const MotionBox = motion(Box);

export default function Web3ComingSoonFlipWords() {
  const { accentColor, bgColor, cardBg } = useAccentColors();

  const muted = useColorModeValue("blackAlpha.700", "whiteAlpha.700");
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  const words = useMemo(
    () => ["dApps", "Smart contracts", "Indexación", "Integraciones", "Casos de estudio"],
    []
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 1800);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <Box py={{ base: 14, md: 58 }} bg={bgColor}>
      <Container maxW="3x1" minH="60vh" >
        <VStack spacing={5} align="center" textAlign="center">
          <Box
            borderWidth="1px"
            borderColor={borderColor}
            bg={cardBg}
            borderRadius="2xl"
            px={{ base: 6, md: 8 }}
            py={{ base: 6, md: 7 }}
            w="full"
            maxW="2xl"
          >
            <Heading fontSize={{ base: "2xl", md: "4xl" }} letterSpacing="-0.02em">
              En desarrollo
            </Heading>

            {/* Waterfall loader */}
            <Box
              mt={5}
              display="flex"
              justifyContent="center"
              // seteamos la variable CSS que usa tu animación
              style={{ "--primary": accentColor }}
            >
              <Box as="div" className={styles.waterfall} aria-hidden="true">
                <div />
                <div />
                <div />
                <div />
                <div />
              </Box>
            </Box>

            <Text mt={5} color={muted} fontSize={{ base: "md", md: "lg" }}>
              Estoy preparando:{" "}
              <Box
                as="span"
                color={accentColor}
                fontWeight="semibold"
                display="inline-block"
                position="relative"
              >
                <AnimatePresence mode="wait">
                  <MotionBox
                    key={words[idx]}
                    as="span"
                    display="inline-block"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {words[idx]}
                  </MotionBox>
                </AnimatePresence>
              </Box>
            </Text>

            <Text mt={5} color={muted} fontSize="sm">
              Proximamente estarán listos los primeros proyectos
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
