import React from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Image,
  LinkBox,
  LinkOverlay,
  Container,
  Badge,
  HStack,
  Stack,
  Button,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

export default function Proyectos() {
  const { accentColor, bgColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const secondaryText = "gray.500";
  const { t } = useTranslation();

  const cards = [
    { key: "freelance", image: "/freelance-projects.png", link: "/freelance" },
    { key: "personal", image: "/perrsonal-projects.png", link: "/personal" },
  ];

  return (
    <>
      <Seo
        titleKey="seo.projects.title"
        descriptionKey="seo.projects.description"
        canonicalPath="/proyectos"
      />
      <Box w="full" minH="100vh" bg={bgColor}>
        <Container maxW="6xl" py={{ base: 12, md: 20 }}>
          <MotionBox
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            mb={10}
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "flex-end" }}
              spacing={4}
            >
              <Box>
                <HStack mb={4} gap={3}>
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
                    {t("projects.badge")}
                  </Badge>
                </HStack>

                <Heading
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="800"
                  fontFamily="var(--font-display)"
                  letterSpacing="-0.02em"
                  lineHeight="1.1"
                  mb={3}
                >
                  {t("projects.title")}
                </Heading>

                <Text fontSize={{ base: "md", md: "lg" }} color={secondaryText} maxW="2xl" fontFamily="var(--font-body)">
                  {t("projects.subtitle")}
                </Text>
              </Box>

              <Button
                as={Link}
                href="https://github.com/Juarex9"
                target="_blank"
                variant="outline"
                borderRadius="full"
                px={6}
                h={12}
                fontWeight="600"
                fontFamily="var(--font-body)"
                borderColor={accentColor}
                color={accentColor}
                _hover={{ bg: accentColor, color: "white" }}
                transition="all 0.3s"
              >
                {t("projects.github_button")}
              </Button>
            </Stack>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }}>
            {cards.map((card, index) => (
              <MotionBox
                key={card.key}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                viewport={{ once: true }}
              >
                <LinkBox as="article" role="group" cursor="pointer">
                  <Box position="relative" borderRadius="2xl" overflow="hidden">
                    <Image
                      src={card.image}
                      alt={t(`projects.cards.${card.key}.title`)}
                      objectFit="cover"
                      w="100%"
                      h="240px"
                      loading="lazy"
                      transition="transform 0.5s"
                      _groupHover={{ transform: "scale(1.03)" }}
                    />
                    <HStack position="absolute" bottom={4} left={4} spacing={2}>
                      <Badge borderRadius="full" px={3} py={1} bg={accentColor} color="white" fontSize="xs" fontWeight="600" fontFamily="var(--font-body)">
                        {t(`projects.cards.${card.key}.tag`)}
                      </Badge>
                    </HStack>
                  </Box>

                  <Box py={4}>
                    <Heading size="lg" mb={2} fontFamily="var(--font-display)" fontWeight="700">
                      <LinkOverlay href={card.link} _hover={{ color: accentColor }} transition="color 0.3s">
                        {t(`projects.cards.${card.key}.title`)}
                      </LinkOverlay>
                    </Heading>
                    <Text fontSize="md" color={secondaryText} fontFamily="var(--font-body)">
                      {t(`projects.cards.${card.key}.description`)}
                    </Text>
                  </Box>
                </LinkBox>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
