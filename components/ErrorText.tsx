import React, { FC } from "react"
import { Text, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

interface Props {
  text: string
}

const ErrorText: FC<Props> = ({ text }: Props) => {
  return text && text !== "undefined" ? (
    <Text style={styles.text}>{`${text}.`}</Text>
  ) : null
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 1,
    width: 200,
    justifyContent: "flex-end",
    color: colors.quaternary,
    fontFamily: "poppins-bold-italic",
    fontSize: 12,
  },
})

export default ErrorText
