import React, { FC } from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import { colors } from "../assets/colors"
import { ActionProps } from "../interfaces/props"

const Action: FC<ActionProps> = ({
  text,
  handleTap,
  icon,
  secondary,
}: ActionProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleTap()}>
      <AntDesign
        name={icon}
        size={24}
        color={secondary ? colors.tertiaryDark : colors.tertiary}
      />
      <Text
        style={{
          marginLeft: 5,
          color: `${secondary ? colors.tertiaryDark : colors.tertiary}`,
          fontFamily: "poppins-extrabold-italic",
        }}
      >
        {text}.
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
})

export default Action
