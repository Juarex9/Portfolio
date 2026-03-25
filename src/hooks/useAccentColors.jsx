import { useColorModeValue } from "@chakra-ui/react";

export function useAccentColors() {
  // Celeste para dark, azul para light
  const accentColor = useColorModeValue("#0066FF", "#67E8F9");

  // Fondo - navbar y footer en color base, contenido principal diferenciado
  const bgColor = useColorModeValue("#fafafa", "#080808");
  const contentBgColor = useColorModeValue("#f4f5f7", "#0d0d0d");

  // Texto principal
  const textColor = useColorModeValue("#0f172a", "#f1f5f9");

  // Borde sutil para cards
  const borderColor = useColorModeValue("gray.200", "gray.800");

  return { accentColor, bgColor, contentBgColor, textColor, borderColor };
}
