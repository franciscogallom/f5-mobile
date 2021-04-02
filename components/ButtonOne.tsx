import React, { FC } from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

interface Props {
  text: string
  handleTap: () => void
  textColor?: string
}

const ButtonOne: FC<Props> = ({ text, handleTap, textColor }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleTap}>
      <Text
        style={[styles.buttonText, { color: textColor || colors.secondary }]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    margin: 20,
    width: "50%",
    padding: 10,
    borderWidth: 2,
    borderColor: colors.tertiary,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "poppins-extrabold-italic",
    textAlign: "center",
    textTransform: "uppercase",
  },
})

export default ButtonOne
