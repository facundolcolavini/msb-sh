/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
import animations from "tailwindcss-animated";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    animate: ["responsive", "hover", "focus"],
    animation: {
      none: "none",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: " pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite",
      fadeIn: "fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1)",
      wiggle: "wiggle 1s ease-in-out infinite",
      downOut: "downOut 300ms ease-in-out forwards",
      growOut: "growOut 300ms ease-in-out forwards ",
      scaleDown: "scaleDown 300ms ease-in-out forwards ",
      dropDown: "dropDown 300ms ease-in-out forwards ",
      slide: "slide 300ms ease-in-out forwards ",
      spinSlow: "spin 3s linear infinite",
    },
    keyframes: {
      pulse: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0.5 },
      },
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      downOut: {
        "0%": { transform: "translateZ(200px) transLateY(40px)" },
        "80%": { transform: "translateZ(-10px) transLateY(0px)" },
        "100%": {
          transform: "translateZ(0px) transLateY(0px)",
        },
      },
      dropDown: {
        "0%": { transform: "translateZ(-200px) transLateY(-20px)", opacity: 0 },

        "80%": { transform: "translateZ(10px) transLateY(0px)" },
        "100%": {
          transform: "translateZ(0px) transLateY(0px)",
        },
      },
      growOut: {
        "0%": {
          transform: "scale(0)",
        },
        "80%": {
          transform: " scale(1.1)",
        },
        "100%": {
          transform: " scale(1)",
        },
      },
      slide: {
        /* DE DERECHA A IZQUIERDA PARA CART */
        "0%": {
          transform: "translateX(100%)",
        },
        "100%": {
          transform: "translateX(0%)",
        },
      },
      scaleDown: {
        "0%": {
          transform: "scale(0)",
        },
        "80%": {
          transform: " scale(1.07)",
        },
        "100%": {
          transform: " scale(1)",
        },
      },
      spin: {
        "0%": { transform: "rotate(0deg)" },

        "100%": { transform: "rotate(360deg)" },
      },
      spinSlow: {
        "0%": { transform: "rotate(0deg)" },

        "100%": { transform: "rotate(360deg)" },
      },
    },
    extend: {
      colors: {
        "primary-msb": "#939B41",
        "secondary-msb": "#FFFBF4",
        "tertiary-msb": "#8D8777",
        "primary-text-msb": "#1B1B1B",
        "secondary-text-msb": "#494949",
        white: "#FFFFFF", // Blanco
        "bg-1-msb": "#637229", // Bg 1
        "bg-2-msb": "#4E5A2B", // Bg 2
        "bg-3-msb": "#3A1B14", // Bg 3
        "primary-hover-msb": "rgba(147, 155, 65, 0.8)", // Primary hover
        "secondary-hover-msb": "rgba(255, 251, 244, 0.8)", // Secondary hover
        "tertiary-hover-msb": "rgba(141, 135, 119, 0.8)", // Tertiary hover
        "bg-3-hover-msb": "rgba(58, 27, 20, 0.8)", // Bg 3 hover
      },
      backgroundColor: {
        "primary-bg-msb": "#939B41",
        "secondary-bg-msb": "#FFFBF4",
        "tertiary-bg-msb": "#8D8777",
        "primary-bg-hover-msb": "#637229",
        "secondary-bg-hover-msb": "rgba(78, 95, 26, 0.8)",
        "tertiary-bg-hover-msb": "#3A1B14",
        // Nota: Si necesitas un cuarto color de fondo, puedes añadirlo aquí.
      },
      borderColor: {
        "primary-border-msb": "#939B41",
        "secondary-border-msb": "#FFFBF4",
        "tertiary-border-msb": "#8D8777",
        // Añade aquí cualquier otro color de borde personalizado que necesites.
      },
      textColor: {
        "primary-text-msb": "#1B1B1B",
        "secondary-text-msb": "#494949",
        "tertiary-text-msb": "#FFFFFF", // Puesto que blanco es común, puedes usar directamente 'white'.
      },
      // Si necesitas definir familias de fuentes personalizadas, añádelas aquí.
      fontFamily: {
        cormorant: ["Cormorant","Inter", ...defaultTheme.fontFamily.sans],
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        gotham : ["Gotham", ...defaultTheme.fontFamily.sans],
        // Añade aquí cualquier otra familia de fuentes personalizada que necesites.
      },
    },
  },
  plugins: [
    animations,
    ({ addComponents }) => {
      addComponents({
        ".cp-v": {
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 50% 100%, 0 85%)",
        },
        
      });
    },
  ],
};
