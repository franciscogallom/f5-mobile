import * as Font from "expo-font"

export const getFonts = (): Promise<void> =>
  Font.loadAsync({
    "poppins-regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold-italic": require("./src/assets/fonts/Poppins-BoldItalic.ttf"),
    "poppins-extrabold": require("./src/assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-extrabold-italic": require("./src/assets/fonts/Poppins-ExtraBoldItalic.ttf"),
  })
