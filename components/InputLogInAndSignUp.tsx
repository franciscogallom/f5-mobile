import React from "react"
import { TextInput, StyleSheet } from "react-native"

import { colors } from "../assets/colors"

interface Props {
  dataType: string
  setDataType: Function
}

const InputLogInAndSignUp: React.FC<Props> = ({ dataType, setDataType }) => {
  return (
    <TextInput
      style={inputLogInAndSignUp.input}
      value={dataType}
      onChangeText={(text) => setDataType(text)}
      onFocus={() => setDataType("")}
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
