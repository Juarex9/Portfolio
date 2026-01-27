import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export function Seo({
  titleKey,
  descriptionKey,
  canonicalPath = "/",
  sameAs, // opcional: si lo pasás, pisa el default
}) {
  const { t, i18n } = useTranslation();

  const title = titleKey ? t(titleKey) : undefined;
  const description = descriptionKey ? t(descriptionKey) : undefined;

  const origin = "https://agustinjz.dev";
  const canonical = `${origin}${canonicalPath}`;

  const locale = i18n.language.startsWith("es") ? "es_AR" : "en_US";

  const sameAsDefault = [
    "https://www.linkedin.com/in/agustin-juarez0907/",
    "https://github.com/Juarex9",
  ];

  const sameAsFinal = Array.isArray(sameAs) ? sameAs : sameAsDefault;

  // JSON-LD (schema.org) — WebSite + Person
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: "Agustín Juárez | Portfolio",
        inLanguage: i18n.language.startsWith("es") ? "es-AR" : "en",
        description: description,
        publisher: { "@id": `${origin}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${origin}/#person`,
        name: "Agustín Juárez",
        url: origin,
        description: description,
        jobTitle: i18n.language.startsWith("es")
          ? "Desarrollador Full-Stack Junior"
          : "Junior Full-Stack Developer",
        knowsAbout: ["React", "Node.js", "Python", "Web3"],
        sameAs: sameAsFinal,
      },
    ],
  };

  return (
    <Helmet>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={canonical} />

      {/* Open Graph básico */}
      {title ? <meta property="og:title" content={title} /> : null}
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={locale} />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Helmet>
  );
}