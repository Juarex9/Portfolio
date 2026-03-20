import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export function Seo({
  titleKey,
  descriptionKey,
  canonicalPath = "/",
  sameAs,
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

  const jobTitle = i18n.language.startsWith("es")
    ? "Desarrollador Full-Stack"
    : "Full-Stack Developer";

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
        jobTitle: jobTitle,
        knowsAbout: [
          "React",
          "Node.js",
          "Python",
          "FastAPI",
          "PostgreSQL",
          "MongoDB",
          "Express",
          "JavaScript",
          "TypeScript",
          "Git",
          "REST API",
          "Web3"
        ],
        sameAs: sameAsFinal,
      },
    ],
  };

  return (
    <Helmet>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={canonical} />

      {title ? <meta property="og:title" content={title} /> : null}
      {description ? <meta property="og:description" content={description} /> : null}
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Helmet>
  );
}