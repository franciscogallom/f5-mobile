import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

interface Props {
  text: string
  handleTap: () => void
}

const ButtonOne: React.FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => props.handleTap()}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    margin: 20,
    width: 200,
    padding: 10,
    borderWidth: 2,
    borderColor: colors.tertiary,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "poppins-extrabold-italic",
    color: colors.secondary,
    textAlign: "center",
    textTransform: "uppercase",
  },
})

export default ButtonOne
