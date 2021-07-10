import React, { FC } from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import { colors } from "../assets/colors"
import { ButtonOneProps } from "../interfaces/props"

const ButtonOne: FC<ButtonOneProps> = ({
  text,
  handleTap,
  textColor,
}: ButtonOneProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleTap}>
      <LinearGradient
        colors={[colors.tertiary, colors.quaternary]}
        start={[0, 2]}
        end={[1, 0]}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: textColor || colors.secondary,
              backgroundColor: textColor ? "white" : colors.primary,
            },
          ]}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    margin: 20,
    width: "50%",
    overflow: "hidden",
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "poppins-extrabold-italic",
    textAlign: "center",
    textTransform: "uppercase",
    padding: 10,
    margin: 3,
  },
})

export default ButtonOne
