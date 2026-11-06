"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { studio } from "@/data/studio";

type Status = "idle" | "sending" | "sent";

const subjects = ["Press & media", "Collaboration", "Playtest access", "Something else"];

export function ContactForm() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
  });

  function update(key: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    const subject = `Tovix — ${values.subject}`;
    const body = [
      `Name: ${values.name || "—"}`,
      `Email: ${values.email || "—"}`,
      `Subject: ${values.subject}`,
      "",
      values.message,
    ].join("\n");

    const href = `mailto:${studio.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.setTimeout(() => {
      setStatus("sent");
      window.location.href = href;
      window.setTimeout(() => setStatus("idle"), 2600);
    }, reduce ? 0 : 700);
  }

  return (
    <form onSubmit={handleSubmit} className="panel relative overflow-hidden p-6 md:p-9">
      <div className="flex items-center justify-between gap-4">
        <span className="hud-sm text-[var(--muted-dim)]">Transmission form</span>
        <span className="chip">
          <span className="chip-dot" />
          Channel open
        </span>
      </div>

      <div className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Name"
            value={values.name}
            onChange={(value) => update("name", value)}
            placeholder="Your name"
          />
          <Field
            label="Email"
            type="email"
            value={values.email}
            onChange={(value) => update("email", value)}
            placeholder="you@studio.com"
          />
        </div>

        <div>
          <span className="hud-sm block text-[var(--muted-dim)]">Subject</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {subjects.map((item) => {
              const active = values.subject === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => update("subject", item)}
                  className={`border px-3 py-2 font-display text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 ${
                    active
                      ? "border-[var(--red)] bg-[color-mix(in_srgb,var(--red)_14%,transparent)] text-[var(--ink)]"
                      : "border-[var(--line-hi)] text-[var(--muted)] hover:border-[var(--line-hi)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="hud-sm block text-[var(--muted-dim)]">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Tell us what you are building, pressing, or curious about."
            className="field mt-3 resize-none"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="hud-sm max-w-xs text-[var(--muted-dim)]">
          Opens your mail client — nothing is stored on this site.
        </p>
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status !== "idle"}>
          <AnimatePresence mode="wait" initial={false}>
            {status === "idle" ? (
              <motion.span
                key="idle"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <span>Send transmission</span>
                <span aria-hidden>→</span>
              </motion.span>
            ) : status === "sending" ? (
              <motion.span
                key="sending"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                className="flex items-center gap-3"
              >
                <span className="inline-block h-2 w-2 animate-pulse bg-[#fff]" />
                Transmitting
              </motion.span>
            ) : (
              <motion.span
                key="sent"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                className="flex items-center gap-3"
              >
                <span>Client opened</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* sweep on transmit */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,26,51,0.35), rgba(0,229,255,0.35), transparent)",
          mixBlendMode: "screen",
        }}
        initial={{ x: "-120%" }}
        animate={status === "idle" ? { x: "-120%" } : { x: "420%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </form>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

function Field({ label, value, onChange, placeholder, type = "text" }: FieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="hud-sm block text-[var(--muted-dim)]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="field mt-3"
      />
    </div>
  );
}

export default ContactForm;
