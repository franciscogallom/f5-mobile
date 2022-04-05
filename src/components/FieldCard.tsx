import React, { FC } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"

import { height } from "../assets/dimensions"
import { colors } from "../assets/colors"
import { FieldCardProps } from "../interfaces/props"

const FieldCard: FC<FieldCardProps> = ({
  field,
  handleNavigation,
}: FieldCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleNavigation}>
      <View style={styles.card}>
        <Text style={styles.name}>{field.name}.</Text>
        <View style={styles.locationAndPriceContainer}>
          <Text style={styles.detail}>📍 {field.location}.</Text>
          <Text style={styles.detail}>💲{field.price}.</Text>
        </View>
        <Image source={{ uri: field.image }} style={styles.image} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: height * 0.03,
  },
  locationAndPriceContainer: {
    padding: 10,
    position: "absolute",
    width: "100%",
    top: 125,
    left: 0,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  name: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold-italic",
    textTransform: "uppercase",
    fontSize: 20,
    position: "absolute",
    top: -20,
    left: 25,
    zIndex: 1,
    backgroundColor: colors.primary,
    padding: 2.5,
  },
  detail: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
    fontSize: 16,
    textAlign: "right",
  },
  image: {
    height: height * 0.3,
    width: "100%",
    borderRadius: 20,
  },
})

export default FieldCard
