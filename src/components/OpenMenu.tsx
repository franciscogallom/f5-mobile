import React, { FC } from "react"
import { Feather } from "@expo/vector-icons"

import { height } from "../assets/dimensions"
import { colors } from "../assets/colors"

const OpenMenu: FC = () => {
  return (
    <Feather
      name="menu"
      size={30}
      color={colors.grey}
      style={{ marginBottom: height * 0.02 }}
    />
  )
}

export default OpenMenu
