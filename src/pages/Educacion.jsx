import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  HStack,
  VStack,
  Grid,
  GridItem,
  Wrap,
  WrapItem,
  Tag,
  Link,
  Button,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CheckCircle, ExternalLink } from "lucide-react";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

export default function EducationTimeline() {
  const { accentColor, bgColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const secondaryText = "gray.500";
  const locationColor = "gray.500";
  const { t } = useTranslation();

  const items = ["ucasal", "reparando", "coder"].map((key) => {
    const base = `education.${key}`;
    return {
      key,
      title: t(`${base}.title`),
      institution: t(`${base}.institution`),
      location: t(`${base}.location`),
      start: t(`${base}.start`),
      end: t(`${base}.end`),
      highlights: t(`${base}.highlights`, { returnObjects: true }) || [],
      tags: t(`${base}.tags`, { returnObjects: true }) || [],
      links: t(`${base}.links`, { returnObjects: true }) || [],
    };
  });

  return (
    <>
      <Seo titleKey="seo.education.title" descriptionKey="seo.education.description" canonicalPath="/educacion" />
      <Box w="full" minH="100vh" bg={bgColor}>
        <Container maxW="6xl" py={{ base: 12, md: 20 }}>
          <MotionBox initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.6 }} viewport={{ once: true }} mb={12}>
            <HStack mb={4} gap={3}>
              <Box w="40px" h="2px" bg={accentColor} borderRadius="full" />
              <Badge borderRadius="full" px={4} py={1.5} bg={`${accentColor}15`} color={accentColor} textTransform="uppercase" fontSize="xs" fontWeight="600" letterSpacing="wider" fontFamily="var(--font-body)">{t("education.section.badge")}</Badge>
            </HStack>
            <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="800" fontFamily="var(--font-display)" letterSpacing="-0.02em" lineHeight="1.1" mb={3}>{t("education.section.heading")}</Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color={secondaryText} maxW="2xl" fontFamily="var(--font-body)">{t("education.section.desc")}</Text>
          </MotionBox>

          <Grid templateColumns={{ base: "1fr", md: "260px 1fr" }} gap={{ base: 8, md: 12 }}>
            <GridItem>
              <Box position="relative" pl={{ base: 0, md: 6 }}>
                <Box position="absolute" left={{ base: "6px", md: "22px" }} top="4px" bottom="4px" width="2px" bg={`linear-gradient(to-b, ${accentColor}, transparent)`} opacity={0.5} />
                <VStack align="stretch" spacing={6}>
                  {items.map((it) => (
                    <HStack key={it.key} spacing={3} align="flex-start">
                      <Box pt="2px"><Box w="14px" h="14px" borderRadius="full" bg={accentColor} /></Box>
                      <VStack spacing={0} align="flex-start">
                        <Text fontSize="sm" color={locationColor} fontFamily="var(--font-body)">{it.start} – {it.end}</Text>
                        <Text fontWeight="600" fontFamily="var(--font-display)">{it.title}</Text>
                        <Text fontSize="sm" color={locationColor}>{it.institution}</Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </GridItem>

            <GridItem>
              <VStack align="stretch" spacing={{ base: 5, md: 6 }}>
                {items.map((it, idx) => (
                  <MotionBox key={it.key} initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : idx * 0.1 }} viewport={{ once: true }}>
                    <HStack justify="space-between" align="flex-start" mb={4} flexWrap="wrap" gap={2}>
                      <VStack align="flex-start" spacing={1}>
                        <Text fontSize="lg" fontWeight="700" fontFamily="var(--font-display)">{it.institution}</Text>
                        <Text fontSize="sm" color={locationColor}>{it.location}</Text>
                      </VStack>
                      <Tag borderRadius="full" px={3} py={1} bg={`${accentColor}15`} color={accentColor} fontFamily="var(--font-body)" fontSize="xs" fontWeight="500">{it.start} – {it.end}</Tag>
                    </HStack>
                    <Heading as="h3" size="md" color={accentColor} mb={4} fontFamily="var(--font-display)" fontWeight="700">{it.title}</Heading>
                    <Stack spacing={3} mb={5}>
                      {it.highlights.map((h, i) => (
                        <HStack key={i} align="flex-start" spacing={3}>
                          <Box mt="4px" w="24px" h="24px" borderRadius="lg" bg={`${accentColor}15`} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                            <Icon as={CheckCircle} boxSize={4} color={accentColor} />
                          </Box>
                          <Text color={secondaryText} fontFamily="var(--font-body)">{h}</Text>
                        </HStack>
                      ))}
                    </Stack>
                    {it.tags.length > 0 && (
                      <Wrap mb={5} spacing={2}>
                        {it.tags.map((tTag) => (
                          <WrapItem key={tTag}><Tag size="md" borderRadius="full" bg={`${accentColor}15`} color={accentColor} fontFamily="var(--font-body)" fontSize="xs" fontWeight="500">{tTag}</Tag></WrapItem>
                        ))}
                      </Wrap>
                    )}
                    {it.links.length > 0 && (
                      <HStack spacing={3} flexWrap="wrap">
                        {it.links.map((l) => (
                          <Button key={l.label} as={Link} href={l.href} target="_blank" size="sm" rightIcon={<Icon as={ExternalLink} boxSize={3} />} variant="outline" borderRadius="full" borderColor={accentColor} color={accentColor} _hover={{ bg: `${accentColor}10` }} fontFamily="var(--font-body)" transition="all 0.3s">{l.label}</Button>
                        ))}
                      </HStack>
                    )}
                  </MotionBox>
                ))}
              </VStack>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
