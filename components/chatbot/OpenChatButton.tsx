"use client";

import { trackEvent } from "@/lib/analytics";
import { dispatchOpenChat } from "@/lib/chat-events";

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
      className={className}
      onClick={() => {
        trackEvent("hero_cta_click");
        dispatchOpenChat();
      }}
    >
      {children}
    </button>
  );
}
