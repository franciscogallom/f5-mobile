import React, { FC, useEffect, useState } from "react"
import { View, StyleSheet, Image } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { RouteProp } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"
import { SharedElement } from "react-navigation-shared-element"
import * as Animatable from "react-native-animatable"
import * as Linking from "expo-linking"

import { colors } from "../assets/colors"
import { height, width } from "../assets/dimensions"
import { images } from "../assets/images"
import { getBookings } from "../services/getBookings"

import Bookings, { fadeInBottom, DURATION } from "../components/Bookings"

import { HomeScreenNavigationProp } from "./Home"
import { RootStackParamList } from "./Home"

type FieldDetailsScreenRouteProp = RouteProp<RootStackParamList, "FieldDetails">

interface Props {
  navigation: HomeScreenNavigationProp
  route: FieldDetailsScreenRouteProp
}

const MARGIN_VERTICAL = 5

const FieldDetails: FC<Props> = ({ navigation, route }: Props) => {
  const field = route.params
  const [bookings, setBookings] = useState({})
  const [startsAt, setStartsAt] = useState(0)
  const [id, setId] = useState("")

  useEffect(() => {
    getBookings(route.params.user)
      .then((res) => {
        setId(res._id)
        setBookings(res.bookings)
        setStartsAt(res.startsAt)
      })
      .catch(() => navigation.navigate("NotFound"))
  }, [])

  return (
    <View style={styles.container}>
      <Image blurRadius={1} source={images[field.id]} style={styles.image} />
      <AntDesign
        name="close"
        size={28}
        style={styles.close}
        color={colors.secondary}
        onPress={() => {
          navigation.goBack()
        }}
      />
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
            <Animatable.Text
              animation={fadeInBottom}
              duration={DURATION + 900}
              delay={DURATION * 2}
              style={[styles.details, styles.rating]}
            >
              ⭐ {(field.sumOfRatings / field.numberOfRatings).toFixed(2)}
            </Animatable.Text>
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
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DURATION + 900}
            style={styles.details}
            onPress={() => {
              Linking.openURL(`tel:${field.phone}`)
            }}
          >
            📞 {field.phone}.
          </Animatable.Text>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION}
            delay={DURATION + 1200}
            style={[styles.details, { fontSize: 18 }]}
          >
            👇 DISPONIBILIDAD.
          </Animatable.Text>
          <ScrollView style={{ marginBottom: height * 0.2 }}>
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              Object.values(bookings).map((key: any, index) => {
                const numberOfField = `cancha ${index + 1}`
                const result = Object.values(key).map((hour) => hour)
                const { name, price, location } = field
                return (
                  <Bookings
                    key={index}
                    index={index}
                    numberOfField={numberOfField}
                    startsAt={startsAt}
                    result={result}
                    navigate={(index: number) =>
                      navigation.navigate("Checkout", {
                        id,
                        name,
                        price,
                        location,
                        numberOfField,
                        hour: `${startsAt + index}`,
                      })
                    }
                  />
                )
              })
            }
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
