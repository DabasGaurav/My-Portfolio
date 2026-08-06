"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  properties?: Record<string, unknown>;
};

/**
 * A plain anchor that also fires a PostHog event on click — a no-op
 * without NEXT_PUBLIC_POSTHOG_KEY set. Used anywhere a click is worth
 * knowing about (CTA, outbound project links) instead of one-off handlers.
 */
export function TrackedLink({
  event,
  properties,
  onClick,
  children,
  ...anchorProps
}: TrackedLinkProps) {
  return (
    <a
      {...anchorProps}
      onClick={(e) => {
        trackEvent(event, properties);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
