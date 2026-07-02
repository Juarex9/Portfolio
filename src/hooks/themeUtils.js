export const THEME_STORAGE_KEY = "theme";
export const LEGACY_STORAGE_KEY = "chakra-ui-color-mode";

export function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function readStoredTheme() {
  if (typeof window === "undefined") return "system";

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") return stored;

  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (legacy === "light" || legacy === "dark") {
    localStorage.setItem(THEME_STORAGE_KEY, legacy);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    return legacy;
  }

  return "system";
}

export function resolveTheme(theme) {
  return theme === "system" ? getSystemTheme() : theme;
}

export function applyThemeToDocument(resolvedTheme) {
  const isDark = resolvedTheme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
}
