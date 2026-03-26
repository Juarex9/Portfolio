import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  HStack,
  VStack,
  Wrap,
  WrapItem,
  Tag,
  Link,
  Button,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

export default function EducationTimeline() {
  const { accentColor, contentBgColor, borderColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const secondaryText = "gray.500";
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
      <Box w="full" minH="100vh" bg="transparent">
        <Container maxW="6xl" py={{ base: 8, md: 16 }}>
          <MotionBox initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.6 }} viewport={{ once: true }} mb={8}>
            <HStack mb={3} gap={2}>
              <Box w="32px" h="2px" bg={accentColor} borderRadius="full" />
              <Badge borderRadius="full" px={3} py={1} bg={`${accentColor}15`} color={accentColor} textTransform="uppercase" fontSize="xs" fontWeight="600" letterSpacing="wider" fontFamily="var(--font-body)">{t("education.section.badge")}</Badge>
            </HStack>
            <Heading fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }} fontWeight="800" fontFamily="var(--font-display)" letterSpacing="-0.02em" lineHeight="1.2" mb={2}>{t("education.section.heading")}</Heading>
            <Text fontSize={{ base: "sm", md: "md" }} color={secondaryText} maxW="2xl" fontFamily="var(--font-body)">{t("education.section.desc")}</Text>
          </MotionBox>

          <Box position="relative" pl={{ base: 6, md: 10 }}>
            <Box
              position="absolute"
              left={{ base: "15px", md: "23px" }}
              top={0}
              bottom={0}
              w="2px"
              bg={borderColor}
              borderRadius="full"
            />

            <Stack spacing={{ base: 6, md: 8 }}>
              {items.map((it, idx) => (
                <MotionBox key={it.key} initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : idx * 0.1 }} viewport={{ once: true }} position="relative">
                  <Box
                    position="absolute"
                    left={{ base: "-21px", md: "-29px" }}
                    top={{ base: "20px", md: "24px" }}
                    w={{ base: "12px", md: "16px" }}
                    h={{ base: "12px", md: "16px" }}
                    borderRadius="full"
                    bg={contentBgColor}
                    border="2px solid"
                    borderColor={accentColor}
                    boxShadow={`0 0 0 4px ${contentBgColor}`}
                    zIndex={1}
                  />

                  <Box border="1px solid" borderColor={borderColor} borderRadius="xl" p={{ base: 4, md: 5 }} boxShadow="sm" _hover={{ transform: "translateY(-2px)", boxShadow: "md" }} transition="all 0.2s">
                    <HStack justify="space-between" align="flex-start" mb={2} flexWrap="wrap" gap={2}>
                      <VStack align="flex-start" spacing={0}>
                        <Heading size="sm" fontFamily="var(--font-display)" fontWeight="700">{it.institution}</Heading>
                        <Text fontSize="xs" color={secondaryText}>{it.location}</Text>
                      </VStack>
                      <Tag borderRadius="full" px={2} py={0.5} bg={`${accentColor}15`} color={accentColor} fontFamily="var(--font-body)" fontSize="xs" fontWeight="500">{it.start} – {it.end}</Tag>
                    </HStack>
                    <Heading as="h3" size="xs" color={accentColor} mb={3} fontFamily="var(--font-display)" fontWeight="600">{it.title}</Heading>
                    
                    <Stack spacing={2} mb={4}>
                      {it.highlights.slice(0, 2).map((h, i) => (
                        <HStack key={i} align="flex-start" spacing={2}>
                          <Box mt="2px" w="6px" h="6px" borderRadius="full" bg={accentColor} flexShrink={0} />
                          <Text fontSize="xs" color={secondaryText} fontFamily="var(--font-body)" lineHeight="1.6">{h}</Text>
                        </HStack>
                      ))}
                    </Stack>

                    {it.tags.length > 0 && (
                      <Wrap spacing={1.5} mb={3}>
                        {it.tags.map((tTag) => (
                          <WrapItem key={tTag}><Tag size="sm" borderRadius="full" bg={`${accentColor}15`} color={accentColor} fontFamily="var(--font-body)" fontSize="xs" fontWeight="500">{tTag}</Tag></WrapItem>
                        ))}
                      </Wrap>
                    )}
                    {it.links.length > 0 && (
                      <HStack spacing={2} flexWrap="wrap">
                        {it.links.map((l) => (
                          <Button key={l.label} as={Link} href={l.href} target="_blank" size="xs" rightIcon={<Icon as={ExternalLink} boxSize={2.5} />} variant="outline" borderRadius="full" borderColor={accentColor} color={accentColor} _hover={{ bg: `${accentColor}10` }} fontFamily="var(--font-body)" transition="all 0.3s">{l.label}</Button>
                        ))}
                      </HStack>
                    )}
                  </Box>
                </MotionBox>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
