import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link as CLink,
  useColorMode,
  useDisclosure,
  Collapse,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MdLanguage } from "react-icons/md";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";

// claves que vamos a traducir con i18next
const LINKS = [
  { href: "/", key: "navbar.home" },
  { href: "/proyectos", key: "navbar.projects" },
  { href: "/educacion", key: "navbar.education" },
  { href: "/sobremi", key: "navbar.about" },
  { href: "/contacto", key: "navbar.contact" },
];

export default function Navbar() {
  const { bgColor, textColor, accentColor } = useAccentColors();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const { t, i18n } = useTranslation();

  const navBg = useColorModeValue(bgColor, bgColor);
  const borderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const currentLang = i18n.language?.startsWith("en") ? "en" : "es";

  const handleChangeLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={20}
      w="100%"
      bg={navBg}
      borderBottom="1px solid"
      borderColor={borderColor}
      backdropFilter="blur(14px)"
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
        {/* Links desktop */}
        <HStack
          as="ul"
          spacing={8}
          mx="auto"
          display={{ base: "none", md: "flex" }}
        >
          {LINKS.map((link) => (
            <Box as="li" key={link.href} listStyleType="none">
              <CLink
                href={link.href}
                fontWeight={500}
                color={textColor}
                position="relative"
                _hover={{ textDecoration: "none", color: accentColor }}
                _after={{
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -1,
                  width: "100%",
                  height: "2px",
                  bg: accentColor,
                  borderRadius: "full",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.2s ease-out",
                }}
                sx={{
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                {t(link.key)}
              </CLink>
            </Box>
          ))}
        </HStack>

        <HStack spacing={1}>
          {/* Selector de idioma (ACÁ VA EL ÍCONO) */}
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label="Cambiar idioma"
              icon={<MdLanguage />}
              variant="ghost"
              size="sm"
            />
            <MenuList>
              <MenuItem
                onClick={() => handleChangeLang("es")}
                fontWeight={currentLang === "es" ? "bold" : "normal"}
              >
                Español
              </MenuItem>
              <MenuItem
                onClick={() => handleChangeLang("en")}
                fontWeight={currentLang === "en" ? "bold" : "normal"}
              >
                English
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Botón modo claro/oscuro */}
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
          />

          {/* Hamburguesa mobile */}
          <IconButton
            aria-label="Toggle navigation"
            icon={isOpen ? <CloseIcon boxSize={3} /> : <HamburgerIcon />}
            display={{ base: "inline-flex", md: "none" }}
            onClick={onToggle}
            variant="ghost"
            size="sm"
          />
        </HStack>
      </Flex>

      {/* Menú colapsable mobile */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          bg={navBg}
          borderTop="1px solid"
          borderColor={borderColor}
          display={{ md: "none" }}
        >
          {LINKS.map((link) => (
            <Box
              key={link.href}
              px={6}
              py={3}
              borderBottomWidth="1px"
              borderColor="blackAlpha.100"
            >
              <CLink
                href={link.href}
                w="100%"
                display="block"
                fontWeight={500}
                color={textColor}
                _hover={{ color: accentColor }}
                onClick={onToggle}
              >
                {t(link.key)}
              </CLink>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
