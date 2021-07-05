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
      .then(() => setMessage("Genial! En 5 segundos te redigiremos al Home."))
      .catch(() =>
        setMessage(
          "Algo salió mal, o quizas alguien reservo justo antes que vos! Vuelve a intentarlo."
        )
      )
      .finally(() => {
        setLoading(false)
        setTimeout(() => {
          navigation.navigate("Home")
        }, 5000)
      })
  }

  return loading ? (
    <Loader />
  ) : message ? (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>
        último paso! revisa que todo este bien antes de reservar tu cancha ⚠️.
      </Text>
      <Text style={styles.text}>
        {name}, {numberOfField}, a las {hour}:00hs.
      </Text>
      <Text style={styles.text}>{location}.</Text>
      <Text style={styles.text}>${price}.</Text>
      {/* Will be replaced by swipe button */}
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
  title: {
    fontFamily: "poppins-extrabold-italic",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 75,
  },
  text: {
    fontFamily: "poppins-extrabold",
    textAlign: "center",
    fontSize: 20,
  },
})

export default Checkout
