import React, { FC, useState } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { RouteProp } from "@react-navigation/native"

import { colors } from "../assets/colors"
import { RootStackParamList } from "./Home"
import { updateBookings } from "../services/updateBookings"
import { HomeScreenNavigationProp } from "./Home"

import Loader from "../components/Loader"

type CheckoutScreenRouteProp = RouteProp<RootStackParamList, "Checkout">

type Props = {
  navigation: HomeScreenNavigationProp
  route: CheckoutScreenRouteProp
}

const Checkout: FC<Props> = ({ navigation, route }: Props) => {
  const { id, name, price, location, numberOfField, hour } = route.params
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  function handlePress() {
    setLoading(true)
    updateBookings(id, numberOfField, hour)
      .then(() =>
        setMessage(
          "Genial 😃, tu reserva ya esta agendada! En instantes te redigiremos al Home."
        )
      )
      .catch(() =>
        setMessage(
          "Algo salió mal 😟, o quizas alguien reservo justo antes que vos! Vuelve a intentarlo en un instante."
        )
      )
      .finally(() => {
        setLoading(false)
        setTimeout(() => {
          navigation.navigate("Home")
        }, 4000)
      })
  }

  return loading ? (
    <Loader />
  ) : message ? (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.checkout}>CHECKOUT</Text>
      <View style={styles.card}>
        <Text style={styles.textCard}>⚽ {name}.</Text>
        <Text style={styles.textCard}>📍 {location}.</Text>
        <Text style={styles.textCard}>
          🕑 {hour}:00hs, {numberOfField}.
        </Text>
        <Text style={styles.textCard}>💲{price}.</Text>
        {/* Will be replaced by swipe button */}
      </View>
      <Button onPress={handlePress} title="CONFIRMAR" color="#000000a2" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tertiary,
    padding: 15,
  },
  checkout: {
    fontFamily: "poppins-extrabold-italic",
    fontSize: 50,
    letterSpacing: 5,
    textAlign: "center",
    marginBottom: 75,
  },
  card: {
    backgroundColor: "rgba(25, 20, 20, 0.75)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  textCard: {
    fontFamily: "poppins-extrabold",
    textAlign: "left",
    fontSize: 20,
    color: colors.secondary,
    margin: 4,
  },
  message: {
    fontFamily: "poppins-extrabold",
    textAlign: "center",
    fontSize: 20,
    color: colors.primary,
  },
})

export default Checkout
