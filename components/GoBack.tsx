import React, { FC } from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

interface Props {
  text: string
  handleTap: () => void
}

const GoBack: FC<Props> = ({ text, handleTap }: Props) => {
  return (
    <TouchableOpacity onPress={() => handleTap()}>
      <Text style={goBack.text}>{`< ${text}`}</Text>
    </TouchableOpacity>
  )
}

const goBack = StyleSheet.create({
  text: {
    color: colors.tertiary,
    fontFamily: "poppins-extrabold-italic",
  },
})

export default GoBack
