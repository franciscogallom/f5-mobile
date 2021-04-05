import React, { FC } from "react"
import { View, StyleSheet, Image } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"
import { SharedElement } from "react-navigation-shared-element"
import * as Animatable from "react-native-animatable"

import { colors } from "../assets/colors"
import { height, width } from "../assets/dimensions"
import { images } from "../components/Carousel"

import { HomeScreenNavigationProp } from "../screens/Home"
import { RootStackParamList } from "../screens/Home"

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

const DURATION = 1000
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
        color={colors.quaternary}
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
            duration={DURATION}
            delay={DURATION + 300}
            style={styles.location}
          >
            📍 {field.location}.
          </Animatable.Text>
          <Animatable.Text
            animation={fadeInBottom}
            duration={DURATION + 600}
            delay={DURATION}
            style={styles.price}
          >
            💲{field.price}.
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
  name: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold-italic",
    fontSize: 24,
    textTransform: "uppercase",
    marginVertical: MARGIN_VERTICAL,
  },
  location: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
    fontSize: 15,
    marginVertical: MARGIN_VERTICAL,
  },
  price: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
    fontSize: 15,
    marginVertical: MARGIN_VERTICAL,
  },
})

export default FieldDetails
