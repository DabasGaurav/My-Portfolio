"use client";

/**
 * Thin wrapper around the Vibration API. Silently does nothing on
 * desktop browsers, iOS Safari, or anywhere else it's unsupported —
 * this is a bonus tactile touch for supporting mobile browsers, never
 * something a click handler should depend on.
 */
type HapticStyle = "tap" | "toggle" | "success";

const PATTERNS: Record<HapticStyle, number | number[]> = {
  tap: 8,
  toggle: [6, 30, 6],
  success: [10, 40, 10, 40, 16],
};

export function haptic(style: HapticStyle = "tap") {
  if (typeof navigator === "undefined") return;
  if (typeof navigator.vibrate !== "function") return;
  try {
    navigator.vibrate(PATTERNS[style]);
  } catch {
    // Some browsers throw if called outside a user gesture — ignore.
  }
}
