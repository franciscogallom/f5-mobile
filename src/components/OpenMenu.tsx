import React, { FC } from "react"
import Feather from "@expo/vector-icons/Feather"
import { TouchableOpacity } from "react-native"

import { height } from "../assets/dimensions"
import { colors } from "../assets/colors"
import { OpenMenuProps } from "../interfaces/props"

const OpenMenu: FC<OpenMenuProps> = ({ handleTap }: OpenMenuProps) => {
  return (
    <TouchableOpacity onPress={() => handleTap()}>
      <Feather
        name="menu"
        size={30}
        color={colors.grey}
        style={{ marginBottom: height * 0.02, marginTop: height * 0.04 }}
      />
    </TouchableOpacity>
  )
}

export default OpenMenu
