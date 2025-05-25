import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({ name, email, telephone, message }) {
  const html = `
    <h1>New Contact from TODO</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${telephone || "—"}</p>
    <p><strong>Message:</strong><br/>${message}</p>
  `;

  // resend config
  const { data, error } = await resend.emails.send({
    from: "Coopers <site@felipepitol.me>",
    to: ["contato@felipepitol.me"],
    subject: "📝 New Contact from TODO",
    html,
  });

  return { data, error };
}
