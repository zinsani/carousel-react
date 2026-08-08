import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations — the library (src/) is
  // headless and unstyled; only the playground demo uses Panda.
  include: ["./playground/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      // Playground-only layout breakpoint (576px), matching Carousel.Root's
      // default `breakpoint` prop so the demo's own styling lines up with it.
      breakpoints: {
        xs: "576px",
      },
    },
  },

  // Generate React-friendly JSX patterns (styled-system/jsx)
  jsxFramework: "react",

  // The output directory for your css system
  outdir: "styled-system",
});
