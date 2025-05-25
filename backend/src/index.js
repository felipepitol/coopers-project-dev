import 'dotenv/config';
import express from "express";
import cors from "cors";

import contactRouter from "./routes/contact.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/contact", contactRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
