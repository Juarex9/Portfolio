# Agent Instructions for Agustín Juárez Portfolio

## Project Overview

This is a **React + Vite** portfolio website for a full-stack developer. It uses Chakra UI for styling, framer-motion for animations, react-i18next for internationalization (Spanish/English), and is deployed on Vercel. The project includes both frontend (src/) and serverless API endpoints (api/).

---

## Build / Lint / Test Commands

### Development
```bash
npm run dev          # Start Vite dev server with hot reload
```

### Build & Preview
```bash
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
```

### Linting
```bash
npm run lint         # Run ESLint on entire codebase
```

**Note:** This project has **no test framework** configured. Tests are not required but can be added using Vitest or React Testing Library if needed.

### Vercel Deployment
```bash
# Project uses vercel.json for rewrites - no special commands needed
# API routes in /api folder are automatically deployed as serverless functions
```

---

## Code Style Guidelines

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `NavBar.jsx`, `Hero.jsx` |
| Pages | PascalCase | `Proyectos.jsx`, `Contacto.jsx` |
| Hooks | camelCase + `use` prefix | `useAccentColors.jsx` |
| Services/Utils | camelCase | `App.jsx`, `main.jsx` |
| Routes | `index.jsx` for router | `routes/index.jsx` |
| i18n | `index.js` + `locales/` folder | `i18n/index.js` |

### Directory Structure
```
src/
  components/      # Reusable UI components
  pages/           # Route-level page components
  hooks/           # Custom React hooks
  routes/          # React Router configuration
  services/        # App entry points and providers
  i18n/            # Internationalization setup
  styles/          # CSS modules (rarely used)
  assets/          # Static assets
api/               # Vercel serverless functions
```

### Component Structure

```jsx
// 1. External library imports (Chakra UI, framer-motion, etc.)
// 2. Icon imports (react-icons, @chakra-ui/icons)
// 3. Internal imports (hooks, components, i18n)
// 4. Constants (LINKS arrays, etc.)
// 5. Main function component

import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAccentColors } from "../hooks/useAccentColors";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);

export default function ComponentName() {
  const { accentColor, bgColor } = useAccentColors();
  const { t } = useTranslation();

  return (
    <Box>
      {/* JSX content */}
    </Box>
  );
}
```

### Import Conventions

- **Chakra UI**: Named imports from `@chakra-ui/react`, grouped together
- **Icons**: From `@chakra-ui/icons` for Chakra icons, `react-icons/*` for other icons
- **React hooks**: Custom hooks use relative paths from hooks folder
- **i18n**: Import `useTranslation` from `react-i18next`
- **Internal components**: Relative imports with file extensions (`.jsx`)

### Styling Patterns

**Chakra UI Props:**
- Use `maxW="6xl"` for container widths
- Use responsive syntax: `px={{ base: 4, md: 6 }}`
- Use semantic color mode values: `blackAlpha.200`, `whiteAlpha.200`
- Use `useColorModeValue(lightValue, darkValue)` for dual-theme values

**Framer Motion:**
```jsx
const MotionBox = motion(Box);

<MotionBox
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>
```

### State Management

- Use `useState` for local component state
- Use `useEffect` for side effects (with proper dependency arrays)
- Use `useDisclosure` from Chakra UI for modal/drawer open states
- Use `useAccentColors` hook for theme-aware colors (accent, bg, text)

### Error Handling

```jsx
// Toast-based error handling for forms
const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data.message || "Error occurred");
    }
    toast({ title: "Success", status: "success" });
    resetForm();
  } catch (err) {
    toast({
      title: "Error",
      description: err?.message || "Something went wrong",
      status: "error",
    });
  } finally {
    setLoading(false);
  }
};
```

### API Routes

- Export default async function `handler(req, res)`
- Check `req.method` for HTTP method validation
- Return JSON with `{ ok: boolean, message?: string }` format
- Use environment variables for secrets (e.g., `process.env.RESEND_API_KEY`)
- Implement honeypot fields for spam protection in forms

### SEO Components

Use the `Seo` component for page meta tags:
```jsx
import { Seo } from "../components/Seo";

<Seo
  titleKey="seo.page.title"
  descriptionKey="seo.page.description"
  canonicalPath="/page-path"
/>
```

### Internationalization (i18n)

- Translation keys use dot notation: `navbar.home`, `hero.title_1`
- Use `t("key")` function to translate
- Set `document.documentElement.lang` on language change
- Persist language in localStorage with key `i18nextLng`

### ESLint Configuration

- Standard JSX (no TypeScript)
- React Hooks rules enabled
- React Refresh rules for HMR compatibility
- `no-unused-vars` ignores variables starting with uppercase (capitalized component props)
- `dist/` folder is ignored

### Accessibility

- Use `aria-label` on icon buttons
- Use `VisuallyHidden` for screen-reader-only content
- Maintain keyboard navigation support
- Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`)

### Common Patterns

**Color Mode Toggle:**
```jsx
const { colorMode, toggleColorMode } = useColorMode();
const icon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;
```

**Responsive Props:**
```jsx
fontSize={{ base: "md", md: "lg" }}
display={{ base: "none", md: "flex" }}
```

**Link Styling with Hover Effects:**
```jsx
<Link
  _hover={{ textDecoration: "none", color: accentColor }}
  sx={{ "&:hover::after": { transform: "scaleX(1)" } }}
/>
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Email service API key |
| `MAIL_FROM` | Sender email address |
| `MAIL_TO` | Recipient email address |

---

## Deployment Notes

- Vercel automatically builds from the root directory
- API routes are serverless functions (no Node.js server needed)
- `vercel.json` configures SPA routing rewrites
- Vercel Speed Insights integration included via `@vercel/speed-insights`
