import { Flex, HStack, Link as CLink, IconButton } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useAccentColors } from "../hooks/useAccentColors";


export default function Navbar() {
    const { accentColor, bgColor, textColor } = useAccentColors();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            as="nav"
            position="sticky"
            top={0}
            zIndex={10}
            w="100%"
            bg={bgColor}
            color={textColor}
            overflowX="clip"
            justify="center"
        >
            <Flex
                w="100%"
                maxW="container.xl"
                px={4}
                py={3}
                align="center"
                gap={4}
            >
                <HStack spacing={8} mx="auto" wrap="wrap">
                    <CLink href="/" color={accentColor} fontWeight={500}>Home</CLink>
                    <CLink href="/proyectos" color={accentColor} fontWeight={500}>Proyectos</CLink>
                    <CLink href="/educacion" color={accentColor} fontWeight={500}>Educación</CLink>
                    <CLink href="/sobremi" color={accentColor} fontWeight={500}>Sobre mí</CLink>
                    <CLink href="/contacto" color={accentColor} fontWeight={500}>Contacto</CLink>
                </HStack>

                <IconButton
                    aria-label="Toggle color mode"
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    variant="ghost"
                    flexShrink={0}
                />
            </Flex>
        </Flex>
    );
}
