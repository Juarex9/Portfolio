import React from "react";
//import { Container, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Web3ComingSoonFlipWords from "../components/Web3ComingSoon";

export default function Web3() {
  const {t} = useTranslation()
  return (
    <>
    <Web3ComingSoonFlipWords/>
    </>
  );
}
