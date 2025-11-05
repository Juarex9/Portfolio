// src/components/Footer.jsx
import React from "react";
import {
    Box,
    Container,
    Stack,
    HStack,
    VStack,
    Divider,
    Text,
    Link,
    IconButton,
    useColorModeValue,
} from "@chakra-ui/react";
import { BsGithub, BsLinkedin, BsEnvelope } from "react-icons/bs";
import { useAccentColors } from "../hooks/useAccentColors";

export default function Footer() {
    const { cardBg, bgColor, accentColor } = useAccentColors();
    const muted = useColorModeValue("gray.600", "gray.300");

    return (
        <Box
            pt={10}
            pb={8}
            bg={cardBg}
            boxShadow="0 -6px 25px rgba(0,0,0,0.3)"
        >
            <Container maxW="6xl">
                <Divider opacity={0.15} mb={6} />

                <Stack
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{ base: "start", md: "center" }}
                    spacing={6}
                >
                    <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" fontSize="lg" color={accentColor}>
                            Agustín Juárez
                        </Text>
                        <Text fontSize="sm" color={muted}>
                            Desarrollador Full-Stack · React · Node · Web3
                        </Text>
                    </VStack>

                    <HStack spacing={5}>
                        <IconButton
                            as={Link}
                            href="https://github.com/Juarex9"
                            aria-label="GitHub"
                            variant="ghost"
                            size="lg"
                            icon={<BsGithub />}
                            isExternal
                        />
                        <IconButton
                            as={Link}
                            href="https://linkedin.com/in/agustín-juárez0907"
                            aria-label="LinkedIn"
                            variant="ghost"
                            size="lg"
                            icon={<BsLinkedin />}
                            isExternal
                        />
                        <IconButton
                            as={Link}
                            href="mailto:agustinjuarez375@gmail.com"
                            aria-label="Email"
                            variant="ghost"
                            size="lg"
                            icon={<BsEnvelope />}
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    </HStack>
                </Stack>

                <Stack
                    mt={6}
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{ base: "start", md: "center" }}
                    spacing={4}
                >
                    <HStack spacing={6} wrap="wrap">
                        <Link href="/proyectos">Proyectos</Link>
                        <Link href="/educacion">Educación</Link>
                        <Link href="/sobremi">Sobre mí</Link>
                        <Link href="/contacto">Contacto</Link>
                    </HStack>

                    <Text fontSize="sm" color={muted}>
                        © {new Date().getFullYear()} Agustín Juárez. Hecho con React + Chakra UI.
                    </Text>
                </Stack>
            </Container>
        </Box>
    );
}
