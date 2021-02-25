import React, { useState } from "react"
import AppLoading from "expo-app-loading"
import * as Font from "expo-font"

import SignUp from "./screens/SignUp"

const getFonts = () =>
  Font.loadAsync({
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold-italic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "poppins-extrabold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-extrabold-italic": require("./assets/fonts/Poppins-ExtraBoldItalic.ttf"),
  })

export default function App(): JSX.Element {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  if (fontsLoaded) {
    return <SignUp />
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    )
  }
}
