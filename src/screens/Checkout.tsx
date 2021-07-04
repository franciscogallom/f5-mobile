import React, { FC } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { RouteProp } from "@react-navigation/native"

import { colors } from "../assets/colors"
import { RootStackParamList } from "./Home"
import { updateBookings } from "../services/updateBookings"

type CheckoutScreenRouteProp = RouteProp<RootStackParamList, "Checkout">

type Props = {
  route: CheckoutScreenRouteProp
}

const Checkout: FC<Props> = ({ route }: Props) => {
  const { id, name, price, location, numberOfField, hour } = route.params

  return (
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
      <Button
        onPress={() => updateBookings(id, numberOfField, hour)}
        title="CONFIRMAR"
        color="#000000a2"
      />
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
