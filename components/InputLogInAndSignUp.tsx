import React from "react"
import { TextInput, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

interface Props {
  dataType: string
  setDataType: (dataType: string) => void
}

const InputLogInAndSignUp: React.FC<Props> = (props: Props) => {
  return (
    <TextInput
      style={inputLogInAndSignUp.input}
      value={props.dataType}
      onChangeText={(text) => props.setDataType(text)}
      onFocus={() => props.setDataType("")}
    />
  )
}

const inputLogInAndSignUp = StyleSheet.create({
  input: {
    color: colors.secondary,
    margin: 10,
    padding: 5,
    height: 30,
    width: 200,
    backgroundColor: "transparent",
    borderColor: colors.secondary,
    borderBottomWidth: 1.5,
    fontFamily: "poppins-bold-italic",
  },
})

export default InputLogInAndSignUp
