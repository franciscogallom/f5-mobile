import React, { FC } from "react"
import { TextInput, StyleSheet } from "react-native"

import { colors } from "../assets/colors"
interface Props {
  dataType: string
  placeholder: string
  secureTextEntry?: boolean
  setDataType: (dataType: string) => void
}

const InputLogInAndSignUp: FC<Props> = ({
  dataType,
  placeholder,
  secureTextEntry,
  setDataType,
}: Props) => {
  return (
    <TextInput
      style={inputLogInAndSignUp.input}
      value={dataType}
      placeholder={`${placeholder}.`}
      placeholderTextColor="#949494"
      onChangeText={setDataType}
      secureTextEntry={secureTextEntry}
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
