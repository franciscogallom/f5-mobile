import React, { FC } from "react"
import { TextInput, View, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import { colors } from "../assets/colors"
import { InputProps } from "../interfaces/props"

const Input: FC<InputProps> = ({
  value,
  placeholder,
  secureTextEntry,
  icon,
  setDataType,
  onBlur,
  keyboardType,
  fullWidth,
}: InputProps) => {
  return (
    <View style={styles.input}>
      <AntDesign style={styles.icon} name={icon} size={24} color="white" />
      <TextInput
        style={{ ...styles.textInput, width: fullWidth ? "100%" : "40%" }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#949494"
        onChangeText={setDataType}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        keyboardType={keyboardType}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: 3,
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
    backgroundColor: "transparent",
    fontFamily: "poppins-bold-italic",
  },
})

export default Input
