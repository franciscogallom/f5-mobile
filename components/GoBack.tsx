import React, { FC } from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import { colors } from "../assets/colors"

interface Props {
  text: string
  icon: "back"
  handleTap: () => void
}

const GoBack: FC<Props> = ({ text, handleTap, icon }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleTap()}>
      <AntDesign name={icon} size={24} color={colors.tertiary} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    marginLeft: 5,
    color: colors.tertiary,
    fontFamily: "poppins-extrabold-italic",
  },
})

export default GoBack
