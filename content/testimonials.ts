import type { Testimonial } from "@/types/testimonial";

/**
 * Testimonials/recommendations. LinkedIn currently shows 0 received
 * recommendations, so this is a placeholder — the honest-data convention
 * used site-wide — until you have a real one. Ask a manager, teammate, or
 * client for a LinkedIn recommendation, then swap this entry out (or add
 * more) with { quote, name, role, avatar?, linkedinUrl? }.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "This section is ready and waiting — ask a manager, teammate, or client for a quick recommendation and it'll show up here.",
    name: "No recommendations yet",
    role: "",
    placeholder: true,
  },
];
