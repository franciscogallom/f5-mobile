import React, { FC } from "react"
import { View, StyleSheet, Image } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"
import { SharedElement } from "react-navigation-shared-element"
import * as Animatable from "react-native-animatable"
import * as Linking from "expo-linking"

import { colors } from "../assets/colors"
import { height, width } from "../assets/dimensions"
import { images } from "../components/Carousel"

import { HomeScreenNavigationProp } from "./Home"
import { RootStackParamList } from "./Home"

type FieldDetailsScreenRouteProp = RouteProp<RootStackParamList, "FieldDetails">

interface Props {
  navigation: HomeScreenNavigationProp
  route: FieldDetailsScreenRouteProp
}

const fadeInBottom = {
  0: {
    opacity: 0,
    translateY: 100,
  },
  1: {
    opacity: 1,
    translateY: 0,
  },
}

const DURATION = 800
const MARGIN_VERTICAL = 5

const FieldDetails: FC<Props> = ({ navigation, route }: Props) => {
  const field = route.params

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
    backgroundColor: "rgba(25, 20, 20, 0.75)",
    transform: [{ translateY: -height * 0.4 }],
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
