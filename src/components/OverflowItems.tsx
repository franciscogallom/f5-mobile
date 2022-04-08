import React, { FC } from "react"
import { Text, View, StyleSheet, Animated } from "react-native"

import { colors } from "../assets/colors"
import { OverflowItemsProps } from "../interfaces/props"

const OVERFLOW_HEIGHT = 100

const OverflowItems: FC<OverflowItemsProps> = ({
  data,
  scrollXAnimated,
}: OverflowItemsProps) => {
  const inputRange = [-1, 0, 1]
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  })
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.name}.
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={styles.location}>📍 {item.location}.</Text>
                <Text style={styles.price}>💲{item.price}.</Text>
              </View>
            </View>
          )
        })}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
    color: colors.secondary,
    fontFamily: "poppins-extrabold-italic",
  },
  location: {
    fontSize: 16,
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
  },
  price: {
    fontSize: 18,
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
    marginRight: 15,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
  },
})

export default OverflowItems
