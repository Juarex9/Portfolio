import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes/index";
import "../i18n";
import "../styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "../hooks/useTheme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ChakraProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
          <SpeedInsights />
        </HelmetProvider>
      </ChakraProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
