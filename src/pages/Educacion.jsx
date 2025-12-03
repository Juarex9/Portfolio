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
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CheckCircle, ExternalLink } from "lucide-react";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

export default function EducationTimeline() {
  const { cardBg, accentColor, bgColor, textColor } = useAccentColors();
  const { t } = useTranslation();

  const sectionBg = useColorModeValue(
    `linear-gradient(135deg, ${bgColor} 55%, rgba(105,197,139,0.15) 100%)`,
    `linear-gradient(135deg, ${bgColor} 70%, rgba(34,197,94,0.28) 100%)`
  );

  const timelineLineColor = useColorModeValue(
    "rgba(34,197,94,0.7)",
    "rgba(74,222,128,0.8)"
  );

  const locationColor = useColorModeValue("gray.500", "gray.400");

  // Igual que en Proyectos: solo keys, todo el contenido viene de i18n
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
    <Box w="full" bg={sectionBg} py={{ base: 12, md: 20 }}>
      <Container maxW="6xl">
        {/* Header de sección */}
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={10}
          spacing={4}
        >
          <Box>
            <Badge
              borderRadius="full"
              px={3}
              py={1}
              mb={2}
              bg={useColorModeValue("green.50", "green.900")}
              color={useColorModeValue("green.700", "green.200")}
              textTransform="uppercase"
              fontSize="xs"
              letterSpacing="wider"
            >
              {t("education.section.badge")}
            </Badge>

            <MotionHeading
              fontSize={{ base: "2xl", md: "3xl" }}
              color={useColorModeValue("gray.900", "white")}
              fontWeight="extrabold"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              mb={1}
            >
              {t("education.section.heading")}
            </MotionHeading>

            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.300")}
              maxW="lg"
            >
              {t("education.section.desc")}
            </Text>
          </Box>
        </Stack>

        <Grid templateColumns={{ base: "1fr", md: "260px 1fr" }} gap={10}>
          {/* Columna izquierda: timeline compacto */}
          <GridItem>
            <Box position="relative" pl={{ base: 0, md: 6 }}>
              {/* línea vertical */}
              <Box
                position="absolute"
                left={{ base: "6px", md: "22px" }}
                top="4px"
                bottom="4px"
                width="2px"
                bgGradient={`linear(to-b, ${timelineLineColor}, transparent)`}
                opacity={0.8}
              />

              <VStack align="stretch" spacing={6}>
                {items.map((it, idx) => (
                  <HStack key={it.key} spacing={3} align="flex-start">
                    <Box pt="2px">
                      <Box
                        w="14px"
                        h="14px"
                        borderRadius="full"
                        bg={accentColor}
                        boxShadow="0 0 0 4px rgba(34,197,94,0.25)"
                      />
                    </Box>
                    <VStack spacing={0} align="flex-start">
                      <Text fontSize="sm" color={locationColor}>
                        {it.start} – {it.end}
                      </Text>
                      <Text fontWeight="semibold" color={textColor}>
                        {it.title}
                      </Text>
                      <Text fontSize="sm" color={locationColor}>
                        {it.institution}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </GridItem>

          {/* Columna derecha: cards detalladas */}
          <GridItem>
            <VStack align="stretch" spacing={6}>
              {items.map((it, idx) => (
                <MotionBox
                  key={it.key}
                  bg={cardBg}
                  borderRadius="2xl"
                  boxShadow="xl"
                  p={{ base: 5, md: 6 }}
                  borderWidth={useColorModeValue("1px", "0px")}
                  borderColor={useColorModeValue("gray.100", "transparent")}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {/* cabecera */}
                  <HStack justify="space-between" align="flex-start" mb={3}>
                    <VStack align="flex-start" spacing={1}>
                      <Text fontSize="lg" fontWeight="bold" color={textColor}>
                        {it.institution}
                      </Text>
                      <Text fontSize="sm" color={locationColor}>
                        {it.location}
                      </Text>
                    </VStack>
                    <Tag
                      colorScheme="green"
                      variant="subtle"
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      {it.start} – {it.end}
                    </Tag>
                  </HStack>

                  <Heading as="h3" size="md" color={accentColor} mb={3}>
                    {it.title}
                  </Heading>

                  {/* bullets */}
                  <Stack spacing={2} mb={4}>
                    {it.highlights.map((h, i) => (
                      <HStack key={i} align="flex-start">
                        <Icon
                          as={CheckCircle}
                          boxSize={4}
                          mt={1}
                          color={accentColor}
                        />
                        <Text color={textColor}>{h}</Text>
                      </HStack>
                    ))}
                  </Stack>

                  {/* tags */}
                  {it.tags.length ? (
                    <Wrap mb={4}>
                      {it.tags.map((tTag) => (
                        <WrapItem key={tTag}>
                          <Tag
                            size="sm"
                            borderRadius="full"
                            variant="subtle"
                            bg={useColorModeValue("green.50", "green.900")}
                            color={useColorModeValue("green.700", "green.200")}
                          >
                            {tTag}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  ) : null}

                  {/* links */}
                  <HStack spacing={3} flexWrap="wrap">
                    {it.links.map((l) => (
                      <Button
                        key={l.label}
                        as={Link}
                        href={l.href}
                        target="_blank"
                        size="sm"
                        rightIcon={<Icon as={ExternalLink} />}
                        variant="outline"
                        borderRadius="full"
                      >
                        {l.label}
                      </Button>
                    ))}
                  </HStack>
                </MotionBox>
              ))}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
