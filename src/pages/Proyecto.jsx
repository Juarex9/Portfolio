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
  Wrap,
  WrapItem,
  Tag,
} from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useAccentColors } from "../hooks/useAccentColors";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { getProjectBySlug } from "../data/projects.js";

const MotionBox = motion(Box);

export default function Proyecto() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const { t } = useTranslation();
  const { accentColor, borderColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const secondaryText = "gray.500";

  if (!project?.hasDetailPage) {
    return <Navigate to="/proyectos" replace />;
  }

  const baseKey = `projects.items.${project.key}`;
  const title = t(`${baseKey}.title`);
  const tech = t(`${baseKey}.tech`, { returnObjects: true });
  const highlights = t(`${baseKey}.highlights`, { returnObjects: true, defaultValue: [] });

  return (
    <>
      <Seo
        titleKey={`${baseKey}.seo.title`}
        descriptionKey={`${baseKey}.seo.description`}
        canonicalPath={`/proyectos/${project.key}`}
      />
      <Box w="full" minH="100vh" bg="transparent" overflowX="hidden">
        <Container maxW="3xl" py={{ base: 8, md: 16 }} px={{ base: 4, md: 6 }}>
          <Button
            as={RouterLink}
            to="/proyectos"
            variant="ghost"
            size="sm"
            leftIcon={<ArrowBackIcon />}
            mb={6}
            color={secondaryText}
            fontFamily="var(--font-body)"
            _hover={{ color: accentColor }}
          >
            {t("projects.back")}
          </Button>

          <MotionBox
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            <Badge borderRadius="full" px={3} py={1} bg={`${accentColor}15`} color={accentColor} fontSize="xs" fontWeight="600" mb={3}>
              {t(`projects.types.${project.type}`)}
            </Badge>

            <Heading
              as="h1"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              fontWeight="800"
              fontFamily="var(--font-display)"
              letterSpacing="-0.02em"
              lineHeight="1.2"
              mb={2}
            >
              {title}
            </Heading>

            <Text fontSize="md" color={accentColor} mb={6} fontWeight="500" fontFamily="var(--font-body)">
              {t(`${baseKey}.subtitle`)}
            </Text>

            {project.image && (
              <Box borderRadius="xl" overflow="hidden" mb={8} border="1px solid" borderColor={borderColor}>
                <Image src={project.image} alt={title} w="full" maxH={{ base: "280px", md: "400px" }} objectFit="contain" bg="blackAlpha.50" />
              </Box>
            )}

            <VStack align="stretch" spacing={8}>
              <Box>
                <Heading as="h2" size="sm" mb={3} fontFamily="var(--font-display)" color={accentColor}>
                  {t("projects.sections.problem")}
                </Heading>
                <Text color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)" fontSize={{ base: "sm", md: "md" }}>
                  {t(`${baseKey}.problem`)}
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="sm" mb={3} fontFamily="var(--font-display)" color={accentColor}>
                  {t("projects.sections.context")}
                </Heading>
                <Text color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)" fontSize={{ base: "sm", md: "md" }}>
                  {t(`${baseKey}.context`)}
                </Text>
              </Box>

              {Array.isArray(highlights) && highlights.length > 0 && (
                <Box border="1px solid" borderColor={borderColor} borderRadius="xl" p={{ base: 4, md: 5 }}>
                  <Heading as="h2" size="sm" mb={3} fontFamily="var(--font-display)">
                    {t("projects.sections.highlights")}
                  </Heading>
                  <List spacing={2}>
                    {highlights.map((item) => (
                      <ListItem key={item} fontSize="sm" color={secondaryText} fontFamily="var(--font-body)" lineHeight="1.7">
                        <ListIcon as={CheckCircleIcon} color={accentColor} />
                        {item}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              <Box>
                <Heading as="h2" size="sm" mb={3} fontFamily="var(--font-display)" color={accentColor}>
                  {t("projects.sections.role")}
                </Heading>
                <Text color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)" fontSize={{ base: "sm", md: "md" }}>
                  {t(`${baseKey}.role`)}
                </Text>
              </Box>

              <Box>
                <Heading as="h2" size="sm" mb={3} fontFamily="var(--font-display)" color={accentColor}>
                  {t("projects.sections.outcome")}
                </Heading>
                <Text color={secondaryText} lineHeight="1.8" fontFamily="var(--font-body)" fontSize={{ base: "sm", md: "md" }}>
                  {t(`${baseKey}.outcome`)}
                </Text>
              </Box>

              {Array.isArray(tech) && tech.length > 0 && (
                <Box>
                  <Heading as="h2" size="sm" mb={3} fontFamily="var(--font-display)" color={accentColor}>
                    {t("projects.sections.stack")}
                  </Heading>
                  <Wrap spacing={2}>
                    {tech.map((item) => (
                      <WrapItem key={item}>
                        <Tag borderRadius="full" bg={`${accentColor}15`} color={accentColor} fontSize="xs" fontWeight="500">
                          {item}
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              )}

              {(project.github || project.demo) && (
                <Stack direction={{ base: "column", sm: "row" }} spacing={3} flexWrap="wrap">
                  {project.github && (
                    <Button
                      as={Link}
                      href={project.github}
                      isExternal
                      variant="outline"
                      borderRadius="full"
                      borderColor={accentColor}
                      color={accentColor}
                      leftIcon={<FaGithub />}
                      _hover={{ bg: `${accentColor}10` }}
                    >
                      {t("projects.code_button")}
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      as={Link}
                      href={project.demo}
                      isExternal
                      borderRadius="full"
                      bg={accentColor}
                      color="white"
                      leftIcon={<FaExternalLinkAlt />}
                      _hover={{ opacity: 0.9 }}
                    >
                      {t("projects.demo_button")}
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
