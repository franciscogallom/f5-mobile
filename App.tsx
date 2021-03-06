import React, { FC, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ImageBackground,
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
    <ImageBackground
      source={require("./assets/images/background.jpg")}
      style={styles.image}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {haveAccount ? (
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
        ) : (
          <View style={styles.container}>
            <SignUp />
            <GoBack
              icon="back"
              text="volver atrás"
              handleTap={() => setHaveAccount(true)}
            />
          </View>
        )}
      </TouchableWithoutFeedback>
    </ImageBackground>
  ) : (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
      onError={console.warn}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 350,
    height: 650,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(25, 20, 20, 0.95)",
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
