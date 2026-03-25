import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link as CLink,
  useColorMode,
  useDisclosure,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MdLanguage } from "react-icons/md";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const LINKS = [
  { href: "/", key: "navbar.home" },
  { href: "/proyectos", key: "navbar.projects" },
  { href: "/educacion", key: "navbar.education" },
  { href: "/sobremi", key: "navbar.about" },
  { href: "/contacto", key: "navbar.contact" },
];

export default function Navbar() {
  const { textColor, accentColor, bgColor } = useAccentColors();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const currentLang = i18n.language;

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      w="100%"
      bg={bgColor}
    >
      <Flex
        as="nav"
        maxW="6xl"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={3}
        align="center"
        justify="space-between"
        color={textColor}
      >
        <CLink
          href="/"
          fontWeight="800"
          fontSize="xl"
          fontFamily="var(--font-display)"
          letterSpacing="-0.02em"
          _hover={{ textDecoration: "none" }}
        >
          <Text as="span" color={accentColor}>A</Text>
          <Text as="span">JZ</Text>
        </CLink>

        <HStack
          as="ul"
          spacing={1}
          mx="auto"
          display={{ base: "none", lg: "flex" }}
        >
          {LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Box
                as="li"
                key={link.href}
                listStyleType="none"
              >
                <CLink
                  href={link.href}
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontWeight={isActive ? "600" : "500"}
                  fontSize="sm"
                  fontFamily="var(--font-body)"
                  color={isActive ? accentColor : textColor}
                  aria-current={isActive ? "page" : undefined}
                  _hover={{
                    textDecoration: "none",
                    color: accentColor,
                  }}
                  transition="all 0.3s"
                >
                  {t(link.key)}
                </CLink>
              </Box>
            );
          })}
        </HStack>

        <HStack spacing={1}>
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label="Change language"
              icon={
                <Box display="flex" alignItems="center" gap={1}>
                  <MdLanguage />
                  <Text fontSize="xs" fontWeight="600">
                    {currentLang.toUpperCase()}
                  </Text>
                </Box>
              }
              variant="ghost"
              size="sm"
              fontFamily="var(--font-body)"
            />
            <MenuList minW="120px" borderRadius="xl" py={2}>
              <MenuItem
                onClick={() => handleChangeLang("es")}
                fontWeight={currentLang === "es" ? "700" : "400"}
                fontFamily="var(--font-body)"
                bg={currentLang === "es" ? `${accentColor}15` : "transparent"}
                color={currentLang === "es" ? accentColor : textColor}
                _hover={{
                  bg: `${accentColor}10`,
                  color: accentColor,
                }}
              >
                Español
              </MenuItem>
              <MenuItem
                onClick={() => handleChangeLang("en")}
                fontWeight={currentLang === "en" ? "700" : "400"}
                fontFamily="var(--font-body)"
                bg={currentLang === "en" ? `${accentColor}15` : "transparent"}
                color={currentLang === "en" ? accentColor : textColor}
                _hover={{
                  bg: `${accentColor}10`,
                  color: accentColor,
                }}
              >
                English
              </MenuItem>
            </MenuList>
          </Menu>

          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
          />

          <IconButton
            aria-label="Toggle navigation"
            icon={isOpen ? <CloseIcon boxSize={3} /> : <HamburgerIcon />}
            display={{ base: "inline-flex", lg: "none" }}
            onClick={onToggle}
            variant="ghost"
            size="sm"
          />
        </HStack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box
          bg={bgColor}
          display={{ lg: "none" }}
          py={4}
          px={4}
        >
          <HStack spacing={2} flexDirection="column" align="stretch">
            {LINKS.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <CLink
                  key={link.href}
                  href={link.href}
                  w="100%"
                  display="block"
                  px={4}
                  py={3}
                  borderRadius="xl"
                  fontWeight={isActive ? "600" : "500"}
                  fontFamily="var(--font-body)"
                  fontSize="md"
                  color={isActive ? accentColor : textColor}
                  _hover={{
                    color: accentColor,
                    textDecoration: "none",
                  }}
                  transition="all 0.3s"
                  onClick={onToggle}
                >
                  {t(link.key)}
                </CLink>
              );
            })}
          </HStack>
        </Box>
      </Collapse>
    </Box>
  );
}
