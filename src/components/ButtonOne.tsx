import React, { FC } from "react"
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import { colors } from "../assets/colors"
import { ButtonOneProps } from "../interfaces/props"

const ButtonOne: FC<ButtonOneProps> = ({
  text,
  handleTap,
  secondary,
  tertiary,
  withoutMarginHorizontal,
  loading,
}: ButtonOneProps) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        marginHorizontal: withoutMarginHorizontal ? 0 : 20,
      }}
      onPress={() => !loading && handleTap()}
    >
      {tertiary ? (
        <Text style={styles.tertiaryButton}>{text}</Text>
      ) : (
        <LinearGradient
          colors={[colors.tertiary, colors.quaternary]}
          start={[0, 2]}
          end={[1, 0]}
        >
          {loading ? (
            <ActivityIndicator
              style={{
                padding: 10,
                margin: 3,
                backgroundColor: secondary ? "transparent" : colors.primary,
              }}
              color={secondary ? colors.primary : colors.tertiary}
              size={25}
            />
          ) : (
            <Text
              style={[
                styles.buttonText,
                {
                  color: secondary ? colors.primary : colors.secondary,
                  backgroundColor: secondary ? "transparent" : colors.primary,
                },
              ]}
            >
              {text}
            </Text>
          )}
        </LinearGradient>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    marginVertical: 20,
    width: "50%",
    overflow: "hidden",
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "poppins-extrabold-italic",
    textAlign: "center",
    textTransform: "uppercase",
    padding: 10,
    margin: 3,
  },
  tertiaryButton: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "poppins-extrabold-italic",
    color: colors.primary,
    borderBottomWidth: 2,
  },
})

export default ButtonOne
