import {
  Box,
  Container,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);

const stats = [
  { key: "experience", value: "1.5+" },
  { key: "projects", value: "2" },
  { key: "technologies", value: "8+" },
];

export default function Stats() {
  const { accentColor, bgColor } = useAccentColors();
  const { t } = useTranslation();
  const cardBg = useColorModeValue("white", "#111827");
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const statTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box w="full" bg={bgColor} py={{ base: 10, md: 12 }}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }}>
          {stats.map((stat, index) => (
            <MotionBox
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <VStack
                bg={cardBg}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                py={{ base: 5, md: 6 }}
                px={4}
                spacing={1}
                _hover={{ borderColor: accentColor, transform: "translateY(-2px)" }}
                transition="all 0.2s ease"
              >
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="extrabold"
                  color={accentColor}
                  lineHeight="1"
                >
                  {stat.value}
                </Text>
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color={statTextColor}
                  textAlign="center"
                >
                  {t(`stats.${stat.key}`)}
                </Text>
              </VStack>
            </MotionBox>
          ))}

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            gridColumn={{ base: "span 1", md: "span 1" }}
          >
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
