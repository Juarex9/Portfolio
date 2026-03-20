import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
  Button,
  HStack,
  Tag,
  Badge,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

const featuredProjects = [
  {
    key: "gestion-turnos",
    category: "Freelance",
    href: "/freelance",
  },
  {
    key: "scraper-precios",
    category: "Personal",
    href: "/personal",
  },
  {
    key: "e-commerce",
    category: "Personal",
    href: "/personal",
  },
];

export default function FeaturedProjects() {
  const { cardBg, accentColor, bgColor } = useAccentColors();
  const { t } = useTranslation();
  const textColor = useColorModeValue("gray.600", "gray.300");
  const prefersReducedMotion = useReducedMotion();
  const sectionBg = useColorModeValue(
    `linear-gradient(135deg, ${bgColor} 55%, rgba(105,197,139,0.15) 100%)`,
    `linear-gradient(135deg, ${bgColor} 70%, rgba(34,197,94,0.28) 100%)`
  );
  const badgeBg = useColorModeValue("green.50", "green.900");
  const badgeColor = useColorModeValue("green.700", "green.200");
  const headingColor = useColorModeValue("gray.900", "white");
  const tagBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const tagColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box w="full" bg={sectionBg} py={{ base: 12, md: 16 }}>
      <Container maxW="6xl">
        <HStack justify="space-between" align="flex-start" mb={10} flexWrap="wrap" gap={4}>
          <Box>
            <Badge
              borderRadius="full"
              px={3}
              py={1}
              mb={2}
              bg={badgeBg}
              color={badgeColor}
              textTransform="uppercase"
              fontSize="xs"
              letterSpacing="wider"
            >
              {t("featured.badge")}
            </Badge>
            <Heading
              fontSize={{ base: "2xl", md: "3xl" }}
              color={headingColor}
              mb={1}
            >
              {t("featured.title")}
            </Heading>
            <Text fontSize="sm" color={textColor} maxW="lg">
              {t("featured.subtitle")}
            </Text>
          </Box>

          <Button
            as={Link}
            href="/proyectos"
            variant="outline"
            borderRadius="full"
            px={6}
            fontSize="sm"
            borderColor={accentColor}
            color={accentColor}
            _hover={{ bg: accentColor, color: "white" }}
          >
            {t("featured.view_all")}
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {featuredProjects.map((project, index) => {
            const baseKey = `projects.personal.items.${project.key}`;
            const altBaseKey = `projects.freelance.items.${project.key}`;
            const altWeb2Key = `projects.web2.items.${project.key}`;

            let title = "", description = "", tech = [];

            const tryLoad = (key) => {
              const result = t(`${key}.tech`, { returnObjects: true });
              return Array.isArray(result) ? result : null;
            };

            if (Array.isArray(tryLoad(baseKey))) {
              title = t(`${baseKey}.title`);
              description = t(`${baseKey}.description`);
              tech = tryLoad(baseKey);
            } else if (Array.isArray(tryLoad(altBaseKey))) {
              title = t(`${altBaseKey}.title`);
              description = t(`${altBaseKey}.description`);
              tech = tryLoad(altBaseKey);
            } else if (Array.isArray(tryLoad(altWeb2Key))) {
              title = t(`${altWeb2Key}.title`);
              description = t(`${altWeb2Key}.description`);
              tech = tryLoad(altWeb2Key);
            }

            return (
              <MotionBox
                key={project.key}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.15 }}
                viewport={{ once: true }}
              >
                <LinkBox
                  as="article"
                  bg={cardBg}
                  borderRadius="xl"
                  boxShadow="lg"
                  overflow="hidden"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-6px)",
                    boxShadow: "xl",
                  }}
                >
                  <Box
                    h="140px"
                    bgGradient={`linear(135deg, ${accentColor}20, ${accentColor}40)`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text
                      fontSize="6xl"
                      fontWeight="bold"
                      color={accentColor}
                      opacity={0.3}
                    >
                      {title.charAt(0)}
                    </Text>
                  </Box>

                  <Box p={5}>
                    <HStack mb={2}>
                      <Badge
                        size="sm"
                        borderRadius="full"
                        bg={accentColor}
                        color="white"
                        fontSize="xs"
                      >
                        {project.category}
                      </Badge>
                    </HStack>

                    <Heading size="md" mb={2}>
                      <LinkOverlay href={project.href}>
                        {title}
                      </LinkOverlay>
                    </Heading>

                    <Text fontSize="sm" color={textColor} noOfLines={2} mb={3}>
                      {description}
                    </Text>

                    <HStack spacing={2} wrap="wrap" mb={4}>
                      {tech.slice(0, 4).map((t, i) => (
                        <Tag
                          key={i}
                          size="sm"
                          borderRadius="full"
                          variant="subtle"
                          bg={tagBg}
                          color={tagColor}
                        >
                          {t}
                        </Tag>
                      ))}
                    </HStack>

                    <Button
                      as={Link}
                      href={project.href}
                      size="sm"
                      variant="ghost"
                      color={accentColor}
                      rightIcon={<Box as={FaExternalLinkAlt} fontSize="xs" />}
                      _hover={{ bg: `${accentColor}10` }}
                    >
                      {t("featured.view_details")}
                    </Button>
                  </Box>
                </LinkBox>
              </MotionBox>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
