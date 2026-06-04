import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Badge,
  HStack,
  VStack,
  Button,
  Image,
  Stack,
  List,
  ListItem,
  ListIcon,
  Link,
  Icon,
} from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { getExperienceBySlug } from "../data/experiences.js";
import { getProjectBySlug, getProjectDetailPath } from "../data/projects.js";
import ExperienceGallery from "../components/ExperienceGallery";

const MotionBox = motion(Box);

function RoleSection({ baseKey, role, accentColor, borderColor, secondaryText, t }) {
  const title = t(`${baseKey}.${role}.title`, { defaultValue: "" });
  const bullets = t(`${baseKey}.${role}.bullets`, { returnObjects: true, defaultValue: [] });

  if (!title || !Array.isArray(bullets) || bullets.length === 0) {
    return null;
  }

  return (
    <Box border="1px solid" borderColor={borderColor} borderRadius="xl" p={{ base: 4, md: 5 }}>
      <Heading as="h2" size="sm" mb={2} fontFamily="var(--font-display)">
        {title}
      </Heading>
      <List spacing={2}>
        {bullets.map((item) => (
          <ListItem key={item} fontSize="sm" color={secondaryText} fontFamily="var(--font-body)" lineHeight="1.7">
            <ListIcon as={CheckCircleIcon} color={accentColor} />
            {item}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default function Experiencia() {
  const { slug } = useParams();
  const experience = getExperienceBySlug(slug);
  const { t } = useTranslation();
  const { accentColor, borderColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const secondaryText = "gray.500";

  if (!experience) {
    return <Navigate to="/sobremi" replace />;
  }

  const baseKey = `experiences.items.${experience.slug}`;
  const title = t(`${baseKey}.title`);
  const projectKey = experience.projectKey;
  const linkedProject = projectKey ? getProjectBySlug(projectKey) : null;
  const projectLink = linkedProject ? getProjectDetailPath(linkedProject) || "/proyectos" : "/proyectos";

  return (
    <>
      <Seo
        titleKey={`${baseKey}.seo.title`}
        descriptionKey={`${baseKey}.seo.description`}
        canonicalPath={`/experiencias/${experience.slug}`}
      />
      <Box w="full" minH="100vh" bg="transparent" overflowX="hidden">
        <Container maxW={experience.gallery ? "4xl" : "3xl"} py={{ base: 8, md: 16 }} px={{ base: 4, md: 6 }}>
          <Button
            as={RouterLink}
            to="/sobremi"
            variant="ghost"
            size="sm"
            leftIcon={<ArrowBackIcon />}
            mb={6}
            color={secondaryText}
            fontFamily="var(--font-body)"
            _hover={{ color: accentColor }}
          >
            {t("experiences.back")}
          </Button>

          <MotionBox
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            <HStack mb={3} gap={2} flexWrap="wrap">
              <Badge borderRadius="full" px={3} py={1} bg={`${accentColor}15`} color={accentColor} fontSize="xs" fontWeight="600">
                {t(`${baseKey}.subtitle`)}
              </Badge>
              <Text fontSize="xs" color={secondaryText} fontFamily="var(--font-body)">
                {t(`${baseKey}.date`)}
              </Text>
            </HStack>

            <Heading
              as="h1"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              fontWeight="800"
              fontFamily="var(--font-display)"
              letterSpacing="-0.02em"
              lineHeight="1.2"
              mb={4}
            >
              {title}
            </Heading>

            <HStack spacing={2} mb={6} flexWrap="wrap">
              {experience.roles.map((role) => (
                <Badge key={role} borderRadius="full" px={3} py={1} variant="outline" borderColor={accentColor} color={accentColor} fontSize="xs">
                  {t(`experiences.roles.${role}`)}
                </Badge>
              ))}
            </HStack>

            {experience.gallery ? (
              <ExperienceGallery
                images={experience.gallery}
                title={t("experiences.sections.gallery")}
                borderColor={borderColor}
                getAlt={(key) => t(`${baseKey}.gallery.alt.${key}`, { defaultValue: title })}
              />
            ) : (
              <Box borderRadius="xl" overflow="hidden" mb={8} border="1px solid" borderColor={borderColor}>
                <Image src={experience.image} alt={title} w="full" maxH={{ base: "220px", md: "320px" }} objectFit="cover" />
              </Box>
            )}

            <VStack align="stretch" spacing={8}>
              <Box>
                <Heading as="h2" size="sm" mb={3} fontFamily="var(--font-display)" color={accentColor}>
                  {t("experiences.sections.context")}
                </Heading>
                <Text color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)" fontSize={{ base: "sm", md: "md" }}>
                  {t(`${baseKey}.context`)}
                </Text>
              </Box>

              {experience.roles.map((role) => (
                <RoleSection
                  key={role}
                  baseKey={baseKey}
                  role={role}
                  accentColor={accentColor}
                  borderColor={borderColor}
                  secondaryText={secondaryText}
                  t={t}
                />
              ))}

              <Box>
                <Heading as="h2" size="sm" mb={3} fontFamily="var(--font-display)" color={accentColor}>
                  {t("experiences.sections.outcome")}
                </Heading>
                <Text color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)" fontSize={{ base: "sm", md: "md" }}>
                  {t(`${baseKey}.outcome`)}
                </Text>
              </Box>

              {(projectKey || experience.eventUrl) && (
                <Stack direction={{ base: "column", sm: "row" }} spacing={3} flexWrap="wrap">
                  {projectKey && (
                    <Button as={RouterLink} to={projectLink} variant="outline" borderRadius="full" borderColor={accentColor} color={accentColor} _hover={{ bg: `${accentColor}10` }}>
                      {t("experiences.view_project")}: {t(`projects.items.${projectKey}.title`)}
                    </Button>
                  )}
                  {experience.eventUrl && (
                    <Button
                      as={Link}
                      href={experience.eventUrl}
                      isExternal
                      variant="outline"
                      borderRadius="full"
                      borderColor={accentColor}
                      color={accentColor}
                      rightIcon={<Icon as={ExternalLink} boxSize={3.5} />}
                      _hover={{ bg: `${accentColor}10` }}
                    >
                      {t("experiences.view_event")}
                    </Button>
                  )}
                </Stack>
              )}
            </VStack>
          </MotionBox>
        </Container>
      </Box>
    </>
  );
}
