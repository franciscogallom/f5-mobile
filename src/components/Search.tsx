import React, { FC } from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { colors } from "../assets/colors"
import { SearchProps } from "../interfaces/props"

const Search: FC<SearchProps> = ({
  setSearch,
  handleSearch,
  value,
}: SearchProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
        style={styles.textInput}
        placeholder="Buscar."
        placeholderTextColor="#949494"
        value={value}
      />
      <AntDesign
        onPress={handleSearch}
        name="search1"
        size={24}
        color="#949494"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "rgba(70, 70, 70, 0.75)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  textInput: {
    color: colors.secondary,
    fontSize: 20,
    width: "85%",
  },
})

export default Search
