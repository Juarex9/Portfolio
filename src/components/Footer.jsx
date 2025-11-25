// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Container,
  Stack,
  HStack,
  VStack,
  Text,
  Link,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsGithub, BsLinkedin, BsEnvelope } from "react-icons/bs";
import { useAccentColors } from "../hooks/useAccentColors";

export default function Footer() {
  const { cardBg, accentColor, textColor } = useAccentColors();

  const muted = useColorModeValue("gray.600", "gray.400");
  const linkHover = useColorModeValue("gray.900", "whiteAlpha.900");
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const shadow = useColorModeValue(
    "0 -4px 18px rgba(15,23,42,0.08)",
    "0 -8px 30px rgba(15,23,42,0.8)"
  );

  return (
    <Box
      as="footer"
      bg={cardBg}
      color={textColor}
      borderTop="1px solid"
      borderColor={borderColor}
      boxShadow={shadow}
      py={6}               // menos padding vertical
      mt={0}               // sin separación rara respecto a la sección anterior
    >
      <Container maxW="6xl">
        {/* Fila superior: nombre + redes */}
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          spacing={6}
        >
          <VStack align="flex-start" spacing={1}>
            <Text fontWeight="bold" fontSize="lg">
              Agustín{" "}
              <Box as="span" color={accentColor}>
                Juárez
              </Box>
            </Text>
            <Text fontSize="sm" color={muted}>
              Desarrollador Full-Stack · React · Node · Web3
            </Text>
          </VStack>

          <HStack spacing={4}>
            <IconButton
              as={Link}
              href="https://github.com/Juarex9"
              aria-label="GitHub"
              variant="ghost"
              size="lg"
              icon={<BsGithub />}
              isExternal
              borderRadius="full"
              _hover={{
                bg: accentColor,
                color: "white",
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s ease"
            />
            <IconButton
              as={Link}
              href="https://www.linkedin.com"
              aria-label="LinkedIn"
              variant="ghost"
              size="lg"
              icon={<BsLinkedin />}
              isExternal
              borderRadius="full"
              _hover={{
                bg: accentColor,
                color: "white",
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s ease"
            />
            <IconButton
              as={Link}
              href="mailto:agustinjuarez375@gmail.com"
              aria-label="Email"
              variant="ghost"
              size="lg"
              icon={<BsEnvelope />}
              borderRadius="full"
              _hover={{
                bg: accentColor,
                color: "white",
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s ease"
            />
          </HStack>
        </Stack>

        {/* Fila inferior: links + copyright */}
        <Stack
          mt={4}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          spacing={4}
        >
          <HStack spacing={6} flexWrap="wrap">
            {[
              { href: "/proyectos", label: "Proyectos" },
              { href: "/educacion", label: "Educación" },
              { href: "/sobremi", label: "Sobre mí" },
              { href: "/contacto", label: "Contacto" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                position="relative"
                fontSize="sm"
                color={muted}
                _hover={{ color: linkHover, textDecoration: "none" }}
                _after={{
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -2,
                  width: "100%",
                  height: "2px",
                  borderRadius: "full",
                  bg: accentColor,
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.2s ease-out",
                }}
                sx={{
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                {item.label}
              </Link>
            ))}
          </HStack>

          <Text fontSize="xs" color={muted}>
            © {new Date().getFullYear()} Agustín Juárez 
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
