/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "heading-xs": ["16px", { lineHeight: "24px" }],
        "heading-s": ["20px", { lineHeight: "28px" }],
        "heading-md": ["24px", { lineHeight: "32px" }],
        "heading-lg": ["28px", { lineHeight: "36px" }],
        "body-xxs": ["9px", { lineHeight: "14px" }],
        "body-xs": ["12px", { lineHeight: "16px" }],
        "body-s": ["14px", { lineHeight: "20px" }],
        "body-md": ["16px", { lineHeight: "24px" }],
        "body-lg": ["18px", { lineHeight: "28px" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
    },
  },
  plugins: [],
};
