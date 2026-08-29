/**
 * Homepage hero copy. Placeholder text — edit freely, this is the only
 * place the hero's words live.
 *
 * resumeUrl / calendarUrl / openToWorkIn: leave empty to hide that piece
 * entirely (honest-data — no dead links, no fabricated claims) until you
 * have a real one. Resume file goes in public/resume.pdf; calendarUrl is
 * your real booking link (e.g. a Google Calendar appointment link).
 *
 * avatars: the rotating hero image + role-label pairs (matches the
 * reference site's cycling avatar). Add more entries once you have more
 * images — the carousel just cycles through whatever's here, so one
 * entry works fine too, it just won't visibly rotate.
 */

export const hero = {
  name: "Gaurav Dabas",
  nickname: "",
  positioning: "Technical PM who builds AI-native products end to end.",
  roleTags: ["Technical PM", "AI Builder", "Product Strategist"],
  openToWorkIn: [] as string[],
  cta: {
    label: "Ask my AI about me",
  },
  resumeUrl: "/resume.pdf",
  calendarUrl: "",
  avatars: [
    { src: "/images/gaurav.jpg", role: "Technical Product Manager" },
    { src: "/images/gaurav-2.png", role: "AI Builder" },
    { src: "/images/gaurav-3.png", role: "Product Strategist" },
  ],
} as const;
