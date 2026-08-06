export type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  links: {
    demo?: string;
    github?: string;
    video?: string;
  };
  /**
   * True for example content shipped with the scaffold. Rendered with a
   * visible label per the "honest data" principle — replace the entry in
   * content/projects.ts and drop this flag once it's a real project.
   */
  placeholder?: boolean;
};
