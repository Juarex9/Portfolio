import { Link as RouterLink } from "react-router-dom";
import { BsGithub, BsLinkedin, BsEnvelope } from "react-icons/bs";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const MotionDiv = motion.div;

const socialLinks = [
  { Icon: BsGithub, href: "https://github.com/Juarex9", label: "GitHub" },
  { Icon: BsLinkedin, href: "https://www.linkedin.com/in/agustin-juarez0907/", label: "LinkedIn" },
  { Icon: BsEnvelope, href: "mailto:agustinjuarez375@gmail.com", label: "Email" },
];

export default function Footer() {
  const { accentColor, bgColor } = useAccentColors();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const links = [
    { href: "/proyectos", key: "projects" },
    { href: "/educacion", key: "education" },
    { href: "/sobremi", key: "about" },
    { href: "/contacto", key: "contact" },
  ];

  return (
    <footer className="py-8 md:py-10" style={{ backgroundColor: bgColor }}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex flex-col gap-1">
            <p
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              <span style={{ color: accentColor }}>A</span>
              <span>JZ</span>
            </p>
            <p className="text-sm text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
              {t("footer.title")}
            </p>
          </div>

          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <MotionDiv
                key={social.label}
                whileHover={{ y: -2 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              >
                <a
                  href={social.href}
                  aria-label={social.label}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-300 hover:text-[var(--accent-brand)]"
                  style={{ ["--accent-brand"]: accentColor }}
                >
                  <social.Icon size={20} />
                </a>
              </MotionDiv>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 border-t border-black/5 pt-6 dark:border-white/10 md:flex-row md:items-center">
          <p className="text-xs text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
            © {new Date().getFullYear()} Agustín Juárez
          </p>

          <nav className="flex flex-wrap gap-6">
            {links.map((item) => (
              <RouterLink
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-gray-500 no-underline transition-colors duration-300 hover:no-underline"
                style={{ fontFamily: "var(--font-body)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}
              >
                {t(`footer.links.${item.key}`)}
              </RouterLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
