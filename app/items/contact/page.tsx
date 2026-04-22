"use client";

import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, MessageSquare, Send } from "lucide-react";
import { SkeletonContactForm } from "@/components/byMe/SkeletonCard";

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";

const ContactPage: React.FC = () => {
  const [status, setStatus] = React.useState<Status>("idle");
  const [initialLoading, setInitialLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const { data: resData } = await axios.post("/api/contact", data);
      if (resData.success === false) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 text-center">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="text-3xl font-semibold text-neutral-800 mb-2">Get in Touch</div>
          <p className="text-sm text-neutral-400 mt-1">
            We&apos;d love to hear from you.
          </p>
        </div>

        {initialLoading ? (
          <SkeletonContactForm />
        ) : (
          <>
            {/* Success alert */}
            {status === "success" && (
              <div
                className="mb-6 flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-50 border border-neutral-400/60 text-emerald-700 text-sm"
              >
                <span className="text-lg">✅</span>
                Message sent! We&apos;ll get back to you soon.
              </div>
            )}

            {/* Error alert */}
            {status === "error" && (
              <div
                className="mb-6 flex items-center gap-3 px-5 py-4 rounded-2xl bg-red-50 border border-neutral-400/60 text-red-600 text-sm"
              >
                <span className="text-lg">⚠️</span>
                Something went wrong. Please try again.
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/65 backdrop-blur-2xl border border-[rgba(255,107,44,0.12)] rounded-[1.25rem] shadow-[0_4px_24px_rgba(255,107,44,0.07),0_1px_4px_rgba(0,0,0,0.05)] p-8 flex flex-col gap-5"
              id="contact-form"
            >
              {/* Name */}
              <div>
                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  />
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    {...register("name")}
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-orange-50/50 border border-orange-400/60 text-sm text-neutral-800 placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:border-orange-400 focus:ring-3 focus:ring-orange-500/15"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500 pl-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  />
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Your email"
                    {...register("email")}
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-orange-50/50 border border-orange-400/60 text-sm text-neutral-800 placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:border-orange-400 focus:ring-3 focus:ring-orange-500/15"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 pl-1">{errors.email.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <div className="relative">
                  <MessageSquare
                    size={15}
                    className="absolute left-4 top-4 text-neutral-400 pointer-events-none"
                  />
                  <textarea
                    id="contact-message"
                    placeholder="Your message…"
                    rows={5}
                    {...register("message")}
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-orange-50/50 border border-orange-400/60 text-sm text-neutral-800 placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:border-orange-400 focus:ring-3 focus:ring-orange-500/15 resize-none"
                  />
                </div>
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500 pl-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                id="contact-submit"
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-200 shadow-sm shadow-orange-300/40 disabled:opacity-60 cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
