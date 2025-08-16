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
  SimpleGrid,
  Divider,
  Tag,
  Wrap,
  WrapItem,
  Link,
  Button,
  Icon,
  useColorModeValue,
  chakra,
} from "@chakra-ui/react";
import { CheckCircle, ExternalLink } from "lucide-react";
import { useAccentColors } from "../hooks/useAccentColors";

// ---------- Datos ----------
export const educationItems = [
  {
    title: "Ingeniería Informática",
    institution: "Universidad Católica de Salta",
    location: "Salta, Argentina",
    start: "2023",
    end: "Actualidad",
    highlights: [
      "Estructuras de datos y bases de datos",
      "Programación orientada a objetos",
      "Trabajo en equipo con Git y metodologías ágiles",
    ],
    tags: ["Algoritmos", "DB SQL", "React", "Node"],
    links: [{ label: "Plan de estudios", href: "#" }],
  },
  {
    title: "Diagnostico y Reparación de Equipos de Cómputo",
    institution: "Reparando",
    location: "Online",
    start: "2019",
    end: "2020",
    highlights: [
      "Mantenimiento preventivo y correctivo de hardware",
      "Instalación de sistemas operativos", "Limpieza y optimización de equipos",
    ],
    tags: ["Hardware", "Equipos de PC", "Sistemas Operativos"],
    links: [{ label: "Certificado", href: "#" }],
  },
  {
    title: "Carrera de Desarrollador Full Stack",
    institution: "Plataforma Coderhouse",
    location: "Online",
    start: "2024",
    end: "2025",
    highlights: [
      "Accesibilidad web y performance",
      "Diseño de sistemas de UI con Chakra",
      "Proyecto final: web de e-commerce",
      "Bases de datos con MongoDB",
    ],
    tags: ["React", "Performance", "Chakra UI", "Desarrollo Web", "MongoDB"],
    links: [
      { label: "Certificado", href: "#" },
      { label: "Proyecto final", href: "#" },
    ],
  },
];

const brand = (shade) =>
  `var(--chakra-colors-brand-${shade}, var(--chakra-colors-teal-${shade}))`;

export default function EducationTimeline({ items = educationItems }) {
  const { cardBg, accentColor, bgColor, textColor } = useAccentColors();

  return (
    <Container maxW="100%" py={{ base: 10, md: 16 }} bg={`linear-gradient(135deg, ${bgColor} 70%, #69c58b 100%)`} p={"120px"}>
      <Heading mb={8}>Educación</Heading>

      <Grid templateColumns={{ base: "1fr", md: "240px 1fr" }} gap={8}>
        <GridItem>
          <VStack align="stretch" position="relative">
            <Box
              position="absolute"
              left={{ base: 0, md: "20px" }}
              top={0}
              bottom={0}
              width="2px"
              bgGradient={`linear(to-b, ${brand(600)}, ${brand(300)})`}
              opacity={0.6}
            />

            {items.map((it, idx) => (
              <HStack key={idx} spacing={4} align="flex-start">
                <Box
                  mt={2}
                  minW="40px"
                  display={{ base: "none", md: "block" }}
                >
                  <Box
                    w="14px"
                    h="14px"
                    borderRadius="full"
                    bg={cardBg}
                    boxShadow="0 0 0 4px rgba(64,196,129,0.25)"
                  />
                </Box>
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="sm" color="gray.500">
                    {it.start} – {it.end}
                  </Text>
                  <Text fontWeight="semibold">{it.title}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </GridItem>

        <GridItem>
          <VStack align="stretch" spacing={6}>
            {items.map((it, idx) => (
              <Box
                key={idx}
                bg={cardBg}
                borderRadius="xl"
                boxShadow={{ base: "md", md: "lg" }}
                p={{ base: 4, md: 6 }}
                borderWidth={useColorModeValue("1px", "0px")}
                borderColor={useColorModeValue("gray.100", "transparent")}
              >
                <HStack justify="space-between" align="start" mb={2}>
                  <VStack align="flex-start" spacing={1}>
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {it.institution}
                    </Text>
                    <Text color="accentColor">{it.location}</Text>
                  </VStack>
                  <Tag colorScheme="green" variant="subtle">
                    {it.start} – {it.end}
                  </Tag>
                </HStack>

                <Heading as="h3" size="md" color={accentColor} mb={3}>
                  {it.title}
                </Heading>

                <Stack spacing={2} mb={4}>
                  {it.highlights?.map((h, i) => (
                    <HStack key={i} align="start">
                      <Icon as={CheckCircle} boxSize={4} mt={1} color={brand(400)} />
                      <Text color={textColor}>{h}</Text>
                    </HStack>
                  ))}
                </Stack>

                {it.tags?.length ? (
                  <Wrap mb={4}>
                    {it.tags.map((t) => (
                      <WrapItem key={t}>
                        <Tag variant="subtle" color={accentColor}>
                          {t}
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                ) : null}

                <HStack spacing={3}>
                  {it.links?.map((l) => (
                    <Button
                      key={l.label}
                      as={Link}
                      href={l.href}
                      target="_blank"
                      size="sm"
                      rightIcon={<Icon as={ExternalLink} />}
                      variant="outline"
                    >
                      {l.label}
                    </Button>
                  ))}
                </HStack>
              </Box>
            ))}
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
