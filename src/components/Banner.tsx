import React, { FC } from "react"
import { ImageBackground, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors } from "../../assets/colors"
import { height } from "../../assets/dimensions"

interface Props {
  text: string
  handleTap: () => void
}

const Banner: FC<Props> = ({ text, handleTap }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleTap}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/images/banner.jpg")}
      >
        <Text style={styles.text}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.2,
    width: "100%",
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
