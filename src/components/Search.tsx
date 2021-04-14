import React, { FC } from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { colors } from "../../assets/colors"

const Search: FC = () => {
  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={24} color="#949494" />
      <TextInput
        style={styles.textInput}
        placeholder="Buscar."
        placeholderTextColor="#949494"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(70, 70, 70, 0.75)",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  textInput: {
    color: colors.secondary,
    fontSize: 20,
    marginLeft: 10,
  },
})

export default Search
