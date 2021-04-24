// blacks
const blackFograDark = '#000E14'
const blackCoffeeDark = '#0A090B'
const blackFogra = '#051923'
const blackCoffee = '#38303D'
const darkPurple = '#231929'

// blue / purples
const blueCrayola = '#0582CA'
const sapphireBlue = '#006494'
const prussianBlue = '#003554'
const trypanBlue = '#480CA8'
const purple1 = '#560BAD'
const purple2 = '#7209B7'
const byzantine = '#B5179E'
const flickrPink = '#F72585'

// text
const white = "#fff"
const cultured = "#f8f9fa"
const cultured2 = "#e9ecef"
const gainsboro = "#dee2e6"
const lightGray = "#ced4da"
const cadetBlueCrayola = "#adb5bd"
const slateGray = "#6c757d"
const davysGrey = "#495057"
const gunmetal = "#343a40"
const charlestonGreen = "#212529"

export const theme = {
  colours: {
    text: [white, cultured, cultured2, gainsboro, lightGray, cadetBlueCrayola, slateGray, davysGrey, gunmetal, charlestonGreen] as const,
    background: [blackFograDark, blackCoffeeDark, blackFogra, blackCoffee, darkPurple] as const,
    tint: [blueCrayola, sapphireBlue, prussianBlue, trypanBlue, purple1, purple2, byzantine, flickrPink] as const
  },
  fonts: {
    mono: "'Source Code Pro', monospace",
    hand: "'Dancing Script', cursive",
    main: "'Manrope', sans-serif",
  }
};

export type Theme = typeof theme;
