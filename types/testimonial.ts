export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  linkedinUrl?: string;
  /** Rendered with a visible "Placeholder" label — the honest-data convention used site-wide. */
  placeholder?: boolean;
};
