import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
  useColorModeValue,
  Badge,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdOutlineEmail,
} from "react-icons/md";
import {
  BsPerson,
  BsWhatsapp,
  BsLinkedin,
  BsTelegram,
} from "react-icons/bs";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);

export default function Contact() {
  const { accentColor, bgColor, textColor, cardBg } = useAccentColors();
  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    hp: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const resetForm = () => {
    setForm({ name: "", email: "", message: "", hp: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          honeypot: form.hp,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Error al enviar");
      }

      toast({ title: "Mensaje enviado!", status: "success" });
      resetForm();
    } catch (err) {
      toast({
        title: "Ups",
        description: err?.message || "Ocurrió un error al enviar",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const sectionBg = useColorModeValue(
    `linear-gradient(135deg, ${bgColor} 55%, rgba(105,197,139,0.18) 100%)`,
    `linear-gradient(135deg, ${bgColor} 70%, rgba(34,197,94,0.28) 100%)`
  );

  const formBg = useColorModeValue("white", "#020617");
  const inputBorder = useColorModeValue("gray.200", "gray.600");
  const { t } = useTranslation();
  return (
    <Box w="100%" bg={sectionBg} py={{ base: 12, md: 20 }}>
      <Container maxW="6xl">
        {/* Header de sección */}
        <HStack
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={10}
          spacing={4}
          flexDir={{ base: "column", md: "row" }}
        >
          <Box>
            <Badge
              borderRadius="full"
              px={3}
              py={1}
              mb={2}
              bg={useColorModeValue("green.50", "green.900")}
              color={useColorModeValue("green.700", "green.200")}
              textTransform="uppercase"
              fontSize="xs"
              letterSpacing="wider"
            >
              {t("contact.section.badge")}
            </Badge>
            <Heading
              fontSize={{ base: "2xl", md: "3xl" }}
              color={useColorModeValue("gray.900", "white")}
              fontWeight="extrabold"
              mb={1}
            >
              {t("contact.section.title")}
            </Heading>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.300")}
              maxW="lg"
            >
              {t("contact.section.subtitle")}
            </Text>
          </Box>
        </HStack>

        {/* Card principal */}
        <Flex justify="center">
          <MotionBox
            bg={cardBg}
            color={textColor}
            borderRadius="2xl"
            boxShadow="0 18px 40px rgba(15,23,42,0.25)"
            p={{ base: 6, md: 10 }}
            w="100%"
            maxW="5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 10, md: 12 }}>
              {/* Columna izquierda: info de contacto */}
              <Box>
                <Heading fontSize="2xl" mb={2}>
                  {t("contact.section.title")}
                </Heading>
                <Text
                  mt={{ base: 2, md: 3 }}
                  color={useColorModeValue("gray.600", "gray.300")}
                >
                  {t("contact.section.desc")}
                </Text>

                <Box py={{ base: 5, md: 8 }}>
                  <VStack spacing={3} align="flex-start">
                    <Button
                      as={Link}
                      href="tel:+5493886672774"
                      size="md"
                      h="48px"
                      w="240px"
                      justifyContent="flex-start"
                      variant="ghost"
                      color={textColor}
                      _hover={{ border: `1px solid ${accentColor}` }}
                      leftIcon={<MdPhone color={accentColor} size="20px" />}
                    >
                      +54 9 3886672774
                    </Button>
                    <Button
                      as={Link}
                      href="mailto:agustinjuarez375@gmail.com"
                      size="md"
                      h="48px"
                      w="240px"
                      justifyContent="flex-start"
                      variant="ghost"
                      color={textColor}
                      _hover={{ border: `1px solid ${accentColor}` }}
                      leftIcon={<MdEmail color={accentColor} size="20px" />}
                    >
                      agustinjuarez375@gmail.com
                    </Button>
                    <Button
                      size="md"
                      h="48px"
                      w="240px"
                      justifyContent="flex-start"
                      variant="ghost"
                      color={textColor}
                      _hover={{ border: `1px solid ${accentColor}` }}
                      leftIcon={
                        <MdLocationOn color={accentColor} size="20px" />
                      }
                    >
                      Salta, Argentina
                    </Button>
                  </VStack>
                </Box>

                <HStack mt={{ base: 4, md: 2 }} spacing={4}>
                  <IconButton
                    as={Link}
                    href="https://www.linkedin.com/in/agustin-juarez0907/"
                    target="_blank"
                    aria-label="LinkedIn"
                    variant="ghost"
                    size="lg"
                    isRound
                    _hover={{ bg: accentColor, color: "white" }}
                    icon={<BsLinkedin size="22px" />}
                  />
                  <IconButton
                    as={Link}
                    href="https://wa.me/5493886672774"
                    target="_blank"
                    aria-label="WhatsApp"
                    variant="ghost"
                    size="lg"
                    isRound
                    _hover={{ bg: accentColor, color: "white" }}
                    icon={<BsWhatsapp size="22px" />}
                  />
                  <IconButton
                    as={Link}
                    href="https://t.me/agustin_jzz"
                    target="_blank"
                    aria-label="Telegram"
                    variant="ghost"
                    size="lg"
                    isRound
                    _hover={{ bg: accentColor, color: "white" }}
                    icon={<BsTelegram size="22px" />}
                  />
                </HStack>
              </Box>

              {/* Columna derecha: formulario */}
              <Box
                bg={formBg}
                borderRadius="2xl"
                px={{ base: 5, md: 6 }}
                py={{ base: 6, md: 7 }}
                boxShadow={useColorModeValue(
                  "0 10px 30px rgba(148,163,184,0.35)",
                  "0 10px 30px rgba(15,23,42,0.9)"
                )}
              >
                <Box color={useColorModeValue("gray.800", "gray.100")}>
                  <form onSubmit={onSubmit}>
                    <VStack spacing={5} align="stretch">
                      {/* honeypot oculto */}
                      <Input
                        type="text"
                        name="hp"
                        value={form.hp}
                        onChange={onChange}
                        display="none"
                        aria-hidden="true"
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      <FormControl id="name" isRequired>
                        <FormLabel>{t("contact.form.name")}</FormLabel>
                        <InputGroup borderColor={inputBorder}>
                          <InputLeftElement pointerEvents="none">
                            <BsPerson
                              color={useColorModeValue("#1f2933", "#d1d5db")}
                            />
                          </InputLeftElement>
                          <Input
                            type="text"
                            size="md"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder={t("contact.form.name")}
                            _focus={{
                              borderColor: accentColor,
                              boxShadow: `0 0 0 1px ${accentColor}`,
                            }}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl id="email" isRequired>
                        <FormLabel>{t("contact.form.email")}</FormLabel>
                        <InputGroup borderColor={inputBorder}>
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail
                              color={useColorModeValue("#1f2933", "#d1d5db")}
                            />
                          </InputLeftElement>
                          <Input
                            type="email"
                            size="md"
                            name={t("contact.form.email")}
                            value={form.email}
                            onChange={onChange}
                            placeholder="you@mail.com"
                            _focus={{
                              borderColor: accentColor,
                              boxShadow: `0 0 0 1px ${accentColor}`,
                            }}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl id="message" isRequired>
                        <FormLabel>{t("contact.form.message")}</FormLabel>
                        <Textarea
                          name="message"
                          value={form.message}
                          onChange={onChange}
                          borderColor={inputBorder}
                          placeholder={t("contact.form.desc")}
                          _focus={{
                            borderColor: accentColor,
                            boxShadow: `0 0 0 1px ${accentColor}`,
                          }}
                          rows={5}
                        />
                      </FormControl>

                      <HStack justify="flex-end">
                        <Button
                          type="submit"
                          variant="solid"
                          bg={accentColor}
                          color="white"
                          _hover={{ bg: accentColor, opacity: 0.9 }}
                          isLoading={loading}
                          borderRadius="full"
                          px={6}
                        >
                          {t("contact.form.send")}
                        </Button>
                      </HStack>
                    </VStack>
                  </form>
                </Box>
              </Box>
            </SimpleGrid>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
}
