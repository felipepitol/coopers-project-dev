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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit contact form:", form);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-white py-12 md:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="relative max-w-lg mx-auto bg-white rounded-2xl shadow-lg pt-12 pb-8 px-6 md:pt-16 md:pb-12 md:px-8">
          {/* Avatar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-x-1/2 top-1/2 w-12 h-1 bg-green-400 -left-5 md:w-20 md:h-2" />
              <img
                src={ContactAvatar}
                alt="Avatar"
                className="h-28 w-28 md:h-28 md:w-28 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>

          {/* Cabeçalho */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 mt-8 mb-6">
            <img
              src={EnvelopeIcon}
              alt=""
              aria-hidden="true"
              className="h-8 w-8 text-green-400"
            />
            <h2
              id="contact-heading"
              className="text-2xl md:text-3xl font-bold text-gray-900"
            >
              GET IN <span className="block font-normal">TOUCH</span>
            </h2>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <button
              type="submit"
              className="w-full bg-green-400 hover:bg-green-500 transition rounded-lg py-3 text-white font-semibold"
            >
              SEND NOW
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
