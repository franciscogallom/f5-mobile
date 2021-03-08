import React, { FC } from "react"
import { TextInput, View, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import { colors } from "../assets/colors"
interface Props {
  dataType: string
  placeholder: string
  secureTextEntry?: boolean
  icon: "user" | "mail" | "lock" | "sync" | "mobile1"
  setDataType: (dataType: string) => void
}
const InputLogInAndSignUp: FC<Props> = ({
  dataType,
  placeholder,
  secureTextEntry,
  icon,
  setDataType,
}: Props) => {
  return (
    <View style={styles.input}>
      <AntDesign style={styles.icon} name={icon} size={24} color="white" />
      <TextInput
        style={styles.textInput}
        value={dataType}
        placeholder={`${placeholder}.`}
        placeholderTextColor="#949494"
        onChangeText={setDataType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: 5,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  textInput: {
    color: colors.secondary,
    margin: 5,
    padding: 5,
    width: "40%",
    backgroundColor: "transparent",
    fontFamily: "poppins-bold-italic",
  },
})

export default InputLogInAndSignUp
