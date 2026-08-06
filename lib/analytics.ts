"use client";

import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

/**
 * False until NEXT_PUBLIC_POSTHOG_KEY is set (a PostHog account + project
 * is required — see .env.local.example). Every tracking call below is a
 * safe no-op without it, so the site works fully before that's added.
 */
export const analyticsEnabled = Boolean(key);

export function initAnalytics() {
  if (!analyticsEnabled || posthog.__loaded) return;
  posthog.init(key as string, {
    api_host: host,
    capture_pageview: false,
    person_profiles: "identified_only",
  });
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (!analyticsEnabled) return;
  posthog.capture(name, properties);
}
