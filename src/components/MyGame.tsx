import React, { useState, FC, useEffect, useContext } from "react"
import { Text, View, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { LinearGradient } from "expo-linear-gradient/build/LinearGradient"
import Toast from "react-native-toast-message"

import { colors } from "../assets/colors"
import { MyGameProps } from "../interfaces/props"
import { cancelBooking } from "../services/bookings/cancelBooking"
import { getBookingForUserForToday } from "../services/bookings/getBookingForUserForToday"

import YesNoModal from "./YesNoModal"
import Context from "../context/context"

const FONT_SIZE = 24

const MyGame: FC<MyGameProps> = ({ user, navigation }: MyGameProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { myGameData, setMyGameData } = useContext(Context)

  useEffect(() => {
    getBookingForUserForToday(user)
      .then((res) => res.length > 0 && setMyGameData(res[0]))
      .catch(() => navigation.navigate("NotFound"))
  }, [])

  const handleYes = () => {
    if (myGameData) {
      const { bookingId, field, hour, fieldUser } = myGameData
      setLoading(true)
      cancelBooking(bookingId, field, hour, fieldUser)
        .then((response) => {
          if (response.error) {
            Toast.show({
              position: "bottom",
              type: "error",
              text1: "Ya no podés cancelar el turno.",
              text2: response.message,
            })
          } else {
            Toast.show({
              text1: "Operación exitosa!",
              text2: response.message,
            })
            setMyGameData(undefined)
          }
        })
        .catch(() => navigation.navigate("NotFound"))
        .finally(() => {
          setModalVisible(false)
          setLoading(false)
        })
    }
  }

  const handleCancel = () => {
    if (myGameData) {
      const matchHour = Number(myGameData.hour)
      const date = new Date()

      const currentHour = date.getHours()
      const currentMinutes = date.getMinutes()

      const lessThanAnHourLeft = matchHour - currentHour === 1
      const lessThan30Minutes = currentMinutes >= 30
      const itIsPlayingOrWasPlayed = currentHour >= matchHour

      if ((lessThanAnHourLeft && lessThan30Minutes) || itIsPlayingOrWasPlayed) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Ya no podés cancelar el turno.",
          text2: "Podías cancelar hasta 30 minutos antes.",
        })
      } else {
        setModalVisible(true)
      }
    }
  }

  return myGameData ? (
    <LinearGradient
      style={styles.container}
      colors={[colors.tertiary, colors.quaternary]}
      start={[0, 1]}
      end={[0.9, 0.1]}
    >
      <Text style={styles.text}>mi turno.</Text>

      <View>
        <Text style={[styles.textCard, { fontSize: FONT_SIZE - 2 }]}>
          ⚽ {myGameData.name}.
        </Text>
        <Text style={[styles.textCard, { fontSize: FONT_SIZE - 4 }]}>
          📍 {myGameData.location}.
        </Text>
        <Text style={[styles.textCard, { fontSize: FONT_SIZE - 6 }]}>
          🕑 {myGameData.hour}:00hs, {myGameData.field}.
        </Text>
      </View>

      <View style={styles.cancelContainer}>
        <Text style={styles.cancelText}>
          Podés cancelar hasta 30 minutos antes del partido.
        </Text>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelButton}>CANCELAR ❌.</Text>
        </TouchableOpacity>
      </View>

      {modalVisible && (
        <YesNoModal
          visible={modalVisible}
          setVisible={(value: boolean) => setModalVisible(value)}
          text="¿Estás seguro que querés cancelar?"
          handleYes={handleYes}
          loading={loading}
        />
      )}
    </LinearGradient>
  ) : (
    <Text style={styles.greeting}>hey 👋 ! se juega?</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    width: "100%",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  text: {
    color: colors.primary,
    fontFamily: "poppins-extrabold-italic",
    textTransform: "uppercase",
    fontSize: FONT_SIZE,
  },
  textCard: {
    fontFamily: "poppins-extrabold",
  },
  cancelContainer: {
    marginTop: 20,
  },
  cancelButton: {
    fontFamily: "poppins-extrabold",
    fontSize: FONT_SIZE - 6,
    marginTop: 5,
  },
  cancelText: {
    fontFamily: "poppins-extrabold",
    color: colors.primary,
    fontSize: 12,
  },
  greeting: {
    color: colors.secondary,
    paddingBottom: 10,
    fontSize: 30,
    fontFamily: "poppins-extrabold",
  },
})

export default MyGame
