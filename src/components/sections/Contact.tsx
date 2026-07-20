"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, BadgeCheck, MapPin, Send, Loader2 } from "lucide-react";
import { siteConfig, mailComposeUrl } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { toast } from "react-toastify";
import { Glow } from "@/components/ui/Glow";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const contactMethods = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: mailComposeUrl },
  { icon: BadgeCheck, label: "Availability", value: siteConfig.availability, href: undefined },
  { icon: MapPin, label: "Location", value: siteConfig.location, href: undefined },
];

type Status = "idle" | "sending";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(new FormData(form).entries()),
        ),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      form.reset();
      toast.success(
        "Thanks! Your message is on its way — I'll get back to you soon.",
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setStatus("idle");
    }
  };

  return (
    <Section id="contact">
      <Glow className="left-1/2 top-0 h-72 w-72 -translate-x-1/2 opacity-25" />
      <SectionTitle
        eyebrow="Contact"
        title="Let's work together"
        description="Have a project in mind or just want to say hi? My inbox is always open."
      />

      <div className="mt-10 grid gap-6 sm:mt-14 sm:gap-10 lg:grid-cols-5">
        {/* Info */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex min-w-0 flex-col gap-3 sm:gap-4 lg:col-span-2"
        >
          {contactMethods.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-12 sm:w-12 bg-primary/15 text-primary ring-1 ring-primary/25">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-widest text-muted">
                    {label}
                  </span>
                  <span className="block break-words font-medium text-foreground">
                    {value}
                  </span>
                </span>
              </>
            );
            return (
              <motion.div key={label} variants={fadeUp}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface/40 p-3 transition-all duration-300 hover:border-primary/40 sm:gap-4 sm:p-4"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/40 p-3 sm:gap-4 sm:p-4">
                    {inner}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Form */}
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onSubmit={handleSubmit}
          className="glass relative w-full min-w-0 rounded-2xl p-3 sm:p-8 lg:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <Field label="Name" name="name" placeholder="Your name" required />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mt-5">
            <Field label="Subject" name="subject" placeholder="Project inquiry" />
          </div>
          <div className="mt-5">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell me about your project..."
              className="w-full min-w-0 resize-none rounded-xl border border-border bg-surface/60 px-3 py-2.5 text-sm sm:px-4 sm:py-3 text-foreground placeholder:text-slate transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Honeypot — hidden from people, catnip for bots. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_color-mix(in_srgb,var(--color-primary)_70%,transparent)] transition-all duration-300 hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full min-w-0 rounded-xl border border-border bg-surface/60 px-3 py-2.5 text-sm sm:px-4 sm:py-3 text-foreground placeholder:text-slate transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}
