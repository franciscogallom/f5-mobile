import React, { FC } from "react"
import { Text, StyleSheet } from "react-native"

import { colors } from "../assets/colors"
import { ErrorTextProps } from "../interfaces/props"

const ErrorText: FC<ErrorTextProps> = ({ text }: ErrorTextProps) => {
  return text && text !== "undefined" ? (
    <Text style={styles.text}>{`${text}.`}</Text>
  ) : null
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 1,
    width: "47.5%",
    justifyContent: "flex-end",
    color: colors.quaternary,
    fontFamily: "poppins-bold-italic",
    fontSize: 12,
  },
})

export default ErrorText
