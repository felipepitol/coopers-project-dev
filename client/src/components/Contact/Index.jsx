// src/components/Contact/Index.jsx
import { useState } from "react";
import ContactAvatar from "../../assets/person-contact.png";
import EnvelopeIcon from "../../assets/icon-mail.svg";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    telephone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle|sending|success|error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const base = import.meta.env.DEV
        ? import.meta.env.VITE_API_BASE_URL
        : "";
      const res = await fetch(`${base}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error || res.statusText);
      setStatus("success");
      setForm({ name: "", email: "", telephone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="relative max-w-xl mx-auto bg-white rounded-2xl shadow-lg pt-16 pb-12 px-8">
          {/* Avatar */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-x-1/2 top-1/2 w-16 h-2 bg-green-400" />
              <img
                src={ContactAvatar}
                alt="Avatar"
                className="rounded-full w-20 h-20 border-4 border-white object-cover"
              />
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8 mt-8">
            <div className="p-2 bg-green-100 rounded">
              <img
                src={EnvelopeIcon}
                alt=""
                aria-hidden="true"
                className="w-6 h-6"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              GET IN <span className="block font-normal">TOUCH</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="type your name here…"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300 outline-none"
              />
            </div>

            {/* Email + Telephone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300 outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="telephone"
                  className="block text-gray-700 mb-1"
                >
                  Telephone*
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  required
                  placeholder="(  )    -    "
                  value={form.telephone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300 outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-1">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Type what you want to say to us"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300 outline-none resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full py-3 rounded-lg font-semibold transition
                ${
                  status === "sending"
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-green-400 hover:bg-green-500 text-white"
                }`}
            >
              {status === "sending" ? "Sending…" : "SEND NOW"}
            </button>
          </form>

          {status === "success" && (
            <p className="mt-4 text-center text-green-600">
              Thank you! Your message has been sent.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center text-red-600">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
