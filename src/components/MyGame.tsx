import React, { FC } from "react"
import { Text, View, StyleSheet } from "react-native"
import { colors } from "../assets/colors"
import { MyGameProps } from "../interfaces/props"

const Home: FC<MyGameProps> = ({ data }: MyGameProps) => {
  const { name, location, hour, numberOfField, price } = data
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hoy se juega!</Text>

      <Text style={styles.textCard}>⚽ {name}.</Text>
      <Text style={styles.textCard}>📍 {location}.</Text>
      <Text style={styles.textCard}>
        🕑 {hour}:00hs, {numberOfField}.
      </Text>
      <Text style={styles.textCard}>💲{price}.</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    width: "100%",
    borderRadius: 10,
    marginVertical: 20,
    padding: 10,
  },
  text: {
    fontFamily: "poppins-extrabold",
    fontSize: 25,
  },
  textCard: {
    fontFamily: "poppins-extrabold",
    fontSize: 18,
  },
})
