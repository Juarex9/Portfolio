import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Button
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { DownloadIcon } from "@chakra-ui/icons";


const MotionBox = motion(Box);


export default function IntroPresentation() {
  const { accentColor, bgColor, cardBg } = useAccentColors();
  const { t } = useTranslation();
  const sectionBg = useColorModeValue(
    `linear-gradient(135deg, ${bgColor} 55%, rgba(105,197,139,0.15) 100%)`,
    `linear-gradient(135deg, ${bgColor} 70%, rgba(34,197,94,0.28) 100%)`
  );

  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const mutedText = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

  const images = [
    { src: "/alerta-chat.png", alt: "realtime-chat" },
    { src: "/main-chat.png", alt: "realtime-chat" },
    { src: "/ecommerce-home.png", alt: "home-ecommerce" },
    { src: "/ecommerce-producto.png", alt: "product-ecommerce" },
  ];

  const links = t("presentation.links", { returnObjects: true }) || [];


  return (
    <Box w="full" bg={sectionBg} py={{ base: 14, md: 20 }}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, lg: 12 }} spacing={{ base: 10, lg: 12 }}>
          <Box gridColumn={{ lg: "span 7" }}>
            <HStack spacing={4}>
              <Box
                w="48px"
                h="48px"
                borderRadius="full"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
              >
                <Image
                  src="/yo-circular.png"
                  alt="profile-photo"
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>

              <Box fontSize="sm" color={mutedText}>
                <Text fontWeight="semibold" color={useColorModeValue("black", "white")}>
                  Agustín Juárez
                </Text>
                <Text>Argentina (UTC-3)</Text>
              </Box>
            </HStack>

            <Heading
              mt={6}
              fontSize={{ base: "3xl", md: "5xl" }}
              letterSpacing="-0.02em"
              lineHeight="1.05"
            >
              {t("presentation.intro_title")}
            </Heading>

            <Text mt={5} fontSize={{ base: "md", md: "lg" }} color={mutedText} maxW="2xl">
              {t("presentation.intro_text")}
            </Text>
            <HStack spacing={3} flexWrap="wrap" mt={4}>
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
                  leftIcon={<DownloadIcon />}
                  variant="outline"
                  borderRadius="full"
                  bg={accentColor}
                  color="white"
                  >
                  {l.label}
                </Button>
              ))}
            </HStack>
          </Box>


          <MotionBox
            gridColumn={{ lg: "span 5" }}
            borderWidth="1px"
            borderColor={borderColor}
            bg={cardBg}
            borderRadius="2xl"
            p={{ base: 5, md: 6 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Text fontSize="xs" fontWeight="bold" letterSpacing="0.12em" color={mutedText}>
              {t("presentation.intro_focus")}
            </Text>

            <VStack mt={4} spacing={3} align="start" fontSize="sm" color={mutedText}>
              <HStack align="start" spacing={3}>
                <Box mt="7px" w="8px" h="8px" borderRadius="full" bg={accentColor} flexShrink={0} />
                <Text>
                  {t(
                    "presentation.intro_b1"
                  )}
                </Text>
              </HStack>

              <HStack align="start" spacing={3}>
                <Box mt="7px" w="8px" h="8px" borderRadius="full" bg={accentColor} flexShrink={0} />
                <Text>
                  {t(
                    "presentation.intro_b2",
                  )}
                </Text>
              </HStack>

              <HStack align="start" spacing={3}>
                <Box mt="7px" w="8px" h="8px" borderRadius="full" bg={accentColor} flexShrink={0} />
                <Text>
                  {t(
                    "presentation.intro_b3"
                  )}
                </Text>
              </HStack>
            </VStack>
          </MotionBox>
        </SimpleGrid>

        <Box mt={{ base: 12, md: 14 }}>
          <HStack
            spacing={5}
            overflowX="auto"
            pb={2}
            sx={{
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {images.map((img, idx) => (
              <MotionBox
                key={idx}
                flex="0 0 auto"
                w={{ base: "280px", md: "320px" }}
                h={{ base: "190px", md: "220px" }}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <Image src={img.src} alt={img.alt} w="full" h="full" objectFit="cover" />
              </MotionBox>
            ))}
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}
