import React, { FC } from "react"
import { View, ImageBackground, Text, StyleSheet } from "react-native"
import * as Updates from "expo-updates"

import { colors } from "../assets/colors"
import { images } from "../assets/images"

import ButtonOne from "../components/ButtonOne"

const NotFound: FC = () => (
  <View style={styles.container}>
    <ImageBackground source={{ uri: images.notFound }} style={styles.image}>
      <Text style={styles.text}>Algo salió mal 😕...</Text>
      <ButtonOne
        text="volver a cargar la app"
        handleTap={async () => await Updates.reloadAsync()}
        tertiary
      />
    </ImageBackground>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  text: {
    color: colors.primary,
    fontSize: 35,
    marginTop: 75,
    fontFamily: "poppins-extrabold",
  },
})

export default NotFound
