import React, { FC, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  StyleSheet,
} from "react-native"
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <LogIn />
          <TouchableOpacity
            style={styles.goToSignUp}
            onPress={() => setHaveAccount(false)}
          >
            <Text style={styles.text}>
              No tenes cuenta?{" "}
              <Text style={styles.callToAction}>Registrate!</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <SignUp />
          <GoBack text="volver atrás" handleTap={() => setHaveAccount(true)} />
        </View>
      </TouchableWithoutFeedback>
    )
  ) : (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
      onError={console.warn}
    />
  )
}

const styles = StyleSheet.create({
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
