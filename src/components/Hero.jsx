import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Badge,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const floatingOrbs = [
  { size: 300, x: "80%", y: "10%", delay: 0, duration: 6 },
  { size: 200, x: "10%", y: "60%", delay: 1, duration: 8 },
  { size: 150, x: "70%", y: "70%", delay: 2, duration: 7 },
];

export default function Hero() {
  const { accentColor, bgColor } = useAccentColors();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <Box
      w="full"
      minH={{ base: "100vh", md: "calc(100vh - 72px)" }}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={bgColor}
        zIndex={1}
      />

      {floatingOrbs.map((orb, i) => (
        <MotionBox
          key={i}
          position="absolute"
          w={`${orb.size}px`}
          h={`${orb.size}px`}
          borderRadius="full"
          bg={`linear-gradient(135deg, ${accentColor}30, ${accentColor}10)`}
          filter="blur(60px)"
          left={orb.x}
          top={orb.y}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.6, scale: 1 }
              : {
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.1, 1],
                  y: [0, -20, 0],
                }
          }
          transition={{
            opacity: { duration: orb.duration, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: orb.duration, repeat: Infinity, ease: "easeInOut" },
            y: { duration: orb.duration, repeat: Infinity, ease: "easeInOut" },
            delay: orb.delay,
            default: { duration: orb.duration },
          }}
          zIndex={0}
        />
      ))}

      <Container maxW="6xl" position="relative" zIndex={2}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          minH={{ base: "100vh", md: "calc(100vh - 72px)" }}
          display="flex"
          alignItems="center"
          py={{ base: 16, md: 12 }}
        >
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", lg: "1fr 400px" }}
            gap={{ base: 8, lg: 12 }}
            alignItems="center"
            w="full"
          >
            <MotionBox variants={itemVariants}>
              <HStack mb={4} gap={3}>
                <Box
                  w="50px"
                  h="3px"
                  bg={accentColor}
                  borderRadius="full"
                />
                <Badge
                  px={4}
                  py={1.5}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  bg={`${accentColor}15`}
                  color={accentColor}
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Box
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg={accentColor}
                    animation={
                      prefersReducedMotion
                        ? "none"
                        : "pulse 2s infinite"
                    }
                  />
                  {t("hero.availability")}
                </Badge>
              </HStack>

              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                fontWeight="900"
                fontFamily="var(--font-display)"
                lineHeight="1.05"
                mb={6}
                sx={{
                  "& span": {
                    display: "block",
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  },
                }}
              >
                <span>{t("hero.title_1")}</span>
                <span>{t("hero.title_name")}</span>
              </Heading>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="400"
                color="gray.500"
                maxW="xl"
                mb={8}
                lineHeight="1.7"
                sx={{
                  fontFamily: "var(--font-body)",
                }}
              >
                {t("hero.subtitle")}
              </Text>

              <HStack spacing={4} flexWrap="wrap" gap={4}>
                <Button
                  as="a"
                  href="/contacto"
                  size="lg"
                  px={8}
                  h={14}
                  bg={accentColor}
                  color="white"
                  fontWeight="600"
                  fontFamily="var(--font-body)"
                  borderRadius="full"
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    w: "100%",
                    h: "100%",
                    bg: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    transition: "left 0.5s",
                  }}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: `0 10px 40px ${accentColor}40`,
                  }}
                  _hoverBefore={{ left: "100%" }}
                  transition="all 0.3s"
                >
                  {t("hero.btn_contact")}
                </Button>
                <Button
                  as="a"
                  href="/proyectos"
                  size="lg"
                  px={8}
                  h={14}
                  variant="outline"
                  fontWeight="600"
                  fontFamily="var(--font-body)"
                  borderRadius="full"
                  borderColor="gray.300"
                  borderWidth="2px"
                  _hover={{
                    borderColor: accentColor,
                    color: accentColor,
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.3s"
                >
                  {t("hero.btn_projects")}
                </Button>
              </HStack>
            </MotionBox>

            <MotionBox
              variants={itemVariants}
              display={{ base: "none", lg: "flex" }}
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <Box
                position="relative"
                w="340px"
                h="340px"
              >
                <MotionBox
                  position="absolute"
                  inset={-4}
                  borderRadius="full"
                  bg={`linear-gradient(135deg, ${accentColor}40, transparent, ${accentColor}20)`}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : { rotate: 360 }
                  }
                  transition={
                    prefersReducedMotion
                      ? {}
                      : { duration: 20, repeat: Infinity, ease: "linear" }
                  }
                />

                <MotionBox
                  position="absolute"
                  inset={-8}
                  borderRadius="full"
                  border="1px solid"
                  borderColor={`${accentColor}30`}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : { rotate: -360 }
                  }
                  transition={
                    prefersReducedMotion
                      ? {}
                      : { duration: 30, repeat: Infinity, ease: "linear" }
                  }
                />

                <MotionBox
                  position="absolute"
                  inset={-16}
                  borderRadius="full"
                  border="1px dashed"
                  borderColor={`${accentColor}15`}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : { rotate: 360 }
                  }
                  transition={
                    prefersReducedMotion
                      ? {}
                      : { duration: 45, repeat: Infinity, ease: "linear" }
                  }
                />

                <MotionBox
                  borderRadius="full"
                  w="full"
                  h="full"
                  bg={bgColor}
                  boxShadow={`0 0 80px ${accentColor}50, 0 0 120px ${accentColor}20`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                  animate={
                    prefersReducedMotion
                      ? {}
                      : { boxShadow: [
                          `0 0 80px ${accentColor}50, 0 0 120px ${accentColor}20`,
                          `0 0 100px ${accentColor}60, 0 0 150px ${accentColor}30`,
                          `0 0 80px ${accentColor}50, 0 0 120px ${accentColor}20`,
                        ] }
                  }
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Box
                    w="280px"
                    h="280px"
                    borderRadius="full"
                    overflow="hidden"
                    border="4px solid"
                    borderColor={`${accentColor}30`}
                  >
                    <img
                      src="./yo-circular.png"
                      alt="Retrato de Agustín Juárez"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </MotionBox>

                {[...Array(3)].map((_, i) => (
                  <MotionBox
                    key={i}
                    position="absolute"
                    w={3}
                    h={3}
                    borderRadius="full"
                    bg={accentColor}
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    style={{
                      top: `${30 + i * 20}%`,
                      right: i % 2 === 0 ? "-20px" : "auto",
                      left: i % 2 === 0 ? "auto" : "-20px",
                    }}
                  />
                ))}
              </Box>
            </MotionBox>
          </Box>
        </MotionBox>
      </Container>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="150px"
        bgGradient={`linear(to-t, ${bgColor}, transparent)`}
        zIndex={3}
      />
    </Box>
  );
}
