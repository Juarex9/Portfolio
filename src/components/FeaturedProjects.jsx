import {
  Box,
  Container,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  Button,
  HStack,
  Tag,
  Badge,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

const featuredProjects = [
  { key: "gestion-turnos", category: "Freelance", href: "/freelance" },
  { key: "scraper-precios", category: "Personal", href: "/personal" },
  { key: "e-commerce", category: "Personal", href: "/personal" },
];

export default function FeaturedProjects() {
  const { accentColor, bgColor } = useAccentColors();
  const { t } = useTranslation();
  const textColor = "gray.500";
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <Box w="full" py={{ base: 16, md: 24 }} bg={bgColor}>
      <Container maxW="6xl">
        <MotionBox
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          viewport={{ once: true }}
          mb={{ base: 10, md: 16 }}
        >
          <HStack mb={4} gap={3}>
            <Box w="40px" h="2px" bg={accentColor} borderRadius="full" />
            <Badge px={4} py={1.5} borderRadius="full" fontSize="xs" fontWeight="600" textTransform="uppercase" letterSpacing="wider" bg={`${accentColor}15`} color={accentColor}>
              {t("featured.badge")}
            </Badge>
          </HStack>

          <Box display="flex" justifyContent="space-between" alignItems={{ base: "flex-start", md: "flex-end" }} flexDirection={{ base: "column", md: "row" }} gap={4}>
            <Box>
              <Heading as="h2" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} fontWeight="800" fontFamily="var(--font-display)" mb={3}>{t("featured.title")}</Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color={textColor} maxW="2xl" fontFamily="var(--font-body)">{t("featured.subtitle")}</Text>
            </Box>
            <Button as={Link} href="/proyectos" variant="ghost" size="lg" fontWeight="600" fontFamily="var(--font-body)" color={accentColor} _hover={{ opacity: 0.8 }} transition="all 0.3s">
              {t("featured.view_all")}
            </Button>
          </Box>
        </MotionBox>

        <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={{ base: 6, md: 8 }}>
          {featuredProjects.map((project, index) => {
            const baseKey = `projects.personal.items.${project.key}`;
            const altBaseKey = `projects.freelance.items.${project.key}`;
            
            let title = "", description = "", tech = [];
            const tryLoad = (key) => { const r = t(`${key}.tech`, { returnObjects: true }); return Array.isArray(r) ? r : null; };
            if (Array.isArray(tryLoad(baseKey))) { title = t(`${baseKey}.title`); description = t(`${baseKey}.description`); tech = tryLoad(baseKey); }
            else if (Array.isArray(tryLoad(altBaseKey))) { title = t(`${altBaseKey}.title`); description = t(`${altBaseKey}.description`); tech = tryLoad(altBaseKey); }

            return (
              <MotionBox key={project.key} initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }} viewport={{ once: true }}>
                <LinkBox as="article" role="group">
                  <Box borderRadius="xl" overflow="hidden">
                    <Box h="140px" bgGradient={`linear(135deg, ${accentColor}, ${accentColor}cc)`} display="flex" alignItems="center" justifyContent="center">
                      <Text fontSize="5xl" fontWeight="900" fontFamily="var(--font-display)" color="white" opacity={0.3}>{title.charAt(0)}</Text>
                    </Box>
                    <Box py={4}>
                      <HStack mb={2}><Badge borderRadius="full" px={2} py={0.5} bg={`${accentColor}15`} color={accentColor} fontSize="xs">{project.category}</Badge></HStack>
                      <Heading as="h3" size="md" fontWeight="700" fontFamily="var(--font-display)" mb={2}>
                        <LinkOverlay href={project.href} _hover={{ color: accentColor }} transition="color 0.3s">{title}</LinkOverlay>
                      </Heading>
                      <Text fontSize="sm" color={textColor} noOfLines={2} mb={3} lineHeight="1.6" fontFamily="var(--font-body)">{description}</Text>
                      <HStack spacing={2} wrap="wrap">
                        {tech.slice(0, 3).map((techItem, i) => (
                          <Tag key={i} size="sm" borderRadius="full" bg={`${accentColor}15`} color={accentColor} fontFamily="var(--font-body)" fontSize="xs">{techItem}</Tag>
                        ))}
                      </HStack>
                    </Box>
                  </Box>
                </LinkBox>
              </MotionBox>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
