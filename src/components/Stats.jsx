import {
  Box,
  Container,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

const stats = [
  { key: "experience", value: "1.5+" },
  { key: "projects", value: "2+" },
  { key: "technologies", value: "8+" },
];

export default function Stats() {
  const { accentColor, contentBgColor, borderColor } = useAccentColors();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box w="full" py={{ base: 12, md: 16 }} bg={contentBgColor}>
      <Container maxW="6xl">
        <SimpleGrid
          columns={{ base: 1, sm: 3 }}
          spacing={{ base: 4, md: 6 }}
        >
          {stats.map((stat, index) => (
            <MotionBox
              key={stat.key}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <Box
                border="1px solid"
                borderColor={borderColor}
                borderRadius="xl"
                py={{ base: 6, md: 8 }}
                textAlign="center"
                boxShadow="sm"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                <VStack spacing={2}>
                  <Text
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="800"
                    fontFamily="var(--font-display)"
                    color={accentColor}
                    lineHeight="1"
                    letterSpacing="-0.02em"
                  >
                    {stat.value}
                  </Text>

                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="gray.500"
                    textAlign="center"
                    fontFamily="var(--font-body)"
                    fontWeight="500"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {t(`stats.${stat.key}`)}
                  </Text>
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
