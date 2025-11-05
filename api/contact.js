import { Resend } from 'resend';

// crea una instancia con tu clave secreta (la pondrás en las ENV VARS)
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Método no permitido' });
  }

  const { name, email, message, honeypot } = req.body;

  // Protección anti bots
  if (honeypot) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: 'Faltan campos' });
  }

  try {
    // Acá definís tu mail de destino 👇
    await resend.emails.send({
      from: process.env.MAIL_FROM,   // quien lo envía
      to: process.env.MAIL_TO,       // tu mail personal (destino)
      subject: `Nuevo mensaje de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}

        Mensaje:
        ${message}
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, message: 'Error enviando el correo' });
  }
}
