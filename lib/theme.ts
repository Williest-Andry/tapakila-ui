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
        primary: { value: "{colors.brand.700}" },
        background: { value: "{colors.brand.50}" },
        cardBackground: { value: "{colors.brand.200}" },
        border: { value: "{colors.gray.100}" },
        text: { value: "{colors.gray.500}" },
        success: { value: "#2e9533" },
        danger: { value: "#c33333" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
