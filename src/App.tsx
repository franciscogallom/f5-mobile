import React, { FC, useState } from "react"
import AppLoading from "expo-app-loading"
import * as Font from "expo-font"

import AppNavigator from "./routes/appStack"
import { Provider } from "react-redux"
import { store } from "./redux/store"

const getFonts = () =>
  Font.loadAsync({
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold-italic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "poppins-extrabold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-extrabold-italic": require("./assets/fonts/Poppins-ExtraBoldItalic.ttf"),
  })

const App: FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  return fontsLoaded ? (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  ) : (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
      onError={console.warn}
    />
  )
}

export default App
