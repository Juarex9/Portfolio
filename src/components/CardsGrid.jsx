// src/components/BlogCardsGrid.jsx
import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
  Container,
} from "@chakra-ui/react";

function BlogCard({ title, excerpt, tag, author, date, imageSrc, href }) {
  const cardBg = useColorModeValue("white", "gray.900");
  const headingColor = useColorModeValue("gray.700", "white");
  const imgBg = useColorModeValue("gray.100", "gray.700");

  return (
    <LinkBox
      as="article"
      maxW="445px"
      w="full"
      bg={cardBg}
      boxShadow="2xl"
      rounded="md"
      p={6}
      overflow="hidden"
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{ transform: "translateY(-2px)", boxShadow: "dark-lg" }}
    >
      <Box h="210px" bg={imgBg} mt={-6} mx={-6} mb={6} pos="relative">
        <Image
          src={imageSrc}
          alt={title}
          w="100%"
          h="100%"
          objectFit="cover"
          loading="lazy"
        />
      </Box>

      <Stack spacing={3}>
        {tag && (
          <Text
            color="green.500"
            textTransform="uppercase"
            fontWeight={800}
            fontSize="sm"
            letterSpacing={1.1}
          >
            {tag}
          </Text>
        )}

        <Heading color={headingColor} fontSize="2xl" fontFamily="body">
          <LinkOverlay href={href} target="_blank" rel="noopener noreferrer">
            {title}
          </LinkOverlay>
        </Heading>

        <Text color="gray.500">{excerpt}</Text>
      </Stack>

      <Stack mt={6} direction="row" spacing={4} align="center">
        {author?.avatar && <Avatar src={author.avatar} />}
        <Stack direction="column" spacing={0} fontSize="sm">
          <Text fontWeight={600}>{author?.name}</Text>
          <Text color="gray.500">{date}</Text>
        </Stack>
      </Stack>
    </LinkBox>
  );
}

export default function CardsGrid() {
  const cards = [
    {
      title: "Boost your conversion rate",
      excerpt:
        "Quick tips to improve UX and increase conversions in your product.",
      tag: "Blog",
      author: {
        name: "Achim Rolle",
        avatar: "https://avatars0.githubusercontent.com/u/1164541?v=4",
      },
      date: "Feb 08, 2021 · 6 min read",
      imageSrc:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1350&q=80",
      href: "https://example.com/post-1",
    },
    {
      title: "Design systems with Chakra",
      excerpt:
        "How to build consistent UI faster using tokens, theming and components.",
      tag: "Article",
      author: {
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/100?img=5",
      },
      date: "Mar 12, 2024 · 4 min read",
      imageSrc:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1350&q=80",
      href: "https://example.com/post-2",
    },
  ];

  return (
    <Container maxW="6xl" py={8}>
      <Center>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          justifyItems="center"   // centra cada card en su celda
        >
          {cards.map((c, i) => (
            <BlogCard key={i} {...c} />
          ))}
        </SimpleGrid>
      </Center>
    </Container>
  );
}
