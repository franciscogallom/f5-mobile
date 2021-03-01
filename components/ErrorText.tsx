import React from "react"
import { Text, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

interface Props {
  text: string
}

const ErrorText: React.FC<Props> = (props: Props) => {
  return (
    <Text style={errorText.text}>
      {props.text && props.text !== "undefined" && `${props.text}.`}
    </Text>
  )
}

const errorText = StyleSheet.create({
  text: {
    color: colors.quaternary,
    fontFamily: "poppins-bold-italic",
    padding: 1,
  },
})

export default ErrorText
