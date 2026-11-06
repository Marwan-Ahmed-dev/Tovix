"use client";

import type { AnchorHTMLAttributes } from "react";

type AnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/**
 * In-page anchor link that plays the curtain transition before scrolling.
 */
export function AnchorLink({ href, onClick, children, ...rest }: AnchorLinkProps) {
  return (
    <a
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (!href.startsWith("#")) return;
        event.preventDefault();
        window.dispatchEvent(
          new CustomEvent("tovix:navigate", { detail: { id: href.slice(1) } }),
        );
      }}
    >
      {children}
    </a>
  );
}

export default AnchorLink;
