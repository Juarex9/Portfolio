import React from "react";
import {
    Box,
    SimpleGrid,
    Heading,
    Text,
    Image,
    LinkBox,
    LinkOverlay,
    Container,
    useColorModeValue,
} from "@chakra-ui/react";
import { useAccentColors } from "../hooks/useAccentColors";


export default function Proyectos() {
    const { cardBg, bgColor, accentColor, } = useAccentColors();

    const cards = [
        {
            title: "Web2",
            description:
                "Proyectos desarrollados con tecnologías tradicionales del entorno web, como React, Node.js y bases de datos SQL o NoSQL.",
            image:
                "/web2.jpg",
            link: "/web2",
        },
        {
            title: "Web3",
            description:
                "Proyectos que integran blockchain, contratos inteligentes y herramientas descentralizadas del nuevo ecosistema web.",
            image:
                "/web3.jpg",
            link: "/web3",
        },
    ];

    return (
        <Box
            w="full"
            bg={`linear-gradient(135deg, ${bgColor} 70%, #69c58b 100%)`}
            py={{ base: 10, md: 20 }}
        >
            <Container maxW="6xl" py={{ base: 10, md: 20 }}>
                <Heading
                    as="h1"
                    textAlign="center"
                    mb={10}
                    color={useColorModeValue("green.500", "green.300")}
                >
                    Mis Proyectos
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    {cards.map((card, index) => (
                        <LinkBox
                            as="article"
                            key={index}
                            bg={cardBg}
                            borderRadius="xl"
                            boxShadow="lg"
                            overflow="hidden"
                            transition="all 0.3s ease"
                            _hover={{ transform: "translateY(-5px)", bg: cardBg }}
                        >
                            <Box position="relative" height="220px" overflow="hidden">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    objectFit="cover"
                                    width="100%"
                                    height="100%"
                                />
                            </Box>

                            <Box p={6}>
                                <Heading size="lg" mb={3}>
                                    <LinkOverlay href={card.link}>{card.title}</LinkOverlay>
                                </Heading>
                                <Text color={useColorModeValue("gray.600", "gray.300")}>
                                    {card.description}
                                </Text>
                            </Box>
                        </LinkBox>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>

    );
}
