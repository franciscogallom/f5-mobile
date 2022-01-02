import React, { FC } from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Animatable from "react-native-animatable"

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
  result,
  navigate,
  hasBooking,
}: BookingsProps) => {
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

        {result.map((status, index) => {
          return (
            <TouchableOpacity
              style={{ width: width * 0.23 }}
              key={index}
              activeOpacity={0.5}
              // If the shift is free and the user does not have a booking, navigate
              onPress={() => status && !hasBooking && navigate(index)}
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
              >{`${startsAt + index}:00`}</Text>
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
