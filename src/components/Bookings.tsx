import React, { FC } from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Animatable from "react-native-animatable"
import Toast from "react-native-toast-message"

import { colors } from "../assets/colors"
import { width } from "../assets/dimensions"
import { BookingsProps } from "../interfaces/props"
import { SharedElement } from "react-navigation-shared-element"

export const fadeInBottom = {
  0: {
    opacity: 0,
    translateY: 100,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
}

export const DURATION = 800

const Bookings: FC<BookingsProps> = ({
  index,
  numberOfField,
  startsAt,
  fieldHours,
  navigate,
  hasBooking,
}: BookingsProps) => {
  const handleTap = (status: boolean, hour: number) => {
    if (status) {
      if (!hasBooking) {
        const currentTime = new Date().getHours()
        const hourPassed = currentTime >= hour
        if (!hourPassed) {
          navigate(index)
        } else {
          Toast.show({
            text1: `Ya son las ${currentTime}hs.`,
            text2: `Volve a intentar con otro horario.`,
          })
        }
      } else {
        Toast.show({
          text1: "Ya tenes una reserva.",
          text2: "No podes volver a reservar otro turno.",
        })
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Ya está alquilada.",
        text2: "Elegí otro horario o busca otra cancha.",
      })
    }
  }

  return (
    <Animatable.View
      animation={fadeInBottom}
      duration={DURATION}
      delay={DURATION * 2 + index * DURATION}
      style={{ marginVertical: 10 }}
      key={index}
    >
      <Text style={styles.numberOfField}>{numberOfField}</Text>
      <View key={index} style={styles.booking}>
        {/* Not visible in this component */}
        <SharedElement
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: 0,
            },
          ]}
          id="booking"
        >
          <TouchableOpacity activeOpacity={0.5}>
            <Text
              style={{
                backgroundColor: colors.tertiary,
                borderRadius: 4,
              }}
            ></Text>
          </TouchableOpacity>
        </SharedElement>

        {fieldHours.map((status: boolean, index: number) => {
          const hour = startsAt + index
          return (
            <TouchableOpacity
              style={{ width: width * 0.23 }}
              key={index}
              activeOpacity={0.5}
              onPress={() => handleTap(status, hour)}
            >
              <Text
                style={[
                  styles.bookingText,
                  {
                    backgroundColor: status
                      ? colors.tertiary
                      : colors.quaternary,
                    opacity: status ? 1 : 0.4,
                  },
                ]}
              >{`${hour}:00`}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  numberOfField: {
    color: colors.secondary,
    fontSize: 25,
    fontFamily: "poppins-extrabold-italic",
    textTransform: "uppercase",
  },
  booking: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bookingText: {
    color: colors.primary,
    paddingVertical: 10,
    margin: 5,
    fontFamily: "poppins-extrabold",
    fontSize: 20,
    borderRadius: 5,
    textAlign: "center",
  },
})

export default Bookings
