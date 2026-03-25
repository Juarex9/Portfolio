import {
  Container,
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
  Badge,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { BsPerson, BsWhatsapp, BsLinkedin, BsTelegram } from "react-icons/bs";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionBox = motion(Box);

export default function Contact() {
  const { accentColor, bgColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const toast = useToast();
  const { t } = useTranslation();
  const secondaryText = "gray.500";

  const [form, setForm] = useState({ name: "", email: "", message: "", hp: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const resetForm = () => setForm({ name: "", email: "", message: "", hp: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message, honeypot: form.hp }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || "Error al enviar");
      toast({ title: "Mensaje enviado", description: "Gracias por contactarme, te responderé a la brevedad.", status: "success", duration: 5000, isClosable: true });
      resetForm();
    } catch (err) {
      toast({ title: "Ups, algo salió mal", description: err?.message || "Ocurrió un error al enviar el mensaje.", status: "error", duration: 5000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo titleKey="seo.contact.title" descriptionKey="seo.contact.description" canonicalPath="/contacto" />
      <Box w="100%" minH="100vh" bg={bgColor}>
        <Container maxW="6xl" py={{ base: 8, md: 16 }}>
          <MotionBox initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.6 }} viewport={{ once: true }} mb={8}>
            <HStack mb={3} gap={2}>
              <Box w="32px" h="2px" bg={accentColor} borderRadius="full" />
              <Badge borderRadius="full" px={3} py={1} bg={`${accentColor}15`} color={accentColor} textTransform="uppercase" fontSize="xs" fontWeight="600" letterSpacing="wider" fontFamily="var(--font-body)">{t("contact.section.badge")}</Badge>
            </HStack>
            <Heading fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }} fontWeight="800" fontFamily="var(--font-display)" letterSpacing="-0.02em" lineHeight="1.2" mb={2}>{t("contact.section.title")}</Heading>
            <Text fontSize={{ base: "sm", md: "md" }} color={secondaryText} maxW="2xl" fontFamily="var(--font-body)">{t("contact.section.subtitle")}</Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 12 }}>
            <Box>
              <Text mt={2} color={secondaryText} fontFamily="var(--font-body)" lineHeight="1.7" fontSize="sm" mb={5}>{t("contact.section.desc")}</Text>
              <VStack spacing={2} align="stretch">
                {[{ icon: MdPhone, href: "tel:+5493886672774", label: "+54 9 388 667 2774" }, { icon: MdEmail, href: "mailto:agustinjuarez375@gmail.com", label: "agustinjuarez375@gmail.com" }, { icon: MdLocationOn, href: null, label: "Salta, Argentina" }].map((item) => (
                  <Button key={item.label} as={item.href ? Link : "button"} href={item.href} size="sm" h="44px" justifyContent="flex-start" variant="ghost" color={secondaryText} fontWeight="500" fontFamily="var(--font-body)" _hover={{ color: accentColor }} leftIcon={<item.icon color={accentColor} size="16px" />} transition="all 0.3s">{item.label}</Button>
                ))}
              </VStack>
              <HStack spacing={2} mt={4}>
                {[{ icon: BsLinkedin, href: "https://www.linkedin.com/in/agustin-juarez0907/", label: "LinkedIn" }, { icon: BsWhatsapp, href: "https://wa.me/5493886672774", label: "WhatsApp" }, { icon: BsTelegram, href: "https://t.me/agustin_jzz", label: "Telegram" }].map((social) => (
                  <MotionBox key={social.label} whileHover={{ y: -2 }} transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}>
                    <IconButton as={Link} href={social.href} target="_blank" aria-label={social.label} variant="ghost" size="md" isRound color={secondaryText} _hover={{ color: accentColor }} icon={<social.icon size={18} />} transition="all 0.3s" />
                  </MotionBox>
                ))}
              </HStack>
            </Box>

            <Box as="form" onSubmit={onSubmit}>
              <VStack spacing={3} align="stretch">
                <Input type="text" name="hp" value={form.hp} onChange={onChange} display="none" aria-hidden="true" tabIndex={-1} autoComplete="off" />
                <FormControl id="name" isRequired>
                  <FormLabel fontFamily="var(--font-body)" fontWeight="500" fontSize="sm">{t("contact.form.name")}</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" h="44px"><BsPerson color={secondaryText} size={16} /></InputLeftElement>
                    <Input type="text" name="name" value={form.name} onChange={onChange} placeholder={t("contact.form.name")} h="44px" _focus={{ borderColor: accentColor }} fontFamily="var(--font-body)" fontSize="sm" />
                  </InputGroup>
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel fontFamily="var(--font-body)" fontWeight="500" fontSize="sm">{t("contact.form.email")}</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" h="44px"><MdOutlineEmail color={secondaryText} size={16} /></InputLeftElement>
                    <Input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@mail.com" h="44px" _focus={{ borderColor: accentColor }} fontFamily="var(--font-body)" fontSize="sm" />
                  </InputGroup>
                </FormControl>
                <FormControl id="message" isRequired>
                  <FormLabel fontFamily="var(--font-body)" fontWeight="500" fontSize="sm">{t("contact.form.message")}</FormLabel>
                  <Textarea name="message" value={form.message} onChange={onChange} placeholder={t("contact.form.desc")} _focus={{ borderColor: accentColor }} rows={4} fontFamily="var(--font-body)" fontSize="sm" />
                </FormControl>
                <Button 
                  type="submit" 
                  w="full"
                  size="md"
                  bg={accentColor} 
                  color="white" 
                  _hover={{ opacity: 0.9 }} 
                  isLoading={loading} 
                  borderRadius="full" 
                  fontWeight="600" 
                  fontFamily="var(--font-body)" 
                  transition="all 0.2s"
                >
                  {t("contact.form.send")}
                </Button>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
