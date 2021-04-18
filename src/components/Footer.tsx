import React, { FC } from "react"
import * as Linking from "expo-linking"
import { Text, StyleSheet, View, Image } from "react-native"

import { colors } from "../assets/colors"
import { height } from "../assets/dimensions"

const Footer: FC = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/icon.png/")} />
      <Text
        style={styles.text}
        onPress={() =>
          Linking.openURL("mailto: franciscogallomolinuevo@gmail.com")
        }
      >
        Contáctanos.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: "#7c7c7c",
    borderTopWidth: 0.75,
    marginTop: 75,
    marginBottom: 25,
    paddingVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 16,
    fontFamily: "poppins-bold-italic",
    textDecorationLine: "underline",
    color: colors.secondary,
    opacity: 0.75,
  },
  image: {
    height: height * 0.1,
    width: height * 0.1,
  },
})

export default Footer
