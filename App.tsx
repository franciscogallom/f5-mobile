import "react-native-gesture-handler"
import React, { FC, useEffect, useState, useCallback } from "react"
import Toast from "react-native-toast-message"
import * as SplashScreen from "expo-splash-screen/src/SplashScreen"
import { Provider } from "react-redux"

import AppNavigator from "./src/routes/AppNavigator"
import { toastConfig } from "./src/config/toastConfig"
import { store } from "./src/redux/store"
import { getFonts } from "./src/config/getFonts"
import { ContextProvider } from "./src/context/context"
import { setTokenFromStorage } from "./src/asyncStorage/setTokenFromStorage"

SplashScreen.preventAutoHideAsync()

const App: FC = () => {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await getFonts()
        await setTokenFromStorage()
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  useEffect(() => {
    if (appIsReady) onLayoutRootView()
  }, [appIsReady])

  return appIsReady ? (
    <Provider store={store}>
      <ContextProvider>
        <AppNavigator />
        <Toast config={toastConfig} />
      </ContextProvider>
    </Provider>
  ) : null
}

export default App
