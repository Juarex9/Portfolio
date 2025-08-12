import React from 'react';
import { useAccentColors } from '../hooks/useAccentColors';


const Sobremi = () => {
    const { cardBg, cardText, accentColor } = useAccentColors();
    return (
        <div style={{
            background: cardBg,
            borderRadius: "1rem",
            padding: "2rem",
            marginBottom: "2rem",
            boxShadow: "0 2px 16px #0002",
            color: cardText,
        }}>
            <h2 style={{ color: accentColor }}>Sobre mí</h2>
            <p>
                Soy un desarrollador web con experiencia en crear aplicaciones modernas y responsivas. Me apasiona aprender nuevas tecnologías y mejorar mis habilidades constantemente.
            </p>
            <p>
                En mi tiempo libre, disfruto explorando nuevas herramientas de desarrollo, contribuyendo a proyectos de código abierto y compartiendo conocimientos con la comunidad.
            </p>
        </div>
    );
}
