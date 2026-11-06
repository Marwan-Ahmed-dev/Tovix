"use client";

import { useState } from "react";
import { isBooted } from "@/lib/boot";

/**
 * True when the ignition sequence already ran in this session.
 *
 * The value only shifts animation timing (it never changes rendered markup),
 * so reading it during render stays hydration-safe.
 */
export function useIsBooted(): boolean {
  const [booted] = useState(() => isBooted());
  return booted;
}

export default useIsBooted;
