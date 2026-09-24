import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { MdLanguage } from "react-icons/md";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTheme } from "../hooks/useTheme.jsx";
import { useTranslation } from "react-i18next";
import { useLocale, useLocalizedRoutes } from "../i18n/LocaleContext.jsx";
import { isExperiencePath } from "../i18n/routes.js";
import { cn } from "@/lib/utils";

const LINKS = [
  { route: "home", key: "navbar.home" },
  { route: "projects", key: "navbar.projects" },
  { route: "education", key: "navbar.education" },
  { route: "about", key: "navbar.about" },
  { route: "contact", key: "navbar.contact" },
];

function NavIconButton({ ariaLabel, onClick, className, children }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/10",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const { textColor, accentColor, bgColor } = useAccentColors();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const { t } = useTranslation();
  const { locale, currentPath, paths } = useLocale();
  const { routeFor } = useLocalizedRoutes();

  const normalize = (p) => (p !== "/" && p !== "/en/" ? p.replace(/\/$/, "") : p);
  const current = normalize(currentPath);

  useEffect(() => {
    if (!langOpen) return undefined;

    const onPointerDown = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [langOpen]);

  const isLinkActive = (link) => {
    const href = normalize(routeFor(link.route));
    return current === href || (link.route === "about" && isExperiencePath(current));
  };

  const langTargets = [
    { code: "es", label: "Español", href: paths.es },
    { code: "en", label: "English", href: paths.en },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full" style={{ backgroundColor: bgColor, color: textColor }}>
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6"
        aria-label="Main"
      >
        <a
          href={routeFor("home")}
          className="text-xl font-extrabold no-underline hover:no-underline"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em", color: textColor }}
        >
          <span style={{ color: accentColor }}>A</span>
          <span>JZ</span>
        </a>

        <ul className="mx-auto hidden list-none flex-row gap-1 lg:flex">
          {LINKS.map((link) => {
            const isActive = isLinkActive(link);
            const href = routeFor(link.route);
            return (
              <li key={link.route}>
                <a
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className="rounded-full px-4 py-2 text-sm no-underline transition-all duration-300 hover:no-underline"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? accentColor : textColor,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = accentColor;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = isActive ? accentColor : textColor;
                  }}
                >
                  {t(link.key)}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <div ref={langRef} className="relative">
            <NavIconButton
              ariaLabel="Change language"
              className="w-auto min-w-8 px-1.5"
              onClick={() => setLangOpen((open) => !open)}
            >
              <span className="flex items-center gap-1">
                <MdLanguage size={18} />
                <span className="whitespace-nowrap text-xs font-semibold leading-none">
                  {locale.toUpperCase()}
                </span>
              </span>
            </NavIconButton>

            {langOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-1 min-w-[120px] overflow-hidden rounded-xl border border-black/10 bg-white py-2 shadow-lg dark:border-white/10 dark:bg-[#111111]"
                role="menu"
              >
                {langTargets.map(({ code, label, href }) => {
                  const active = locale === code;
                  return (
                    <a
                      key={code}
                      href={href}
                      role="menuitem"
                      className="block w-full px-4 py-2 text-left text-sm no-underline transition-colors"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: active ? 700 : 400,
                        color: active ? accentColor : textColor,
                        backgroundColor: active ? `${accentColor}15` : "transparent",
                      }}
                      onClick={() => setLangOpen(false)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${accentColor}10`;
                        e.currentTarget.style.color = accentColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = active ? `${accentColor}15` : "transparent";
                        e.currentTarget.style.color = active ? accentColor : textColor;
                      }}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <NavIconButton ariaLabel="Toggle color mode" onClick={toggleTheme}>
            {resolvedTheme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </NavIconButton>

          <NavIconButton
            ariaLabel="Toggle navigation"
            className="lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={14} /> : <Menu size={18} />}
          </NavIconButton>
        </div>
      </nav>

      {menuOpen && (
        <div className="px-4 py-4 lg:hidden" style={{ backgroundColor: bgColor }}>
          <div className="flex flex-col gap-2">
            {LINKS.map((link) => {
              const isActive = isLinkActive(link);
              return (
                <a
                  key={link.route}
                  href={routeFor(link.route)}
                  className="block w-full rounded-xl px-4 py-3 text-base no-underline transition-all duration-300 hover:no-underline"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? accentColor : textColor,
                  }}
                  onClick={() => setMenuOpen(false)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = accentColor;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = isActive ? accentColor : textColor;
                  }}
                >
                  {t(link.key)}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
