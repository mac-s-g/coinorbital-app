import { theme } from "./../constants"

const { gold, blue, green, red } = theme.colors
const theme_colors = [gold, blue, green, red]

export default n => theme_colors[n % theme_colors.length]
