import "react-native-gesture-handler"
import React, { FC, useEffect, useState } from "react"
import AppLoading from "expo-app-loading"
import Toast from "react-native-toast-message"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

import AppNavigator from "./src/routes/AppNavigator"
import { toastConfig } from "./src/config/toastConfig"
import { Provider } from "react-redux"
import { store } from "./src/redux/store"
import { getFonts } from "./src/config/getFonts"

const App: FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    })
  }, [])

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
