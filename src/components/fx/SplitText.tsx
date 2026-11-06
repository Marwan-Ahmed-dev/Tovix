"use client";

import { motion, useReducedMotion } from "motion/react";

type SplitTextProps = {
  children?: string;
  lines?: string[];
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div" | "blockquote";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  start?: boolean;
  words?: "words" | "chars";
};

/**
 * Masked line / word / character reveal. Each unit rises out of its own
 * overflow clip.
 */
export function SplitText({
  children,
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.055,
  start = true,
  words = "words",
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const text = children ?? "";

  if (reduce) {
    return (
      <Tag className={className}>
        {lines ? lines.map((line) => <span key={line} className="block">{line}</span>) : text}
      </Tag>
    );
  }

  if (lines && lines.length > 0) {
    return (
      <Tag className={className}>
        {lines.map((line, index) => (
          <span key={line} className="block overflow-hidden" style={{ paddingBottom: "0.08em" }}>
            <motion.span
              className={`block ${lineClassName}`}
              initial={{ y: "115%", opacity: 0 }}
              animate={start ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
              transition={{
                duration: 0.9,
                delay: delay + index * stagger * 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  const units = words === "chars" ? Array.from(text) : text.split(/(\s+)/).filter(Boolean);

  return (
    <Tag className={className}>
      {units.map((unit, index) => {
        const isSpace = unit.trim() === "";
        return (
          <span
            key={`${unit}-${index}`}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.06em", marginBottom: "-0.06em" }}
            aria-hidden={isSpace || undefined}
          >
            <motion.span
              className={`inline-block ${lineClassName}`}
              initial={{ y: "115%", opacity: 0 }}
              animate={start ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
              transition={{
                duration: 0.9,
                delay: delay + index * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {isSpace ? "\u00A0" : unit}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

export default SplitText;
