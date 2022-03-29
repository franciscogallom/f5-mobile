import React, { FC } from "react"
import { ImageBackground, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Shadow } from "react-native-shadow-2"

import { colors } from "../assets/colors"
import { height } from "../assets/dimensions"
import { BannerProps } from "../interfaces/props"

const Banner: FC<BannerProps> = ({ text, handleTap }: BannerProps) => {
  return (
    <Shadow
      distance={0}
      startColor={colors.shadow}
      offset={[0, 5]}
      viewStyle={{ width: "100%" }}
      radius={40}
    >
      <TouchableOpacity style={styles.container} onPress={handleTap}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/banner.jpg")}
        >
          <Text style={styles.text}>{text}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.2,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  text: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold-italic",
    fontSize: 25,
    textAlign: "center",
  },
})

export default Banner
