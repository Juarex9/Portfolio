import { useColorModeValue } from "@chakra-ui/react";

export function useAccentColors() {
  // Celeste para dark, azul para light
  const accentColor = useColorModeValue("#0066FF", "#67E8F9");

  // Fondo - mismo color para unify todo
  const bgColor = useColorModeValue("#ffffff", "#000000");

  // Texto principal
  const textColor = useColorModeValue("#0f172a", "#f1f5f9");

  // Cards sin borde - mismo bg
  const cardBg = useColorModeValue("#ffffff", "#000000");

  // Texto dentro de las cards
  const cardText = useColorModeValue("#0f172a", "#f1f5f9");

  return { accentColor, cardBg, cardText, bgColor, textColor };
}
