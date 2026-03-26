import { useColorModeValue } from "@chakra-ui/react";

export function useAccentColors() {
  // Celeste para dark, azul para light
  const accentColor = useColorModeValue("#0066FF", "#67E8F9");

  // Fondo - navbar y footer en color base, contenido principal diferenciado
  const bgColor = useColorModeValue("#fafafa", "#0a0a0a");
  const contentBgColor = useColorModeValue("#f4f5f7", "#111111");

  // Texto principal
  const textColor = useColorModeValue("#0f172a", "#f1f5f9");

  // Borde sutil para cards - más notorio en dark
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return { accentColor, bgColor, contentBgColor, textColor, borderColor };
}
