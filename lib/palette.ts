/**
 * Chart-series colors, reused everywhere a chart appears (GitHub activity,
 * blog data-viz, any project dashboard) so no section invents its own.
 *
 * These are the dataviz skill's pre-validated reference palette, not
 * hand-picked — CVD separation, contrast, and chroma floor already pass
 * both light and dark modes. Do not add hues here without re-running
 * `node scripts/validate_palette.js` from the dataviz skill.
 */

export const categorical = {
  light: [
    "#2a78d6", // 1 blue
    "#eb6834", // 2 orange
    "#1baf7a", // 3 aqua
    "#eda100", // 4 yellow
    "#e87ba4", // 5 magenta
    "#008300", // 6 green
    "#4a3aa7", // 7 violet
    "#e34948", // 8 red
  ],
  dark: [
    "#3987e5",
    "#d95926",
    "#199e70",
    "#c98500",
    "#d55181",
    "#008300",
    "#9085e9",
    "#e66767",
  ],
} as const;

// First 3 slots only — validated for all-pairs comparison (scatter, bubble,
// small multiples). Past 3 series in those chart forms, fold to "Other" or facet.
export const categoricalAllPairsSafe = {
  light: categorical.light.slice(0, 3),
  dark: categorical.dark.slice(0, 3),
} as const;

export const sequentialBlue = {
  light: ["#cde2fb", "#9ec5f4", "#6da7ec", "#3987e5", "#256abf", "#184f95", "#0d366b"],
} as const;

export const status = {
  good: "#0ca30c",
  warning: "#fab219",
  serious: "#ec835a",
  critical: "#d03b3b",
} as const;

export const chartChrome = {
  light: {
    surface: "#fcfcfb",
    primaryInk: "#0b0b0b",
    secondaryInk: "#52514e",
    mutedInk: "#898781",
    gridline: "#e1e0d9",
    baseline: "#c3c2b7",
  },
  dark: {
    surface: "#1a1a19",
    primaryInk: "#ffffff",
    secondaryInk: "#c3c2b7",
    mutedInk: "#898781",
    gridline: "#2c2c2a",
    baseline: "#383835",
  },
} as const;
