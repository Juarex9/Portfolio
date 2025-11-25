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
      "Instalación de sistemas operativos",
      "Limpieza y optimización de equipos",
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

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

export default function EducationTimeline({ items = educationItems }) {
  const { cardBg, accentColor, bgColor, textColor } = useAccentColors();

  const sectionBg = useColorModeValue(
    `linear-gradient(135deg, ${bgColor} 55%, rgba(105,197,139,0.15) 100%)`,
    `linear-gradient(135deg, ${bgColor} 70%, rgba(34,197,94,0.28) 100%)`
  );

  const timelineLineColor = useColorModeValue(
    "rgba(34,197,94,0.7)",
    "rgba(74,222,128,0.8)"
  );

  const locationColor = useColorModeValue("gray.500", "gray.400");

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
              Formación
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
              Educación & Certificaciones
            </MotionHeading>

            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.300")}
              maxW="lg"
            >
              Un recorrido por mi formación académica y cursos que reforzaron
              mi perfil como desarrollador full stack.
            </Text>
          </Box>

          {/* Si querés después podés cambiar este href por tu CV */}
          {/* <Button
            as={Link}
            href="#"
            variant="outline"
            borderRadius="full"
            px={6}
            fontSize="sm"
          >
            Ver CV
          </Button> */}
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
                  <HStack key={idx} spacing={3} align="flex-start">
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
                  key={idx}
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
                    {it.highlights?.map((h, i) => (
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
                  {it.tags?.length ? (
                    <Wrap mb={4}>
                      {it.tags.map((t) => (
                        <WrapItem key={t}>
                          <Tag
                            size="sm"
                            borderRadius="full"
                            variant="subtle"
                            bg={useColorModeValue("green.50", "green.900")}
                            color={useColorModeValue("green.700", "green.200")}
                          >
                            {t}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  ) : null}

                  {/* links */}
                  <HStack spacing={3} flexWrap="wrap">
                    {it.links?.map((l) => (
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
