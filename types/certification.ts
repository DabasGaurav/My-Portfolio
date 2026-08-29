export type Certification = {
  name: string;
  issuer: string;
  year: string;
  url?: string;
  /** Issuer badge/logo, cropped from the LinkedIn profile export. */
  image?: string;
  placeholder?: boolean;
};
