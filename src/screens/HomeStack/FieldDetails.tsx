import React, { FC, useContext, useEffect, useState } from "react"
import { View, StyleSheet, Image } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import AntDesign from "@expo/vector-icons/AntDesign"
import { SharedElement } from "react-navigation-shared-element"
import * as Animatable from "react-native-animatable"
import * as Linking from "expo-linking"

import { colors } from "../../assets/colors"
import { height, width } from "../../assets/dimensions"
import { getBookingsByFieldUsername } from "../../services/bookings/getBookingsByFieldUsername"
import { FieldDetailsProps } from "../../interfaces/props"
import { Bookings as IBookings } from "../../interfaces/interfaces"

import Bookings, { fadeInBottom, DURATION } from "../../components/Bookings"
import Context from "../../context/context"

const MARGIN_VERTICAL = 5

const FieldDetails: FC<FieldDetailsProps> = ({
  navigation,
  route,
}: FieldDetailsProps) => {
  const field = route.params
  const [bookingsData, setBookingsData] = useState<IBookings>()
  const { myGameData } = useContext(Context)

  useEffect(() => {
    getBookingsByFieldUsername(route.params.user)
      .then((res) => {
        setBookingsData(res)
      })
      .catch(() => navigation.navigate("NotFound"))
  }, [])

  return (
    <View style={styles.container}>
      <Image
        blurRadius={1}
        source={{ uri: field.image }}
        style={styles.image}
      />
      <View style={styles.close}>
        <AntDesign
          name="close"
          size={28}
          color={colors.secondary}
          onPress={() => {
            navigation.goBack()
          }}
        />
      </View>
      <SharedElement
        id="details"
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ translateY: height }],
          },
        ]}
      >
        <View style={[StyleSheet.absoluteFillObject, styles.detailsContainer]}>
          <View style={styles.ratingAndNameContainer}>
            <Animatable.Text
              animation={fadeInBottom}
              duration={DURATION}
              delay={DURATION}
              style={styles.name}
            >
              {field.name}.
            </Animatable.Text>
            {/* FUTURE PREVIEW */}
            {/* <Animatable.Text
              animation={fadeInBottom}
              duration={DURATION + 900}
              delay={DURATION * 2}
              style={[styles.details, styles.rating]}
            >
              ⭐ {(field.sumOfRatings / field.numberOfRatings).toFixed(2)}
            </Animatable.Text> */}
          </View>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DURATION + 300}
            style={styles.details}
          >
            📍 {field.location}.
          </Animatable.Text>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DURATION + 600}
            style={styles.details}
          >
            💲{field.price}.
          </Animatable.Text>
          <TouchableOpacity
            onPress={async () => await Linking.openURL(`tel:${field.phone}`)}
          >
            <Animatable.Text
              animation={fadeInBottom}
              duration={DURATION}
              delay={DURATION + 900}
              style={styles.details}
            >
              📞 {field.phone}.
            </Animatable.Text>
          </TouchableOpacity>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DURATION + 1200}
            style={[styles.details, { fontSize: 18 }]}
          >
            👇 DISPONIBILIDAD.
          </Animatable.Text>
          <ScrollView
            style={{ marginBottom: height * 0.2 }}
            showsVerticalScrollIndicator={false}
          >
            {bookingsData?.bookings &&
              bookingsData.bookings.map((fieldData, index) => {
                const label = `CANCHA ${index + 1} ( f${fieldData.type} )`
                const fieldHours = fieldData.hours
                const { name, price, location } = field
                return (
                  <Bookings
                    key={index}
                    index={index}
                    label={label}
                    startsAt={bookingsData.startsAt}
                    fieldHours={fieldHours}
                    hasBooking={myGameData ? true : false}
                    navigate={(hour: string) =>
                      navigation.navigate("Checkout", {
                        id: bookingsData._id,
                        name,
                        price,
                        location,
                        label,
                        hour,
                      })
                    }
                  />
                )
              })}
          </ScrollView>
        </View>
      </SharedElement>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  close: {
    padding: 5,
    position: "absolute",
    top: height * 0.05,
    right: width * 0.05,
    backgroundColor: "rgba(25, 20, 20, 0.75)",
    borderRadius: 100,
  },
  image: {
    height: height,
    width: width,
  },
  detailsContainer: {
    backgroundColor: "rgba(25, 20, 20, 0.87)",
    transform: [{ translateY: -height * 0.8 }],
    padding: 15,
    borderRadius: 20,
  },
  ratingAndNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: MARGIN_VERTICAL,
  },
  name: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold-italic",
    fontSize: 24,
    textTransform: "uppercase",
  },
  details: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
    fontSize: 15,
    marginVertical: MARGIN_VERTICAL,
  },
  rating: {
    color: "#FFDF00",
    fontFamily: "poppins-extrabold",
    fontSize: 18,
  },
})

export default FieldDetails
