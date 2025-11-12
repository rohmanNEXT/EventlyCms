"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MdPerson, MdEmail, MdMessage } from "react-icons/md";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        setSubmitted(true);
        setLoading(false);
        formRef.current?.reset();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-8 lg:px-16 py-20 bg-burning-orange-100 text-burning-orange-950" id="Contact">
      <div className="text-4xl sm:text-5xl font-medium pb-12 text-center tracking-tight">
        Kontak kami
      </div>

      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="w-full max-w-2xl bg-burning-orange-50 backdrop-blur-sm rounded-2xl shadow-lg border border-burning-orange-500 p-8 sm:p-10 flex flex-col gap-6 border-[#440806] bg-[#fff4ed]/60"
      >
        <p className="text-center text-base sm:text-lg font-medium mb-4">
          Jika ada pertanyaan tolong beri pesan disini 
        </p>

        {/* Input Nama & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative flex items-center">
            <MdPerson className="absolute left-4 text-burning-orange-500 text-lg sm:text-xl" />
            <input
              type="text"
              name="user_name"
              placeholder="Nama Anda"
              required
              className="pl-12 w-full border border-burning-orange-500 placeholder-burning-orange-400 rounded-xl py-4 text-burning-orange-950 text-base sm:text-lg bg-burning-orange-50 focus:outline-none focus:ring-2 focus:ring-burning-orange-400 transition border-[#440806]/40"
            />
          </div>

          <div className="relative flex items-center">
            <MdEmail className="absolute left-4 text-burning-orange-500 text-lg sm:text-xl" />
            <input
              type="email"
              name="user_email"
              placeholder="Email Anda"
              required
              className="pl-12 w-full border border-burning-orange-500 placeholder-burning-orange-400 rounded-xl py-4 text-burning-orange-950 text-base sm:text-lg bg-burning-orange-50 focus:outline-none focus:ring-2 focus:ring-burning-orange-400 transition border-[#440806]/40"
            />
          </div>
        </div>

        {/* Pesan */}
        <div className="relative flex items-start">
          <MdMessage className="absolute top-4 left-4 text-burning-orange-500 text-lg sm:text-xl" />
          <textarea
            name="message"
            placeholder="Tulis pesan Anda di sini..."
            required
            rows={6}
            className="pl-12 w-full border border-burning-orange-500 placeholder-burning-orange-400 rounded-xl py-4 text-burning-orange-950 text-base sm:text-lg bg-burning-orange-50 focus:outline-none focus:ring-2 focus:ring-burning-orange-400 transition resize-none border-[#440806]/40"
          />
        </div>

        {/* Tombol Kirim */}
        <button
          type="submit"
          disabled={loading}
          className="flex justify-center items-center gap-2 font-semibold py-4 rounded-xl text-lg sm:text-xl bg-burning-orange-500 hover:bg-burning-orange-600 transition disabled:opacity-60 border border-burning-orange-600 border-[#440806] hover:bg-[#ffc7a8] hover:border-[#7e1810]"
        >
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </button>

        {/* Status Pesan */}
        {submitted && (
          <p className="text-green-600 text-center mt-3 font-medium">
            ✅ Pesan berhasil dikirim!
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
