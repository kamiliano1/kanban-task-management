/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      purple: "hsl(242, 48%, 58%)",
      lightPurple: "hsl(243, 100%, 82%)",
      black: "hsl(237, 100%, 4%)",
      veryDarkGrey: "hsl(235, 16%, 15%)",
      darkGrey: "hsl(235, 12%, 19%)",
      mediumGrey: "hsl(216, 15%, 57%)",
      lightGrey: "hsl(220, 69%, 97%)",
      white: "hsl(0, 0%, 100%)",
      linesDark: "hsl(236, 11%, 27%)",
      linesLight: "hsl(221, 69%, 94%)",
      red: "hsl(0, 78%, 63%)",
      lightRed: "hsl(0, 100%, 80%)",
    },
    fontSize: {
      900: ["1.5rem", "1.875rem"],
      800: ["2rem", "2.5625rem"],
      700: ["1.5rem", "1.9375rem"],
      600: ["1.25rem", "1.625rem"],
      500: ["1rem", "1.25rem"],
      400: ["1rem", "1.3125rem"],
      "900-desktop": [
        "1.5rem",
        {
          lineHeight: "1.875rem",
          fontWeight: "700",
        },
      ],
      "900-tablet": [
        "1.25rem",
        {
          lineHeight: "1.5625rem",
          fontWeight: "700",
        },
      ],
      "900-mobile": [
        "1.125rem",
        {
          lineHeight: "1.4375rem",
          fontWeight: "700",
        },
      ],

      800: [
        "1.125rem",
        {
          lineHeight: "1.4375rem",
          fontWeight: "700",
        },
      ],
      700: [
        ".9375rem",
        {
          lineHeight: "1.1875rem",
          fontWeight: "700",
        },
      ],
      600: [
        ".75rem",
        {
          lineHeight: ".9375rem",
          fontWeight: "700",
          letterSpacing: "2.4px",
        },
      ],
      500: [
        ".8125rem",
        {
          lineHeight: "1.4375rem",
          fontWeight: "500",
        },
      ],
      400: [
        ".75rem",
        {
          lineHeight: ".9375rem",
          fontWeight: "700",
        },
      ],
    },
    extend: {
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: {
            opacity: 0,
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
        boardMobileShow: {
          from: {
            top: "-170px",
          },
          to: {
            top: "70px",
          },
        },
        boardMobileHidden: {
          from: {
            top: "70px",
          },
          to: {
            top: "-320px",
          },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
        boardMobileShow: "boardMobileShow 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
        boardMobileHidden:
          "boardMobileHidden 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
