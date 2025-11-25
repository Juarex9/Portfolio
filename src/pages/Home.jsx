import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

export default function Hero() {
  const { accentColor, bgColor } = useAccentColors();
  const { t } = useTranslation();

  const heroBg = useColorModeValue(
    `linear-gradient(135deg, #f9fafb 0%, #e5f9f0 45%, #6ee7b7 100%)`,
    `linear-gradient(135deg, #020617 0%, #020617 60%, #065f46 100%)`
  );

  return (
    <Box w="full" bg={heroBg}>
      <Container maxW="6xl">
        
        {/* HERO CONTENT */}
        <VStack
          minH={{ base: "80vh", md: "calc(100vh - 72px)" }}
          spacing={8}
          align="center"
          justify="center"
          textAlign="center"
          py={{ base: 10, md: 12 }}
        >
          {/* Avatar */}
          <MotionBox
            borderRadius="full"
            boxSize={{ base: 140, md: 170 }}
            bg={bgColor}
            boxShadow={`0 0 50px ${accentColor}`}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontWeight="bold">{t("hero.avatar")}</Text>
          </MotionBox>

          {/* Título */}
          <MotionHeading
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="extrabold"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("hero.title_hello")}{" "}
            <Box as="span" color={accentColor}>
              {t("hero.title_name")}
            </Box>
          </MotionHeading>

          {/* Subtítulo */}
          <Text
            maxW="3xl"
            fontSize={{ base: "md", md: "lg" }}
            opacity={0.9}
          >
            {t("hero.subtitle")}
          </Text>

          {/* Botones */}
          <HStack spacing={4}>
            <Button as="a" href="/contacto" bg={accentColor} color="white">
              {t("hero.btn_contact")}
            </Button>
            <Button as="a" href="/proyectos" variant="outline">
              {t("hero.btn_projects")}
            </Button>
          </HStack>
          
        </VStack>
      </Container>
    </Box>
  );
}
