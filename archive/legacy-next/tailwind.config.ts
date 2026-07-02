import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#15120e",
        charcoal: "#1c1712",
        blackgold: "#0c0a08",
        cream: "#fbf5e8",
        warm: "#fffaf0",
        gold: "#c99a42",
        goldLight: "#e2be72",
        wine: "#7a2f25",
        olive: "#687047"
      },
      boxShadow: {
        soft: "0 22px 60px rgba(17, 12, 7, 0.14)"
      },
      borderRadius: {
        card: "8px"
      }
    }
  },
  plugins: []
};

export default config;
