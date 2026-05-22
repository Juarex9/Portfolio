import { Box, Container, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAccentColors } from "../hooks/useAccentColors";
import { Seo } from "../components/Seo";

export default function NotFound() {
  const { accentColor } = useAccentColors();
  const { t } = useTranslation();

  return (
    <>
      <Seo
        titleKey="seo.notFound.title"
        descriptionKey="seo.notFound.description"
        canonicalPath="/404"
      />
      <Box w="full" minH="60vh" display="flex" alignItems="center">
        <Container maxW="6xl" py={{ base: 16, md: 24 }}>
          <VStack spacing={6} align="flex-start" maxW="lg">
            <Text
              fontSize="6xl"
              fontWeight="800"
              fontFamily="var(--font-display)"
              color={accentColor}
              lineHeight="1"
            >
              404
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="800"
              fontFamily="var(--font-display)"
              letterSpacing="-0.02em"
            >
              {t("notFound.title")}
            </Heading>
            <Text color="gray.500" fontFamily="var(--font-body)" lineHeight="1.7">
              {t("notFound.description")}
            </Text>
            <Button
              as={RouterLink}
              to="/"
              size="md"
              bg={accentColor}
              color="white"
              borderRadius="full"
              fontWeight="600"
              fontFamily="var(--font-body)"
              _hover={{ opacity: 0.9 }}
            >
              {t("notFound.backHome")}
            </Button>
          </VStack>
        </Container>
      </Box>
    </>
  );
}
