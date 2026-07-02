import { useColorModeValue } from "../hooks/useColorModeValue.js";

function BlogCard({ title, excerpt, tag, author, date, imageSrc, href }) {
  const cardBg = useColorModeValue("#ffffff", "#111827");
  const headingColor = useColorModeValue("#374151", "#ffffff");
  const imgBg = useColorModeValue("#f3f4f6", "#374151");

  return (
    <article
      className="group relative w-full max-w-[445px] overflow-hidden rounded-md p-6 shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
      style={{ backgroundColor: cardBg }}
    >
      <div className="-mx-6 -mt-6 mb-6 h-[210px] relative" style={{ backgroundColor: imgBg }}>
        <img src={imageSrc} alt={title} className="h-full w-full object-cover" loading="lazy" />
      </div>

      <div className="flex flex-col gap-3">
        {tag && (
          <p className="text-sm font-extrabold uppercase tracking-wider text-green-500">
            {tag}
          </p>
        )}

        <h3 className="text-2xl" style={{ color: headingColor, fontFamily: "var(--font-body)" }}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="static after:absolute after:inset-0 no-underline"
          >
            {title}
          </a>
        </h3>

        <p className="text-gray-500">{excerpt}</p>
      </div>

      <div className="mt-6 flex flex-row items-center gap-4">
        {author?.avatar && (
          <img src={author.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
        )}
        <div className="flex flex-col text-sm">
          <p className="font-semibold">{author?.name}</p>
          <p className="text-gray-500">{date}</p>
        </div>
      </div>
    </article>
  );
}

export default function CardsGrid() {
  const cards = [
    {
      title: "Boost your conversion rate",
      excerpt: "Quick tips to improve UX and increase conversions in your product.",
      tag: "Blog",
      author: { name: "Achim Rolle", avatar: "https://avatars0.githubusercontent.com/u/1164541?v=4" },
      date: "Feb 08, 2021 · 6 min read",
      imageSrc: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1350&q=80",
      href: "https://example.com/post-1",
    },
    {
      title: "Design systems with Tailwind",
      excerpt: "How to build consistent UI faster using tokens, theming and components.",
      tag: "Article",
      author: { name: "Jane Doe", avatar: "https://i.pravatar.cc/100?img=5" },
      date: "Mar 12, 2024 · 4 min read",
      imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1350&q=80",
      href: "https://example.com/post-2",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2">
          {cards.map((c, i) => (
            <BlogCard key={i} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}
