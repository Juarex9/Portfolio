import { useMediaQuery } from "./useMediaQuery.js";

export function useBreakpointValue(values, defaultValue) {
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 1024px)");

  if (typeof values !== "object" || values === null) return values;

  if (isLg && values.lg !== undefined) return values.lg;
  if (isMd && values.md !== undefined) return values.md;
  if (values.base !== undefined) return values.base;

  return defaultValue;
}
