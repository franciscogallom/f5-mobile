import React, { FC, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import AppLoading from "expo-app-loading"
import * as Font from "expo-font"

import { colors } from "./assets/colors"

import SignUp from "./screens/SignUp"
import LogIn from "./screens/LogIn"
import GoBack from "./components/GoBack"

const getFonts = () =>
  Font.loadAsync({
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold-italic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "poppins-extrabold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-extrabold-italic": require("./assets/fonts/Poppins-ExtraBoldItalic.ttf"),
  })

const App: FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [haveAccount, setHaveAccount] = useState(true)

  return fontsLoaded ? (
    haveAccount ? (
      <View style={app.container}>
        <LogIn />
        <TouchableOpacity
          style={app.goToSignUp}
          onPress={() => setHaveAccount(false)}
        >
          <Text style={app.text}>
            No tenes cuenta? <Text style={app.callToAction}>Registrate!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={app.container}>
        <SignUp />
        <GoBack text="volver atrás" handleTap={() => setHaveAccount(true)} />
      </View>
    )
  ) : (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
      onError={console.warn}
    />
  )
}

const app = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  goToSignUp: {
    height: 25,
  },
  text: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
    fontSize: 12.5,
    marginBottom: 100,
  },
  callToAction: {
    color: colors.tertiary,
    textDecorationLine: "underline",
    textDecorationColor: colors.tertiary,
  },
})

export default App
