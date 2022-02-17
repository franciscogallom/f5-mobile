import React, { FC } from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { colors } from "../assets/colors"
import { SearchProps } from "../interfaces/props"
import { Shadow } from "react-native-shadow-2"

const Search: FC<SearchProps> = ({
  setSearch,
  handleSearch,
  value,
}: SearchProps) => {
  return (
    <Shadow
      distance={5}
      startColor={colors.shadow}
      offset={[0, 5]}
      viewStyle={{ width: "100%" }}
      containerViewStyle={{ marginVertical: 15 }}
      radius={25}
    >
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
    </Shadow>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(80, 80, 80, 0.75)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  textInput: {
    color: colors.secondary,
    fontSize: 20,
    width: "85%",
  },
})

export default Search
