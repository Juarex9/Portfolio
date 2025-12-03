import React from "react";
import { Container, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Web3() {
  const {t} = useTranslation()
  return (
    <Container maxW="6xl" py={10}>
      <Heading mb={4}>{t("projects.web3.title")}</Heading>
      <Text color="gray.400">
        {t("projects.web3.desc")}
      </Text>
    </Container>
  );
}
