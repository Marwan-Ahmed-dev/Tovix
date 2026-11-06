const BOOT_KEY = "tovix-booted";
export const BOOT_EVENT = "tovix:boot";

export function isBooted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return true;
  }
}

export function markBooted(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(BOOT_KEY, "1");
  } catch {
    /* storage blocked — treat as booted */
  }
}

export function announceBoot(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(BOOT_EVENT));
}
