import { createTheme } from "@nextui-org/react";

export const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors:{
      white: "#ffffff",
      black: "#000000",

      // brand colors
      primaryLight: "#D4FCF2",
      primaryLightHover: "#ABFAEC",
      primaryLightActive: "#7FF2E7",
      primaryLightContrast: "#2CC9D5",
      primary: "#2CC9D5",
      primaryBorder: "#2CC9D5",
      primaryBorderHover: "#167A99",
      primarySolidContrast: "$white",
      primaryShadow: "#2CC9D5",

      secondaryLight: "#FEEAED",
      secondaryLightHover: "#FED5DF",
      secondaryLightActive: "#FCC0D4",
      secondaryLightContrast: "#F594C9",
      secondary: "#F594C9",
      secondaryBorder: "#F594C9",
      secondaryBorderHover: "#D26CAE",
      secondarySolidHover: "#B04A96",
      secondarySolidContrast: "$white",
      secondaryShadow: "#F594C9",

      gradient:
        "transparent linear-gradient(151deg, #FCF3F9 0%, #EAF8FB 100%) 0% 0% no-repeat padding-box",
      link: "#2CC9D5",
    },
    fonts: {
      poppins: "Poppins, sans-serif",
    },
    fontSizes: {
      xs: "0.75rem" /* 12px */,
      sm: "0.875rem" /* 14px */, // Paragraph - Body
      base: "1rem" /* 16px */, // Button, Links
      md: "1rem" /* 16px */,
      lg: "1.125rem" /* 18px */,
      xl: "1.25rem" /* 20px */,
      "2xl": "1.5rem" /* 24px */,
      "3xl": "1.875rem" /* 30px */, // Heading h2 - Lead
      "4xl": "2.25rem" /* 36px */,
      "5xl": "3rem" /* 48px */, // Heading h1 - Title
      "6xl": "3.75rem" /* 60px */,
      "7xl": "4.5rem" /* 72px */,
      "8xl": "6rem" /* 96px */,
      "9xl": "8rem" /* 128px */,
    },
    fontWeights: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  }
})


export const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors : {
      white: "#ffffff",
      black: "#000000",
      primary: "#F594C9",
      secondary: "#2CC9D5",
      gradient:
        "transparent linear-gradient(151deg, #FCF3F9 0%, #EAF8FB 100%) 0% 0% no-repeat padding-box",
      link: "#2CC9D5",
    }
  }
})