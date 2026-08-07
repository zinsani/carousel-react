import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      // Mobile vs. desktop switches at 576px (used throughout Carousel as `xs:`).
      // Below this, the container isn't wide enough to fit the bleeding arrow buttons.
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
