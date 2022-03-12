import React, { FC, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { SharedElement } from "react-navigation-shared-element"

import { colors } from "../../assets/colors"
import { reserve } from "../../services/bookings/reserve"
import { CheckoutProps } from "../../interfaces/props"

import Loader from "../../components/Loader"
import GoBack from "../../components/Action"
import SwipeButton from "../../components/SwipeButton"
import { getUsername } from "../../redux/getUsername"

const Checkout: FC<CheckoutProps> = ({ navigation, route }: CheckoutProps) => {
  const { id, name, price, location, numberOfField, hour } = route.params
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const user = getUsername()

  function handleSwipe() {
    setLoading(true)
    reserve(id, numberOfField, hour, user)
      .then(() =>
        setMessage(
          "Genial 😃, tu reserva ya esta agendada! En instantes te redigiremos al Home."
        )
      )
      .catch((e) => {
        console.log(e)
        setMessage(
          "Algo salió mal 😟, o quizas alguien reservo justo antes que vos! Vuelve a intentarlo en un instante."
        )
      })
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
    <SharedElement style={[StyleSheet.absoluteFillObject]} id="booking">
      <View style={styles.container}>
        <Text style={styles.checkout}>CHECKOUT</Text>
        <View style={styles.card}>
          <Text style={styles.textCard}>⚽ {name}.</Text>
          <Text style={styles.textCard}>📍 {location}.</Text>
          <Text style={styles.textCard}>
            🕑 {hour}:00hs, {numberOfField}.
          </Text>
          <Text style={styles.textCard}>💲{price}.</Text>
        </View>
        <SwipeButton handleSwipe={handleSwipe} />
        <GoBack
          icon="back"
          text="volver atrás"
          handleTap={() => navigation.goBack()}
          secondary
        />
      </View>
    </SharedElement>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.tertiary,
    padding: 15,
  },
  checkout: {
    fontFamily: "poppins-extrabold-italic",
    fontSize: 60,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(25, 20, 20, 0.75)",
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 35,
  },
  textCard: {
    fontFamily: "poppins-extrabold",
    textAlign: "left",
    fontSize: 22,
    color: colors.secondary,
    margin: 5,
    letterSpacing: 0.8,
  },
  message: {
    fontFamily: "poppins-extrabold",
    textAlign: "center",
    fontSize: 20,
    color: colors.primary,
  },
})

export default Checkout
