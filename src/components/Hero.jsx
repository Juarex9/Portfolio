import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Badge,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

const floatingOrbs = [
  { size: { base: 150, md: 300 }, x: { base: "70%", md: "80%" }, y: { base: "5%", md: "10%" }, delay: 0, duration: 6 },
  { size: { base: 120, md: 200 }, x: { base: "-20%", md: "10%" }, y: { base: "50%", md: "60%" }, delay: 1, duration: 8 },
  { size: { base: 100, md: 150 }, x: { base: "50%", md: "70%" }, y: { base: "60%", md: "70%" }, delay: 2, duration: 7 },
];

export default function Hero() {
  const { accentColor } = useAccentColors();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const nameColor = useColorModeValue("black", "white");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <Box
      w="full"
      minH={{ base: "auto", md: "calc(100vh - 72px)" }}
      position="relative"
      overflow="hidden"
      py={{ base: 12, md: 0 }}
    >
      <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="transparent" zIndex={1} />

      {!prefersReducedMotion && floatingOrbs.map((orb, i) => (
        <MotionBox
          key={i}
          position="absolute"
          w={{ base: `${orb.size.base}px`, md: `${orb.size.md}px` }}
          h={{ base: `${orb.size.base}px`, md: `${orb.size.md}px` }}
          borderRadius="full"
          bg={`linear-gradient(135deg, ${accentColor}30, ${accentColor}10)`}
          filter="blur(60px)"
          left={orb.x}
          top={orb.y}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          zIndex={0}
        />
      ))}

      <Container maxW="6xl" position="relative" zIndex={2}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          minH={{ base: "auto", md: "calc(100vh - 72px)" }}
          display="flex"
          alignItems="center"
          py={{ base: 8, md: 12 }}
        >
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", lg: "1fr 380px" }}
            gap={{ base: 8, md: 12 }}
            alignItems="center"
            w="full"
          >
            <MotionBox variants={itemVariants}>
              <HStack mb={4} gap={2} flexWrap="wrap">
                <Box w="6px" h="6px" borderRadius="full" bg={accentColor} />
                <Badge
                  px={2.5}
                  py={0.5}
                  borderRadius="full"
                  fontSize="10px"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  bg={`${accentColor}15`}
                  color={accentColor}
                >
                  {t("hero.availability")}
                </Badge>
              </HStack>

              <Heading
                as="h1"
                fontSize={{ base: "2.5rem", sm: "3xl", md: "5xl", lg: "6xl" }}
                fontWeight="800"
                fontFamily="var(--font-display)"
                lineHeight="1.1"
                mb={4}
              >
                <Box as="span" display="block" color={nameColor}>
                  {t("hero.title_1")}
                </Box>
                <Box
                  as="span"
                  display="block"
                  background={`linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`}
                  WebkitBackgroundClip="text"
                  WebkitTextFillColor="transparent"
                  backgroundClip="text"
                >
                  {t("hero.title_name")}
                </Box>
              </Heading>

              <Text
                fontSize={{ base: "sm", sm: "md", md: "lg" }}
                fontWeight="400"
                color="gray.500"
                maxW={{ base: "100%", md: "xl" }}
                mb={6}
                lineHeight="1.7"
                fontFamily="var(--font-body)"
              >
                {t("hero.subtitle")}
              </Text>

              <HStack spacing={2} flexWrap="wrap">
                <Button
                  as="a"
                  href="/contacto"
                  size="sm"
                  px={5}
                  h={10}
                  bg={accentColor}
                  color="white"
                  fontWeight="600"
                  fontFamily="var(--font-body)"
                  borderRadius="full"
                  _hover={{ opacity: 0.9 }}
                  transition="all 0.2s"
                >
                  {t("hero.btn_contact")}
                </Button>
                <Button
                  as="a"
                  href="/proyectos"
                  size="sm"
                  px={5}
                  h={10}
                  fontWeight="600"
                  fontFamily="var(--font-body)"
                  borderRadius="full"
                  bg="transparent"
                  color={accentColor}
                  border="1px solid"
                  borderColor={`${accentColor}50`}
                  _hover={{ borderColor: accentColor, bg: `${accentColor}08` }}
                  transition="all 0.2s"
                >
                  {t("hero.btn_projects")}
                </Button>
              </HStack>
            </MotionBox>

            <MotionBox
              variants={itemVariants}
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
              w={{ base: "200px", md: "280px", lg: "320px" }}
              h={{ base: "200px", md: "280px", lg: "320px" }}
              mx="auto"
            >
              <MotionBox
                position="absolute"
                inset={{ base: -2, md: -4 }}
                borderRadius="full"
                bg={`linear-gradient(135deg, ${accentColor}30, transparent, ${accentColor}15)`}
                animate={prefersReducedMotion ? {} : { 
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={prefersReducedMotion ? {} : { 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "linear"
                }}
              />
              <MotionBox
                position="absolute"
                inset={{ base: -4, md: -8 }}
                borderRadius="full"
                border="1px dashed"
                borderColor={`${accentColor}40`}
                animate={prefersReducedMotion ? {} : { rotate: -360 }}
                transition={prefersReducedMotion ? {} : { duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <MotionBox
                position="absolute"
                inset={{ base: -8, md: -12 }}
                borderRadius="full"
                border="1px solid"
                borderColor={`${accentColor}20`}
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={prefersReducedMotion ? {} : { duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <MotionBox
                borderRadius="full"
                w="full"
                h="full"
                bg="transparent"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                animate={prefersReducedMotion ? {} : {
                  y: [0, -8, 0]
                }}
                transition={prefersReducedMotion ? {} : {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Box 
                  w={{ base: "160px", md: "220px", lg: "260px" }} 
                  h={{ base: "160px", md: "220px", lg: "260px" }} 
                  borderRadius="full" 
                  overflow="hidden" 
                  border="3px solid" 
                  borderColor={`${accentColor}40`}
                  boxShadow={`0 0 30px ${accentColor}30, 0 0 60px ${accentColor}15`}
                >
                  <img src="./yo-circular.png" alt="Agustín Juárez" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
              </MotionBox>
            </MotionBox>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
