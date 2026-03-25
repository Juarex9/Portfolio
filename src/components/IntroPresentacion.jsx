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
  const { accentColor, bgColor } = useAccentColors();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const mutedText = "gray.500";

  const images = [
    { src: "/alerta-chat.png", alt: "realtime-chat" },
    { src: "/main-chat.png", alt: "realtime-chat" },
    { src: "/ecommerce-home.png", alt: "home-ecommerce" },
    { src: "/ecommerce-producto.png", alt: "product-ecommerce" },
  ];

  const links = t("presentation.links", { returnObjects: true }) || [];

  return (
    <Box w="full" py={{ base: 16, md: 24 }} bg={bgColor}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, lg: 12 }} spacing={{ base: 10, lg: 12 }} alignItems="start">
          <MotionBox initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.6 }} viewport={{ once: true }} gridColumn={{ lg: "span 7" }}>
            <HStack spacing={4} mb={6}>
              <Box w="48px" h="48px" borderRadius="xl" overflow="hidden">
                <Image src="/yo-circular.png" alt="profile" w="full" h="full" objectFit="cover" loading="lazy" />
              </Box>
              <Box fontSize="sm" color={mutedText}>
                <Text fontWeight="700" fontFamily="var(--font-display)">Agustín Juárez</Text>
                <Text fontFamily="var(--font-body)" fontSize="xs">Argentina (UTC-3)</Text>
              </Box>
            </HStack>

            <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="800" fontFamily="var(--font-display)" letterSpacing="-0.02em" lineHeight="1.1" mb={6}>
              {t("presentation.intro_title")}
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color={mutedText} maxW="2xl" lineHeight="1.8" fontFamily="var(--font-body)">
              {t("presentation.intro_text")}
            </Text>

            <HStack spacing={3} flexWrap="wrap" mt={6}>
              {links.map((l) => (
                <Button key={l.label} as="a" target="_blank" rel="noopener noreferrer" textDecorationLine="none" href={l.href.startsWith("/") ? l.href : `/${l.href.replace("./", "")}`} isExternal size="lg" h={12} px={6} leftIcon={<DownloadIcon />} variant="solid" bg={accentColor} color="white" fontWeight="600" fontFamily="var(--font-body)" borderRadius="full" _hover={{ opacity: 0.9 }} transition="all 0.3s">
                  {l.label}
                </Button>
              ))}
            </HStack>
          </MotionBox>

          <MotionBox initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }} viewport={{ once: true }} gridColumn={{ lg: "span 5" }}>
            <Text fontSize="xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase" color={accentColor} mb={4} fontFamily="var(--font-body)">
              {t("presentation.intro_focus")}
            </Text>
            <VStack spacing={4} align="stretch" fontSize="sm" color={mutedText}>
              {[1, 2, 3].map((i) => (
                <HStack key={i} align="flex-start" spacing={3}>
                  <Box mt="2px" w="8px" h="8px" borderRadius="full" bg={accentColor} flexShrink={0} />
                  <Text lineHeight="1.7" fontFamily="var(--font-body)">{t(`presentation.intro_b${i}`)}</Text>
                </HStack>
              ))}
            </VStack>
          </MotionBox>
        </SimpleGrid>

        <Box mt={{ base: 12, md: 16 }}>
          <HStack spacing={5} overflowX="auto" pb={4} sx={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
            {images.map((img, idx) => (
              <Box key={idx} flex="0 0 auto" w={{ base: "280px", md: "360px" }} h={{ base: "180px", md: "220px" }} borderRadius="xl" overflow="hidden">
                <Image src={img.src} alt={img.alt} w="full" h="full" objectFit="cover" loading="lazy" />
              </Box>
            ))}
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}
