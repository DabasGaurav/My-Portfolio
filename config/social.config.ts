/**
 * Social / contact links, consumed by Nav, Footer, the GitHub section,
 * and (later) the chatbot's "how do I reach you" answers.
 * Placeholder values are marked — edit freely, nothing else references
 * these strings directly.
 */

export const socialConfig = {
  github: {
    username: "DabasGaurav",
    url: "https://github.com/DabasGaurav",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/dabasgaurav/",
  },
  email: "dabasgaurav05@gmail.com",
} as const;

export type SocialConfig = typeof socialConfig;
