import { Router } from "express";
import { sendContactEmail } from "../services/email.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, telephone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Campos obrigatórios faltando" });
  }

  const { data, error } = await sendContactEmail({ name, email, telephone, message });

  if (error) {
    console.error("Resend error:", error);
    return res.status(400).json({ error });
  }

  return res.status(200).json({ data });
});

export default router;
