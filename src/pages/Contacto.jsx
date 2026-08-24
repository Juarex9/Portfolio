import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, User, Loader2 } from "lucide-react";
import { BsWhatsapp, BsLinkedin, BsTelegram } from "react-icons/bs";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div;

export default function Contact() {
  const { accentColor } = useAccentColors();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  const [form, setForm] = useState({ name: "", email: "", message: "", hp: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const resetForm = () => setForm({ name: "", email: "", message: "", hp: "" });

  const showToast = (title, description, type) => setToast({ title, description, type });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message, honeypot: form.hp }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || t("contact.toast.errorDefault"));
      showToast(t("contact.toast.successTitle"), t("contact.toast.successDescription"), "success");
      resetForm();
    } catch (err) {
      showToast(
        t("contact.toast.errorTitle"),
        err?.message || t("contact.toast.errorDefault"),
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    { icon: Phone, href: "tel:+5493886709087", label: "+54 9 3886709087" },
    { icon: Mail, href: "mailto:agustinjuarez375@gmail.com", label: "agustinjuarez375@gmail.com" },
    { icon: MapPin, href: null, label: "Salta, Argentina" },
  ];

  const socialLinks = [
    { icon: BsLinkedin, href: "https://www.linkedin.com/in/agustin-juarez0907/", label: "LinkedIn" },
    { icon: BsWhatsapp, href: "https://wa.me/5493886709087", label: "WhatsApp" },
    { icon: BsTelegram, href: "https://t.me/agustin_jzz", label: "Telegram" },
  ];

  return (
    <>
      <Seo titleKey="seo.contact.title" descriptionKey="seo.contact.description" canonicalPath="/contacto" />

      {toast && (
        <div
          role="alert"
          className={cn(
            "fixed bottom-4 left-4 right-4 z-50 max-w-sm rounded-xl border px-4 py-3 pr-8 shadow-lg md:bottom-6 md:left-auto md:right-6",
            toast.type === "success"
              ? "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100"
              : "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
          )}
          style={{ fontFamily: "var(--font-body)" }}
        >
          <p className="font-semibold">{toast.title}</p>
          {toast.description && <p className="mt-1 text-sm opacity-90">{toast.description}</p>}
          <button
            type="button"
            onClick={() => setToast(null)}
            className="absolute right-2 top-2 rounded p-1 opacity-60 hover:opacity-100"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}

      <div className="min-h-screen w-full bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-16">
          <MotionDiv
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="h-0.5 w-8 rounded-full" style={{ backgroundColor: accentColor }} />
              <Badge
                className="normal-case"
                style={{ backgroundColor: `${accentColor}15`, color: accentColor, fontFamily: "var(--font-body)" }}
              >
                {t("contact.section.badge")}
              </Badge>
            </div>
            <h1
              className="mb-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("contact.section.title")}
            </h1>
            <p className="max-w-2xl text-sm text-gray-500 md:text-base" style={{ fontFamily: "var(--font-body)" }}>
              {t("contact.section.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="mb-5 mt-2 text-sm leading-relaxed text-gray-500" style={{ fontFamily: "var(--font-body)" }}>
                {t("contact.section.desc")}
              </p>
              <div className="flex flex-col gap-2">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <Icon className="h-4 w-4 shrink-0" style={{ color: accentColor }} />
                      {item.label}
                    </>
                  );
                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="inline-flex min-h-11 max-w-full items-center justify-start gap-2 break-all rounded-full px-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:opacity-80"
                      style={{ fontFamily: "var(--font-body)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}
                    >
                      {content}
                    </a>
                  ) : (
                    <span
                      key={item.label}
                      className="inline-flex h-11 items-center justify-start gap-2 px-3 text-sm font-medium text-gray-500"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {content}
                    </span>
                  );
                })}
              </div>
              <div className="mt-4 flex gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <MotionDiv
                      key={social.label}
                      whileHover={prefersReducedMotion ? {} : { y: -2 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-all duration-300 hover:opacity-80"
                        onMouseEnter={(e) => { e.currentTarget.style.color = accentColor; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}
                      >
                        <Icon size={18} />
                      </a>
                    </MotionDiv>
                  );
                })}
              </div>
            </div>

            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-3">
                <Input
                  type="text"
                  name="hp"
                  value={form.hp}
                  onChange={onChange}
                  className="hidden"
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <Label htmlFor="name">{t("contact.form.name")}</Label>
                  <div className="relative mt-1.5">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder={t("contact.form.name")}
                      required
                      className="pl-10"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">{t("contact.form.email")}</Label>
                  <div className="relative mt-1.5">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="you@mail.com"
                      required
                      className="pl-10"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">{t("contact.form.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder={t("contact.form.desc")}
                    required
                    rows={4}
                    className="mt-1.5"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white hover:opacity-90"
                  style={{ backgroundColor: accentColor, fontFamily: "var(--font-body)" }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("contact.form.send")}
                    </>
                  ) : (
                    t("contact.form.send")
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
