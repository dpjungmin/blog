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

const mapCategoryToColor = (
  t: string,
  hover: boolean = false,
  shadow: boolean = false
) => {
  switch (t.toLowerCase()) {
    case "travel":
      if (hover) return "#ff8787"
      if (shadow) return "rgba(255, 107, 107, 0.15)"
      return "#ff6b6b"
    case "daily":
      if (hover) return "#19e28d"
      if (shadow) return "rgba(21, 189, 118, 0.15)"
      return "#15bd76"
    case "ps":
      if (hover) return "#805ad5"
      if (shadow) return "rgba(159, 122, 234, 0.15)"
      return "#9f7aea"
    case "algorithm":
      if (hover) return "#208ff0"
      if (shadow) return "rgba(15, 122, 216, 0.15)"
      return "#0f7ad8"
    case "research":
      if (hover) return "#124c6e"
      if (shadow) return "rgba(12, 52, 75, 0.15)"
      return "#0c344b"
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
