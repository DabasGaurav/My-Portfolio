"use client";

import { trackEvent } from "@/lib/analytics";
import { dispatchOpenChat } from "@/lib/chat-events";
import { haptic } from "@/lib/haptics";

export function OpenChatButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`transition-transform active:scale-95 ${className ?? ""}`}
      onClick={() => {
        haptic("toggle");
        trackEvent("hero_cta_click");
        dispatchOpenChat();
      }}
    >
      {children}
    </button>
  );
}
