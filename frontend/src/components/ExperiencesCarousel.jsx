import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useAccentColors } from "../hooks/useAccentColors";

function ExperienceCard({ title, subtitle, date, description, imageSrc, buttonText }) {
  const cardBg = useColorModeValue("gray.900", "gray.900");
  const textColor = useColorModeValue("white", "white");
  const subtitleColor = useColorModeValue("gray.300", "gray.300");
  const borderColor = useColorModeValue("gray.700", "gray.600");

  return (
    <Box
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="2xl"
      overflow="hidden"
      minW={{ base: "100%", md: "380px" }}
      maxW="400px"
      transition="all 0.3s ease"
      _hover={{
        borderColor: "orange.400",
        boxShadow: "0 0 20px rgba(251, 146, 60, 0.2)",
      }}
      display="flex"
      flexDirection="column"
      h="full"
    >
      {/* Imagen */}
      <Box h="220px" overflow="hidden" position="relative">
        <Image
          src={imageSrc}
          alt={title}
          w="100%"
          h="100%"
          objectFit="cover"
          transition="transform 0.3s ease"
          _groupHover={{ transform: "scale(1.05)" }}
        />
      </Box>

      {/* Contenido */}
      <VStack align="start" spacing={3} p={6} flex="1" justify="space-between">
        <VStack align="start" spacing={1} w="full">
          <Heading
            as="h3"
            fontSize="xl"
            fontWeight="bold"
            color={textColor}
            noOfLines={2}
          >
            {title}
          </Heading>

          <Text fontSize="sm" fontStyle="italic" color="orange.400">
            {subtitle}
          </Text>

          <Text fontSize="xs" color={subtitleColor}>
            {date}
          </Text>

          <Text
            fontSize="sm"
            color={subtitleColor}
            lineHeight="1.6"
            mt={2}
            noOfLines={3}
          >
            {description}
          </Text>
        </VStack>

        {/* Botón */}
        <Button
          size="sm"
          variant="outline"
          borderColor="orange.400"
          color="white"
          _hover={{
            bg: "orange.400",
            color: "gray.900",
          }}
          w="full"
          mt={4}
        >
          {buttonText}
        </Button>
      </VStack>
    </Box>
  );
}

export default function ExperiencesCarousel() {
  const { accentColor } = useAccentColors();
  const bgColor = useColorModeValue("gray.50", "gray.900");

  const experiences = [
    {
      title: "Mención de honor a nivel nacional",
      subtitle: "Reconocimiento",
      date: "Diciembre 2018",
      description:
        "Proyecto IDENTIPS - IDENTIDAD DIGITAL en la Feria Nacional de Innovación Educativa EET Nº 3117 Maestro Daniel Oscar Reyes.",
      imageSrc:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      buttonText: "Ver más",
    },
    {
      title: "Olimpiadas de Programación Nacional - INET 2018",
      subtitle: "Reconocimiento",
      date: "10 de noviembre de 2018",
      description:
        "En conjunto con 3 alumnos desarrollamos un sistema de feed-lót con Arduino para monitoreo de alimentación animal.",
      imageSrc:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      buttonText: "Ver video",
    },
    {
      title: "Blockchain Salta",
      subtitle: "Speaker",
      date: "19 de Septiembre de 2025",
      description:
        "Seguridad en Blockchain: Protegiendo tus wallets y tu identidad digital. Facundo Padilla y z1ro de @SaltaDev.",
      imageSrc:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      buttonText: "Ver más",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
  };

  const visibleCards = () => {
    const cardsPerView = 3;
    const items = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % experiences.length;
      items.push(experiences[index]);
    }
    return items;
  };

  return (
    <Container maxW="100%" py={16} px={{ base: 4, md: 8 }} bg={bgColor}>
      <VStack align="start" spacing={8}>
        <Heading as="h2" size="xl" color={accentColor}>
          Experiencias
        </Heading>

        {/* Carousel Container */}
        <Box w="full" position="relative">
          {/* Cards Grid */}
          <HStack
            spacing={6}
            overflowX={{ base: "auto", md: "visible" }}
            overflowY="hidden"
            pb={4}
            css={{
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#fb923c",
                borderRadius: "3px",
              },
            }}
            display={{ base: "flex", md: "grid" }}
            gridTemplateColumns={{ md: "repeat(3, 1fr)" }}
            w="full"
          >
            {visibleCards().map((exp, idx) => (
              <ExperienceCard key={idx} {...exp} />
            ))}
          </HStack>

          {/* Navigation Buttons - Solo visible en desktop */}
          <HStack
            position="absolute"
            right={0}
            bottom="-16"
            spacing={2}
            display={{ base: "none", md: "flex" }}
          >
            <Button
              leftIcon={<ChevronLeftIcon />}
              variant="ghost"
              color={accentColor}
              _hover={{ bg: "transparent", opacity: 0.7 }}
              onClick={handlePrev}
            >
              Anterior
            </Button>
            <Button
              rightIcon={<ChevronRightIcon />}
              variant="ghost"
              color={accentColor}
              _hover={{ bg: "transparent", opacity: 0.7 }}
              onClick={handleNext}
            >
              Siguiente
            </Button>
          </HStack>

          {/* Dots Indicator */}
          <HStack justify="center" spacing={2} mt={8} display={{ base: "flex" }}>
            {experiences.map((_, idx) => (
              <Box
                key={idx}
                w="2"
                h="2"
                borderRadius="full"
                bg={
                  idx >= currentIndex && idx < currentIndex + 3
                    ? "orange.400"
                    : "gray.600"
                }
                cursor="pointer"
                onClick={() => setCurrentIndex(idx)}
                transition="all 0.2s ease"
              />
            ))}
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
}
