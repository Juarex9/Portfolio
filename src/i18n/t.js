import es from "./locales/es.json";
import en from "./locales/en.json";

const dicts = { es, en };

export function t(locale, key) {
  const dict = dicts[locale] ?? es;
  const value = key.split(".").reduce((acc, part) => acc?.[part], dict);
  return typeof value === "string" ? value : key;
}
