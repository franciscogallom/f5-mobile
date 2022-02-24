import React, { useState, FC, useEffect } from "react"
import { Text, View, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useIsFocused } from "@react-navigation/native"
import Toast from "react-native-toast-message"
import { Shadow } from "react-native-shadow-2"

import { colors } from "../assets/colors"
import { MyGameData, MyGameProps } from "../interfaces/props"
import { cancelBooking } from "../services/cancelBooking"
import { getBookingForUserForToday } from "../services/getBookingForUserForToday"

import YesNoModal from "./YesNoModal"

const FONT_SIZE = 24

const MyGame: FC<MyGameProps> = ({ user, navigation }: MyGameProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [canCancel, setCanCancel] = useState(true)
  const [message, setMessage] = useState("Hoy se juega!")
  const [showdData, setShowData] = useState(true)
  const [data, setData] = useState<MyGameData>()
  const [loading, setLoading] = useState(false)

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getBookingForUserForToday(user)
        .then((res) => res.length > 0 && setData(res[0]))
        .catch(() => navigation.navigate("NotFound"))
    }
  }, [isFocused])

  useEffect(() => {
    if (data) {
      const { hour, name } = data
      const date = new Date()

      const currentHour = date.getHours()
      const lessThanAnHourLeft = Number(hour) - currentHour === 1

      const currentMinutes = date.getMinutes()
      const lessThan30Minutes = currentMinutes > 30

      const itIsPlaying = Number(hour) === currentHour
      const wasPlayed = Number(hour) < currentHour

      if (
        (lessThanAnHourLeft && lessThan30Minutes) ||
        itIsPlaying ||
        wasPlayed
      ) {
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
        setMessage(`¿Cómo estuvo el partido de hoy en ${name}?`)
      }
    }
  }, [])

  const handleYes = () => {
    if (data) {
      setLoading(true)
      cancelBooking(data.bookingId, data.field, data.hour, data.fieldUser)
        .then((response) => {
          Toast.show({
            text1: "Operación exitosa!",
            text2: response,
          })
          setData(undefined)
        })
        .catch(() => navigation.navigate("NotFound"))
        .finally(() => {
          setModalVisible(false)
          setLoading(false)
        })
    }
  }

  return data ? (
    <Shadow
      distance={1}
      startColor={colors.quaternaryDark}
      offset={[6, 6]}
      viewStyle={{ width: "98%" }}
      containerViewStyle={{ marginVertical: 20 }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>

        {showdData && (
          <View>
            <Text style={[styles.textCard, { fontSize: FONT_SIZE - 2 }]}>
              ⚽ {data.name}.
            </Text>
            <Text style={[styles.textCard, { fontSize: FONT_SIZE - 4 }]}>
              📍 {data.location}.
            </Text>
            <Text style={[styles.textCard, { fontSize: FONT_SIZE - 6 }]}>
              🕑 {data.hour}:00hs, {data.field}.
            </Text>
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
            loading={loading}
          />
        )}
      </View>
    </Shadow>
  ) : (
    <Text style={styles.greeting}>hey 👋! se juega?</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    width: "100%",
    borderRadius: 10,
    padding: 10,
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
    width: "50%",
  },
  cancelText: {
    fontFamily: "poppins-extrabold",
    fontSize: FONT_SIZE - 6,
  },
  greeting: {
    color: colors.secondary,
    paddingVertical: 10,
    fontSize: 30,
    fontFamily: "poppins-extrabold",
  },
})

export default MyGame
