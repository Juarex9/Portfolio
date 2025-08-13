import React from "react";
import { useAccentColors } from "../hooks/useAccentColors";


export default function Home() {
  const { bgColor, textColor, cardBg, cardText, accentColor } = useAccentColors();
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "clip",
        background: `linear-gradient(135deg, ${bgColor} 70%, #69c58b 100%)`,
        color: textColor,
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0",
      }}
    >
      <div style={{
        position: "absolute",
        top: "1.5rem",
        right: "2rem",
        zIndex: 10,
      }}>
      </div>

      <header style={{ padding: "2rem 0", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <img
            src="/foto.jpg"
            alt="Avatar"
            style={{
              width: "105px",
              height: "105px",
              borderRadius: "50%",
              marginBottom: "1rem",
              border: `3px solid ${accentColor}`,
            }}
          />
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: "0.5rem 0" }}>
          Hola, soy <span style={{ color: accentColor }}>Agustin</span>
        </h1>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 400, margin: "0.5rem 0" }}>
          Construyo experiencias web rápidas, accesibles y con diseño cuidado. <span style={{ color: accentColor }}>Desarrollador Full Stack</span><br />
          De Salta, Argentina.<br />
          Ingeniero Informatico en curso. 
        </h2>
        <div style={{ margin: "1.5rem 0" }}>
          <span style={{
            background: accentColor,
            color: bgColor,
            borderRadius: "999px",
            padding: "0.5rem 1.5rem",
            fontWeight: 600,
            fontSize: "1rem",
            marginRight: "0.5rem"
          }}>
            Disponible para trabajar
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <a href="https://www.linkedin.com/in/agustín-juárez0907" target="_blank" rel="noopener noreferrer"
            style={{
              background: cardBg,
              color: accentColor,
              borderRadius: "999px",
              padding: "0.5rem 1.2rem",
              textDecoration: "none",
              fontWeight: 500,
              border: `1px solid ${accentColor}`,
              transition: "background 0.2s"
            }}>
            Linkedin
          </a>
          <a href="https://github.com/Juarex9" target="_blank" rel="noopener noreferrer"
            style={{
              background: cardBg,
              color: accentColor,
              borderRadius: "999px",
              padding: "0.5rem 1.2rem",
              textDecoration: "none",
              fontWeight: 500,
              border: `1px solid ${accentColor}`,
              transition: "background 0.2s"
            }}>
            Github
          </a>
          <a href="mailto:agustinjuarez375@gmail.com"
            style={{
              background: cardBg,
              color: accentColor,
              borderRadius: "999px",
              padding: "0.5rem 1.2rem",
              textDecoration: "none",
              fontWeight: 500,
              border: `1px solid ${accentColor}`,
              transition: "background 0.2s"
            }}>
            agustinjuarez375@gmail.com
          </a>
        </div>
      </header>
      {/* Aquí puedes agregar la sección de proyectos */}
      <section id="proyectos" style={{ marginTop: "4rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, color: accentColor, marginBottom: "2rem" }}>
          Proyectos
        </h2>
        {/* Ejemplo de proyecto */}
        <div style={{
          background: cardBg,
          borderRadius: "1rem",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 2px 16px #0002",
          color: cardText,
        }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: textColor }}>Newsletter Sign Up Form</h3>
          <p style={{ color: "#b5cbb2" }}>
            En este proyecto construyo un formulario de registro a un newsletter, acompañado de un mensaje de agradecimiento.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <a href="#" style={{
              color: accentColor,
              marginRight: "1.5rem",
              textDecoration: "underline"
            }}>Código</a>
            <a href="#" style={{
              color: accentColor,
              textDecoration: "underline"
            }}>Demo</a>
          </div>
        </div>
      </section>
    </main>
  );
}