import React, { FC } from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import { colors } from "../assets/colors"
import { ActionProps } from "../interfaces/props"

const GoBack: FC<ActionProps> = ({ text, handleTap, icon }: ActionProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleTap()}>
      <AntDesign name={icon} size={24} color={colors.tertiary} />
      <Text style={styles.text}>{text}.</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  text: {
    marginLeft: 5,
    color: colors.tertiary,
    fontFamily: "poppins-extrabold-italic",
  },
})

export default GoBack
