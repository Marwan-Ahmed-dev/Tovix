"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which chapter is currently under the viewport centre so the nav and
 * the chapter rail can highlight it.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(visible.target.id);
          return;
        }

        // Nothing intersecting (fast scroll / short sections): fall back to
        // the last chapter whose top has already passed the viewport middle.
        const middle = window.innerHeight / 2;
        let current = elements[0]?.id ?? "";
        for (const element of elements) {
          if (element.getBoundingClientRect().top <= middle) current = element.id;
        }
        setActive(current);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default useActiveSection;
