const palette = {
  bg: "#f6f9fc",
  text: "#2e353f",
  textLight: "#4f5969",
  hr: "#d1dce5",
  link: "#6772e5",
  linkHover: "#51adef",
}

const fontFamily = {
  sans: `Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  serif: `"Merriweather", "Georgia", Cambria, "Times New Roman"`,
}

const fonts = {
  body: fontFamily.serif,
  header: fontFamily.sans,
}

const fontSize = {
  xxs: "12px",
  xs: "13px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  xxl: "22px",
}

const theme = {
  palette,
  fonts,
  fontSize,
  easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  transition: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)",
}

export { theme }
