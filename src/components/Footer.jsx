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
} from "@chakra-ui/react";
import { BsGithub, BsLinkedin, BsEnvelope } from "react-icons/bs";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

const socialLinks = [
  { Icon: BsGithub, href: "https://github.com/Juarex9", label: "GitHub" },
  { Icon: BsLinkedin, href: "https://www.linkedin.com/in/agustin-juarez0907/", label: "LinkedIn" },
  { Icon: BsEnvelope, href: "mailto:agustinjuarez375@gmail.com", label: "Email" },
];

export default function Footer() {
  const { accentColor, bgColor } = useAccentColors();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const links = [
    { href: "/proyectos", key: "projects" },
    { href: "/educacion", key: "education" },
    { href: "/sobremi", key: "about" },
    { href: "/contacto", key: "contact" },
  ];

  const muted = "gray.500";

  return (
    <Box
      as="footer"
      bg={bgColor}
      py={{ base: 8, md: 10 }}
    >
      <Container maxW="6xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          spacing={{ base: 6, md: 8 }}
        >
          <VStack align={{ base: "flex-start", md: "flex-start" }} spacing={1}>
            <HStack spacing={2}>
              <Text
                fontWeight="800"
                fontSize="xl"
                fontFamily="var(--font-display)"
                letterSpacing="-0.02em"
              >
                <Text as="span" color={accentColor}>A</Text>
                <Text as="span">JZ</Text>
              </Text>
            </HStack>
            <Text fontSize="sm" color={muted} fontFamily="var(--font-body)">
              {t("footer.title")}
            </Text>
          </VStack>

          <HStack spacing={3}>
            {socialLinks.map((social) => (
              <MotionBox
                key={social.label}
                whileHover={{ y: -2 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              >
                <IconButton
                  as={Link}
                  href={social.href}
                  aria-label={social.label}
                  variant="ghost"
                  size="lg"
                  icon={<social.Icon size={20} />}
                  isExternal={social.label !== "Email"}
                  borderRadius="full"
                  color={muted}
                  _hover={{
                    color: accentColor,
                  }}
                  transition="all 0.3s"
                />
              </MotionBox>
            ))}
          </HStack>
        </Stack>

        <Stack
          mt={6}
          pt={6}
          direction={{ base: "column-reverse", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          spacing={4}
        >
          <Text fontSize="xs" color={muted} fontFamily="var(--font-body)">
            © {new Date().getFullYear()} Agustín Juárez
          </Text>

          <HStack spacing={6} flexWrap="wrap">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                fontSize="sm"
                fontFamily="var(--font-body)"
                fontWeight="500"
                color={muted}
                _hover={{
                  color: accentColor,
                  textDecoration: "none",
                }}
                transition="color 0.3s"
              >
                {t(`footer.links.${item.key}`)}
              </Link>
            ))}
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
}
