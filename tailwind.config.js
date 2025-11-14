import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  safelist: [
    // Добавьте произвольные классы для rem, чтобы JIT их генерировал. В типографии не подкидывались классы
    "text-[1rem]",
    "leading-[1.5rem]",
    "text-[1.25rem]",
    "leading-[1.75rem]",
    "text-[1.5rem]",
    "leading-[2rem]",
    "text-[1.75rem]",
    "leading-[2.25rem]",
    "text-[0.5625rem]",
    "leading-[0.875rem]",
    "text-[0.75rem]",
    "leading-[1rem]",
    "text-[0.875rem]",
    "leading-[1.25rem]",
    "text-[1.125rem]",
    "leading-[1.75rem]",
    // Font weights
    "font-regular",
    "font-medium",
    "font-semibold",
    "font-bold",
    "font-extrabold",
  ],
  darkMode: "class",
  plugins: [heroui()],
};
