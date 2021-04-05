import React, { FC } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { AntDesign } from "@expo/vector-icons"
import { EvilIcons } from "@expo/vector-icons"
import { SharedElement } from "react-navigation-shared-element"

import { colors } from "../assets/colors"
import { height, width } from "../assets/dimensions"

import { HomeScreenNavigationProp } from "../screens/Home"
import { RootStackParamList } from "../screens/Home"
import { images } from "../components/Carousel"

type FieldDetailsScreenRouteProp = RouteProp<RootStackParamList, "FieldDetails">

interface Props {
  navigation: HomeScreenNavigationProp
  route: FieldDetailsScreenRouteProp
}

const FieldDetails: FC<Props> = ({ navigation, route }: Props) => {
  const field = route.params

  return (
    <View style={styles.container}>
      <Image blurRadius={1} source={images[field.id]} style={styles.image} />
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: colors.primary, opacity: 0.3 },
        ]}
      />
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
          <Text style={styles.name}>{field.name}.</Text>
          <Text style={styles.location}>
            <EvilIcons name="location" size={20} color={colors.secondary} />
            {field.location}.
          </Text>
          <Text style={styles.price}>${field.price}.</Text>
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
  },
  location: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold-italic",
    fontSize: 15,
  },
  price: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold-italic",
    fontSize: 15,
  },
})

export default FieldDetails
