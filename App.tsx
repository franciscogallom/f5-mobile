import "react-native-gesture-handler"
import React, { FC, useState } from "react"
import AppLoading from "expo-app-loading"
import Toast from "react-native-toast-message"

import AppNavigator from "./src/routes/AppNavigator"
import { toastConfig } from "./src/config/toastConfig"
import { Provider } from "react-redux"
import { store } from "./src/redux/store"
import { getFonts } from "./src/config/getFonts"

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
