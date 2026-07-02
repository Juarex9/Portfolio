import { useColorModeValue } from "./useColorModeValue.js";

export function useAccentColors() {
  const accentColor = useColorModeValue("#0066FF", "#67E8F9");
  const bgColor = useColorModeValue("#fafafa", "#0a0a0a");
  const contentBgColor = useColorModeValue("#f4f5f7", "#111111");
  const textColor = useColorModeValue("#0f172a", "#f1f5f9");
  const borderColor = useColorModeValue("#d1d5db", "#4b5563");

  return { accentColor, bgColor, contentBgColor, textColor, borderColor, cardBg: contentBgColor };
}
