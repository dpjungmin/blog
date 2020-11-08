import { Category } from "@components/blog"

const palette = {
  bg: "#f6f9fc",
  text: "#2e353f",
  textLight: "#4f5969",
  hr: "#d1dce5",
  picBg: "#d7d7db",
  link: "#6772e5",
  linkHover: "#51adef",
  lightPurple: "#626ee3",
  purple: "#6772e5",
  purpleHover: "#535dc5",
  blue: "#0177b7",
}

const mapCategoryToColor = (t: string) => {
  switch (t) {
    case "algorithm":
      return "#890023"
    case "travel":
      return "#20ad2b"
    case "daily":
      return "#626ee3"
    case "research":
      return "#110f0f"
    default:
      return "grey"
  }
}

const fontFamily = {
  sans: `Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  serif: `"Merriweather", "Georgia", Cambria, "Times New Roman"`,
}

const font = {
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
  mapCategoryToColor,
  font,
  fontSize,
  easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  transition: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)",
}

export { theme }
