import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  Stack,
} from "@chakra-ui/react";
import { useAccentColors } from "../hooks/useAccentColors";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useReducedMotion } from "../hooks/useReducedMotion";
import ExperiencesCarousel from "../components/ExperiencesCarousel";

const MotionBox = motion(Box);

const AboutMe = () => {
  const { accentColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const secondaryText = "gray.500";
  const { t } = useTranslation();

  return (
    <>
      <Seo titleKey="seo.about.title" descriptionKey="seo.about.description" canonicalPath="/sobremi" />
      <Box w="100%" minH="100vh" bg="transparent" overflowX="hidden">
        <Container maxW="6xl" px={{ base: 4, md: 8 }} py={{ base: 8, md: 16 }}>
          <MotionBox initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.6 }} viewport={{ once: true }} mb={8}>
            <Stack direction="row" align="center" gap={2} mb={3}>
              <Box w="32px" h="2px" bg={accentColor} borderRadius="full" />
              <Badge borderRadius="full" px={3} py={1} bg={`${accentColor}15`} color={accentColor} textTransform="uppercase" fontSize="xs" fontWeight="600" letterSpacing="wider" fontFamily="var(--font-body)">
                {t("about.badge")}
              </Badge>
            </Stack>

            <Heading fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }} fontWeight="800" fontFamily="var(--font-display)" letterSpacing="-0.02em" lineHeight="1.2" mb={2}>
              {t("about.heading")}
            </Heading>

            <Text fontSize={{ base: "sm", md: "md" }} color={secondaryText} maxW="2xl" fontFamily="var(--font-body)">
              {t("about.context")}
            </Text>
          </MotionBox>

          <VStack align="start" spacing={{ base: 6, md: 8 }} mb={{ base: 8, md: 12 }} maxW="3xl">
            <Text fontSize={{ base: "sm", md: "md" }} color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)">
              {t("about.p1")}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)">
              {t("about.p2")}
            </Text>

            {["card2", "card3", "card1"].map((key, index) => (
              <MotionBox
                key={key}
                as="section"
                w="full"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.08 }}
                viewport={{ once: true }}
              >
                <Box borderLeft="3px solid" borderColor={accentColor} pl={{ base: 4, md: 5 }}>
                  <Heading
                    as="h2"
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="700"
                    fontFamily="var(--font-display)"
                    color={accentColor}
                    letterSpacing="-0.02em"
                    mb={2}
                  >
                    {t(`about.${key}.title`)}
                  </Heading>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color={secondaryText}
                    lineHeight="1.8"
                    fontFamily="var(--font-body)"
                  >
                    {t(`about.${key}.text`)}
                  </Text>
                </Box>
              </MotionBox>
            ))}
          </VStack>

          <Box mt={{ base: 8, md: 12 }}>
            <ExperiencesCarousel />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AboutMe;
