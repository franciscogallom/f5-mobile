import React, { FC } from "react"
import { View, Text, StyleSheet } from "react-native"

import { colors } from "../../assets/colors"
import { height } from "../../assets/dimensions"

const RentPlayRepeat: FC = () => {
  return (
    <View style={styles.rentPlayRepeat}>
      <Text style={styles.rprText}>alquila</Text>
      <Text style={styles.rprText}>juga</Text>
      <Text style={styles.rprText}>repeti</Text>
      <Text
        style={[
          styles.rprText,
          { fontSize: 40, lineHeight: 50, fontFamily: "poppins-regular" },
        ]}
      >
        ⚽🔥
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rentPlayRepeat: {
    height: height * 0.5,
    justifyContent: "center",
  },
  rprText: {
    fontSize: 70,
    fontFamily: "poppins-extrabold-italic",
    color: colors.secondary,
    textAlign: "right",
    textTransform: "uppercase",
    lineHeight: 75,
    letterSpacing: -5,
  },
})

export default RentPlayRepeat
