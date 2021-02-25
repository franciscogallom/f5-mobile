import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

interface Props {
  text: string
  handleTap: () => void
}

const GoBack: React.FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity onPress={() => props.handleTap()}>
      <Text style={goBack.text}>{`< ${props.text}`}</Text>
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
