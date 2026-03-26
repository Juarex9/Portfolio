import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Button,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { DownloadIcon } from "@chakra-ui/icons";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

export default function IntroPresentation() {
  const { accentColor, contentBgColor } = useAccentColors();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const mutedText = "gray.500";

  const images = [
    { src: "/price-scraper-full.png", alt: "price-scraper" },
    { src: "/ink-risk.png", alt: "ink-ai-risk-detector" },
    { src: "/ink-full.png", alt: "ink" },
    { src: "/fintrack-full.png", alt: "fintrack" },
  ];

  const links = t("presentation.links", { returnObjects: true }) || [];

  return (
    <Box w="full" py={{ base: 12, md: 24 }} bg={contentBgColor}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, lg: 12 }} spacing={{ base: 8, lg: 12 }} alignItems="start">
          <MotionBox 
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }} 
            viewport={{ once: true }} 
            gridColumn={{ lg: "span 7" }}
          >
            <HStack spacing={3} mb={4}>
              <Box w="40px" h="40px" borderRadius="lg" overflow="hidden" flexShrink={0}>
                <Image src="/yo-circular.png" alt="profile" w="full" h="full" objectFit="cover" loading="lazy" />
              </Box>
              <Box fontSize="xs" color={mutedText}>
                <Text fontWeight="700" fontFamily="var(--font-display)" fontSize="sm">Agustín Juárez</Text>
                <Text fontFamily="var(--font-body)">Argentina (UTC-3)</Text>
              </Box>
            </HStack>

            <Heading 
              as="h2" 
              fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }} 
              fontWeight="800" 
              fontFamily="var(--font-display)" 
              letterSpacing="-0.02em" 
              lineHeight="1.2" 
              mb={4}
            >
              {t("presentation.intro_title")}
            </Heading>

            <Text 
              fontSize={{ base: "sm", md: "md" }} 
              color={mutedText} 
              maxW="2xl" 
              lineHeight="1.7" 
              fontFamily="var(--font-body)"
              mb={5}
            >
              {t("presentation.intro_text")}
            </Text>

            <HStack spacing={2} flexWrap="wrap">
              {links.map((l) => (
                <Button 
                  key={l.label} 
                  as="a" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  textDecorationLine="none" 
                  href={l.href.startsWith("/") ? l.href : `/${l.href.replace("./", "")}`} 
                  isExternal 
                  size="sm"
                  h={10}
                  px={4}
                  leftIcon={<DownloadIcon />} 
                  variant="solid" 
                  bg={accentColor} 
                  color="white" 
                  fontWeight="600" 
                  fontFamily="var(--font-body)" 
                  borderRadius="full" 
                  _hover={{ opacity: 0.9 }} 
                  transition="all 0.3s"
                >
                  {l.label}
                </Button>
              ))}
            </HStack>
          </MotionBox>

          <MotionBox 
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }} 
            viewport={{ once: true }} 
            gridColumn={{ lg: "span 5" }}
            mt={{ base: 6, lg: 0 }}
          >
            <Text 
              fontSize="xs" 
              fontWeight="700" 
              letterSpacing="wider" 
              textTransform="uppercase" 
              color={accentColor} 
              mb={3} 
              fontFamily="var(--font-body)"
            >
              {t("presentation.intro_focus")}
            </Text>
            <VStack spacing={3} align="stretch" fontSize="sm" color={mutedText}>
              {[1, 2, 3].map((i) => (
                <HStack key={i} align="flex-start" spacing={2}>
                  <Box mt="2px" w="6px" h="6px" borderRadius="full" bg={accentColor} flexShrink={0} />
                  <Text lineHeight="1.6" fontFamily="var(--font-body)" fontSize="xs">{t(`presentation.intro_b${i}`)}</Text>
                </HStack>
              ))}
            </VStack>
          </MotionBox>
        </SimpleGrid>

        <Box mt={{ base: 8, md: 12 }}>
          <HStack 
            spacing={4} 
            overflowX="auto" 
            pb={3} 
            mx={{ base: -4, md: 0 }}
            px={{ base: 4, md: 0 }}
            sx={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
          >
            {images.map((img, idx) => (
              <Box 
                key={idx} 
                flex="0 0 auto" 
                w={{ base: "200px", sm: "240px", md: "320px" }} 
                h={{ base: "130px", sm: "160px", md: "200px" }} 
                borderRadius="lg" 
                overflow="hidden"
              >
                <Image src={img.src} alt={img.alt} w="full" h="full" objectFit="cover" loading="lazy" />
              </Box>
            ))}
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}
