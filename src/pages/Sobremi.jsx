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
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { useAccentColors } from "../hooks/useAccentColors";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);

const AboutMe = () => {
  const { bgColor, accentColor, cardBg, textColor } = useAccentColors();

  const sectionBg = useColorModeValue(
    `linear-gradient(135deg, ${bgColor} 55%, rgba(105,197,139,0.25) 100%)`,
    `linear-gradient(135deg, ${bgColor} 70%, rgba(56,161,105,0.45) 100%)`
  );

  const secondaryText = useColorModeValue("gray.600", "gray.300");
  const { t } = useTranslation();

  return (
    <>
      <Seo
        titleKey="seo.about.title"
        descriptionKey="seo.about.description"
        canonicalPath="/sobremi"
      />
      <Box w="100%" bg={sectionBg} py={{ base: 12, md: 20 }}>
        <Container maxW="6xl" px={{ base: 4, md: 8 }}>
          {/* Header de sección */}
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            mb={12}
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
                {t("about.badge")}
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
                {t("about.heading")}
              </MotionHeading>

              <Text fontSize="sm" color={secondaryText} maxW="lg">
                {t("about.context")}
              </Text>
            </Box>
          </Stack>

          {/* Bloque principal: imagen + texto */}
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            gap={10}
            alignItems="center"
            mb={14}
          >
            {/* Mockup grande */}
            <MotionBox
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box
                bg={cardBg}
                borderRadius="2xl"
                p={3}
                boxShadow="2xl"
                overflow="hidden"
              >
                <Image
                  src="/aboutme.png"
                  alt="Workspace-mockup"
                  borderRadius="xl"
                  objectFit="cover"
                  h={{ base: "260px", md: "340px" }}
                  w="100%"
                />
              </Box>
            </MotionBox>

            {/* Texto */}
            <MotionVStack
              align="start"
              spacing={4}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              color={textColor}
            >
              <Text>
                {t("about.p1")}
              </Text>
              <Text>
                {t("about.p2")}
              </Text>
              <Text>
                {t("about.p3")}
              </Text>
            </MotionVStack>
          </SimpleGrid>

          {/* Segunda sección: 3 cards resumidas */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            <Box
              bg={cardBg}
              borderRadius="2xl"
              p={6}
              boxShadow="xl"
              transition="all 0.25s ease"
              _hover={{ transform: "translateY(-4px)", boxShadow: "2xl" }}
            >
              <Heading size="md" mb={3} color={accentColor}>
                {t("about.card1.title")}
              </Heading>
              <Text color={secondaryText} fontSize="sm">
                {t("about.card1.text")}
              </Text>
            </Box>

            <Box
              bg={cardBg}
              borderRadius="2xl"
              p={6}
              boxShadow="xl"
              transition="all 0.25s ease"
              _hover={{ transform: "translateY(-4px)", boxShadow: "2xl" }}
            >
              <Heading size="md" mb={3} color={accentColor}>
                {t("about.card2.title")}
              </Heading>
              <Text color={secondaryText} fontSize="sm">
                {t("about.card2.text")}
              </Text>
            </Box>

            <Box
              bg={cardBg}
              borderRadius="2xl"
              p={6}
              boxShadow="xl"
              transition="all 0.25s ease"
              _hover={{ transform: "translateY(-4px)", boxShadow: "2xl" }}
            >
              <Heading size="md" mb={3} color={accentColor}>
                {t("about.card3.title")}
              </Heading>
              <Text color={secondaryText} fontSize="sm">
                {t("about.card3.text")}
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default AboutMe;
