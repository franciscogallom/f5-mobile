import React, { useState, FC, useEffect } from "react"
import { Text, View, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors } from "../assets/colors"
import { MyGameProps } from "../interfaces/props"
import { cancelBooking } from "../services/cancelBooking"
import Toast from "react-native-toast-message"

import YesNoModal from "./YesNoModal"

const Home: FC<MyGameProps> = ({ data, navigation }: MyGameProps) => {
  const { fieldUser, bookingId, name, location, hour, numberOfField, price } =
    data

  const [modalVisible, setModalVisible] = useState(false)
  const [canCancel, setCanCancel] = useState<boolean>(true)
  const [message, setMessage] = useState("Hoy se juega!")
  const [showdData, setShowData] = useState(true)

  useEffect(() => {
    const date = new Date()

    const currentHour = date.getHours()
    const lessThanAnHourLeft = Number(hour) - currentHour === 1

    const currentMinutes = date.getMinutes()
    const lessThan30Minutes = currentMinutes > 30

    const itIsPlaying = Number(hour) === currentHour
    const wasPlayed = Number(hour) < currentHour

    if ((lessThanAnHourLeft && lessThan30Minutes) || itIsPlaying || wasPlayed) {
      setCanCancel(false)
    }

    if (itIsPlaying || wasPlayed) {
      setShowData(false)
    }

    if (lessThanAnHourLeft && lessThan30Minutes) {
      setMessage("Esta por comenzar.")
    } else if (itIsPlaying) {
      setMessage(`Se está jugando en ${name}!`)
    } else if (wasPlayed) {
      setMessage(`¿Como estuvo el partido de hoy en ${name}?`)
    }
  }, [])

  const handleYes = () => {
    cancelBooking(bookingId, numberOfField, hour, fieldUser)
      .then(() =>
        Toast.show({
          text1: "Operación exitosa!",
          text2: "Turno cancelado satisfactoriamente.",
        })
      )
      .catch(() => navigation.navigate("NotFound"))
      .finally(() => setModalVisible(false))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>

      {showdData && (
        <View>
          <Text style={styles.textCard}>⚽ {name}.</Text>
          <Text style={styles.textCard}>📍 {location}.</Text>
          <Text style={styles.textCard}>
            🕑 {hour}:00hs, {numberOfField}.
          </Text>
          <Text style={styles.textCard}>💲{price}.</Text>
        </View>
      )}

      {canCancel && (
        <TouchableOpacity
          style={styles.cancelContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.cancelText}>❌ CANCELAR.</Text>
        </TouchableOpacity>
      )}

      {modalVisible && (
        <YesNoModal
          visible={modalVisible}
          setVisible={(value: boolean) => setModalVisible(value)}
          text="¿Estás seguro que quieres cancelar?"
          handleYes={handleYes}
        />
      )}
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
    fontSize: 20,
  },
  textCard: {
    fontFamily: "poppins-extrabold",
    fontSize: 18,
  },
  cancelContainer: {
    marginTop: 20,
    width: "50%",
  },
  cancelText: {
    fontFamily: "poppins-extrabold",
    fontSize: 18,
  },
})
