import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#faf5ff" },
          100: { value: "#f3e8ff" },
          200: { value: "#e9d5ff" },
          300: { value: "#d8b4fe" },
          400: { value: "#c084fc" },
          500: { value: "#a855f7" },
          600: { value: "#9333ea" },
          700: { value: "#7e22ce" },
          800: { value: "#6b21a8" },
          900: { value: "#581c87" },
        },
      },
      fonts: {
        heading: { value: "var(--font-inter)" },
        body: { value: "var(--font-inter)" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.600}" },
          subtle: { value: "{colors.brand.100}" },
          muted: { value: "{colors.brand.200}" },
          emphasized: { value: "{colors.brand.300}" },
          fg: { value: "{colors.brand.700}" },
          focusRing: { value: "{colors.brand.600}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
