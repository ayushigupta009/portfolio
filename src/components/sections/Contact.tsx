"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Glow } from "@/components/ui/Glow";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const contactMethods = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: siteConfig.location, href: undefined },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Front-end only demo — wire up to an API route / email service as needed.
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <Section id="contact">
      <Glow className="left-1/2 top-0 h-72 w-72 -translate-x-1/2 opacity-25" />
      <SectionTitle
        eyebrow="Contact"
        title="Let's work together"
        description="Have a project in mind or just want to say hi? My inbox is always open."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-5">
        {/* Info */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-4 lg:col-span-2"
        >
          {contactMethods.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-widest text-muted">
                    {label}
                  </span>
                  <span className="block truncate font-medium text-foreground">
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
                    className="flex items-center gap-4 rounded-2xl border border-border bg-surface/40 p-4 transition-all duration-300 hover:border-primary/40"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface/40 p-4">
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
          className="glass rounded-2xl p-6 sm:p-8 lg:col-span-3"
        >
          <div className="grid gap-5 sm:grid-cols-2">
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
              rows={5}
              required
              placeholder="Tell me about your project..."
              className="w-full resize-none rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-slate transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_color-mix(in_srgb,var(--color-primary)_70%,transparent)] transition-all duration-300 hover:bg-primary-600 sm:w-auto"
          >
            {sent ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Message Sent!
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </button>
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
    <div>
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
        className="w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-slate transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}
