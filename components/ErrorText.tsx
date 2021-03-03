import React, { FC } from "react"
import { Text, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

interface Props {
  text: string
}

const ErrorText: FC<Props> = ({ text }: Props) => {
  return (
    <Text style={errorText.text}>
      {text && text !== "undefined" && `${text}.`}
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
