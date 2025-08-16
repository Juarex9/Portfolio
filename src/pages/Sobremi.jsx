import React from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";
import { useAccentColors } from "../hooks/useAccentColors";

const BlogTags = ({ marginTop = 0, tags = [] }) => {
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => (
        <Tag size="md" variant="solid" colorScheme="orange" key={tag}>
          {tag}
        </Tag>
      ))}
    </HStack>
  );
};

const BlogAuthor = ({ date, name }) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${name}`}
      />
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{new Date(date).toLocaleDateString()}</Text>
    </HStack>
  );
};

const ArticleList = () => {
  const { bgColor, textColor, cardBg, accentColor } = useAccentColors();
  return (
    <Container maxW="100%" p="12" bg={`linear-gradient(135deg, ${bgColor} 70%, #69c58b 100%)`} color={textColor}>
      <Heading as="h1" color={accentColor}>Un poco sobre mi</Heading>

      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                borderRadius="lg"
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80"
                alt="some good alt text"
                objectFit="contain"
              />
            </Box>
          </Box>

          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                "radial(orange.600 1px, transparent 1px)",
                "radial(orange.300 1px, transparent 1px)"
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>

        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="flex-start"
          marginTop={{ base: "3", sm: "0" }}
        >
          <Heading>
            <Text textDecoration="none" _hover={{ textDecoration: "none" }} color={accentColor}>
              ¿Quien soy?
            </Text>
          </Heading>
          <VStack
            align="start"
            spacing={4}
            mt="2"
            maxW="70ch"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
            lineHeight="tall"
          >
            <Text>
              Me llamo Agustín, vivo en Salta – Argentina y soy un apasionado de la informática, la tecnología y el desarrollo.
            </Text>
            <Text>
              Me dedico a crear aplicaciones web modernas y accesibles, siempre buscando aprender y mejorar mis habilidades.
              Me encanta colaborar en proyectos y compartir conocimientos con la comunidad. Siempre dispuesto a enfrentar nuevos
              desafíos y aprender de ellos.
            </Text>
            <Text>
              Actualmente estoy estudiando Ingeniería Informática y me interesa mucho el desarrollo Full Stack, aunque disfruto
              de todos los aspectos de la informática y la programación.
            </Text>
          </VStack>
          <VStack
            align="start"
            spacing={4}
            mt={{ base: 2, md: 8, lg: 12 }}
            maxW="70ch"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
            lineHeight="tall">
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolorum iste officia recusandae soluta consequatur sapiente perferendis nisi aperiam! Ipsa consectetur perspiciatis error. Animi magnam alias esse ullam veritatis eaque!
            </Text>
          </VStack>
        </Box>
      </Box>
      
        <Heading as="h2" marginTop="30px" color={accentColor}>
          Latest articles
        </Heading>

      <Box display="grid" gridTemplateColumns={"1fr, 1fr"}>
        <Wrap spacing="30px" marginTop="5">
          <WrapItem width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Image
                    transform="scale(1.0)"
                    src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80"
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                </Box>
              </Box>
              <Heading fontSize="xl" marginTop="2">
                <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                  Some blog title
                </Text>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry…
              </Text>
            </Box>
          </WrapItem>
        </Wrap>

        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
          <Heading as="h2" color={accentColor}>What we write about</Heading>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit…
          </Text>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit…
          </Text>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit…
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default ArticleList;
