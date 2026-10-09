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
  positioning: "I turn complicated problems into products people can actually use. I started in engineering, moved into product at ION, and now keep building while studying at ISB.",
  roleTags: ["Product Manager", "Engineer turned PM", "Builder"],
  openToWorkIn: [] as string[],
  cta: {
    label: "Explore my work",
  },
  resumeUrl: "",
  calendarUrl: "",
  avatars: [
    { src: "/images/gaurav.jpg", role: "Product Manager" },
  ],
} as const;
