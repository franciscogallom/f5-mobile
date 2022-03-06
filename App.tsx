import "react-native-gesture-handler"
import React, { FC, useState } from "react"
import AppLoading from "expo-app-loading"
import * as Font from "expo-font"
import Toast from "react-native-toast-message"

import { toastConfig } from "./src/config/toastConfig"
import AppNavigator from "./src/routes/AppNavigator"
import { Provider } from "react-redux"
import { store } from "./src/redux/store"
const getFonts = () =>
  Font.loadAsync({
    "poppins-regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold-italic": require("./src/assets/fonts/Poppins-BoldItalic.ttf"),
    "poppins-extrabold": require("./src/assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-extrabold-italic": require("./src/assets/fonts/Poppins-ExtraBoldItalic.ttf"),
  })

const App: FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  return fontsLoaded ? (
    <Provider store={store}>
      <AppNavigator />
      <Toast config={toastConfig} />
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
