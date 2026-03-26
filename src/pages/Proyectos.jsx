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
  const { accentColor, contentBgColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const secondaryText = "gray.500";
  const { t } = useTranslation();

  const cards = [
    { key: "freelance", image: "/hello-world.jpg", link: "/freelance" },
    { key: "personal", image: "/question.jpg", link: "/personal" },
  ];

  return (
    <>
      <Seo titleKey="seo.projects.title" descriptionKey="seo.projects.description" canonicalPath="/proyectos" />
      <Box w="full" minH="100vh" bg={contentBgColor}>
        <Container maxW="6xl" py={{ base: 8, md: 16 }}>
          <MotionBox
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            mb={8}
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "flex-end" }}
              spacing={4}
            >
              <Box>
                <HStack mb={3} gap={2}>
                  <Box w="32px" h="2px" bg={accentColor} borderRadius="full" />
                  <Badge borderRadius="full" px={3} py={1} bg={`${accentColor}15`} color={accentColor} textTransform="uppercase" fontSize="xs" fontWeight="600" letterSpacing="wider" fontFamily="var(--font-body)">
                    {t("projects.badge")}
                  </Badge>
                </HStack>

                <Heading fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }} fontWeight="800" fontFamily="var(--font-display)" letterSpacing="-0.02em" lineHeight="1.2" mb={2}>
                  {t("projects.title")}
                </Heading>

                <Text fontSize={{ base: "sm", md: "md" }} color={secondaryText} maxW="2xl" fontFamily="var(--font-body)">
                  {t("projects.subtitle")}
                </Text>
              </Box>

              <Button
                as={Link}
                href="https://github.com/Juarex9"
                target="_blank"
                variant="outline"
                borderRadius="full"
                px={5}
                size="sm"
                h={10}
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

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
            {cards.map((card, index) => (
              <MotionBox
                key={card.key}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                viewport={{ once: true }}
              >
                <LinkBox as="article" role="group" cursor="pointer">
                  <Box position="relative" borderRadius="xl" overflow="hidden">
                    <Image
                      src={card.image}
                      alt={t(`projects.cards.${card.key}.title`)}
                      objectFit="cover"
                      w="100%"
                      h={{ base: "160px", sm: "200px", md: "220px" }}
                      loading="lazy"
                      transition="transform 0.5s"
                      _groupHover={{ transform: "scale(1.03)" }}
                    />
                    <HStack position="absolute" bottom={3} left={3} spacing={2}>
                      <Badge borderRadius="full" px={2} py={0.5} bg={accentColor} color="white" fontSize="xs" fontWeight="600" fontFamily="var(--font-body)">
                        {t(`projects.cards.${card.key}.tag`)}
                      </Badge>
                    </HStack>
                  </Box>

                  <Box py={3}>
                    <Heading size="md" mb={1} fontFamily="var(--font-display)" fontWeight="700">
                      <LinkOverlay href={card.link} _hover={{ color: accentColor }} transition="color 0.3s">
                        {t(`projects.cards.${card.key}.title`)}
                      </LinkOverlay>
                    </Heading>
                    <Text fontSize="sm" color={secondaryText} fontFamily="var(--font-body)">
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
