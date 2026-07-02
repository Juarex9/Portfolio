import { useTheme } from "./useTheme.jsx";

export function useColorModeValue(lightValue, darkValue) {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark" ? darkValue : lightValue;
}
