import { useColorModeValue } from "@chakra-ui/react";

export function useAccentColors() {
  // Verde principal (más brillante en light, neon en dark)
  const accentColor = useColorModeValue("#15803d", "#4ade80");

  // Fondo general del sitio
  const bgColor = useColorModeValue("#f7f9fb", "#020617");

  // Texto principal
  const textColor = useColorModeValue("#0f172a", "#e5e7eb");

  // Fondo de cards / secciones
  const cardBg = useColorModeValue("#ffffff", "#111827");

  // Texto dentro de las cards
  const cardText = useColorModeValue("#111827", "#f9fafb");

  return { accentColor, cardBg, cardText, bgColor, textColor };
}   
    