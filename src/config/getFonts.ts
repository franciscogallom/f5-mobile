import * as Font from "expo-font"

export const getFonts = (): Promise<void> =>
  Font.loadAsync({
    "poppins-regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold-italic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
    "poppins-extrabold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-extrabold-italic": require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
  })
