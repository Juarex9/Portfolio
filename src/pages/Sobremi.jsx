import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  Badge,
  Stack,
} from "@chakra-ui/react";
import { useAccentColors } from "../hooks/useAccentColors";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

const AboutMe = () => {
  const { accentColor, bgColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const secondaryText = "gray.500";
  const { t } = useTranslation();

  return (
    <>
      <Seo
        titleKey="seo.about.title"
        descriptionKey="seo.about.description"
        canonicalPath="/sobremi"
      />
      <Box w="100%" minH="100vh" bg={bgColor}>
        <Container maxW="6xl" px={{ base: 4, md: 8 }} py={{ base: 12, md: 20 }}>
          <MotionBox
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            mb={12}
          >
            <Stack direction="row" align="center" gap={3} mb={4}>
              <Box w="40px" h="2px" bg={accentColor} borderRadius="full" />
              <Badge
                borderRadius="full"
                px={4}
                py={1.5}
                bg={`${accentColor}15`}
                color={accentColor}
                textTransform="uppercase"
                fontSize="xs"
                fontWeight="600"
                letterSpacing="wider"
                fontFamily="var(--font-body)"
              >
                {t("about.badge")}
              </Badge>
            </Stack>

            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="800"
              fontFamily="var(--font-display)"
              letterSpacing="-0.02em"
              lineHeight="1.1"
              mb={3}
            >
              {t("about.heading")}
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color={secondaryText} maxW="2xl" fontFamily="var(--font-body)">
              {t("about.context")}
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 12 }} alignItems="center" mb={{ base: 12, md: 16 }}>
            <MotionBox
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="/aboutme.png"
                alt="Espacio de trabajo de Agustín Juárez"
                borderRadius="2xl"
                objectFit="cover"
                h={{ base: "260px", md: "340px" }}
                w="100%"
                loading="lazy"
              />
            </MotionBox>

            <VStack align="start" spacing={5}>
              <Text fontSize={{ base: "md", md: "lg" }} color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)">
                {t("about.p1")}
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)">
                {t("about.p2")}
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)">
                {t("about.p3")}
              </Text>
            </VStack>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 6, md: 8 }}>
            {["card1", "card2", "card3"].map((key, index) => (
              <MotionBox
                key={key}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                viewport={{ once: true }}
              >
                <Heading
                  size="md"
                  mb={3}
                  fontFamily="var(--font-display)"
                  fontWeight="700"
                  color={accentColor}
                >
                  {t(`about.${key}.title`)}
                </Heading>
                <Text color={secondaryText} fontSize="sm" lineHeight="1.7" fontFamily="var(--font-body)">
                  {t(`about.${key}.text`)}
                </Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default AboutMe;
