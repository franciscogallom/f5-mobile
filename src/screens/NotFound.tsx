import React, { FC } from "react"
import { View, ImageBackground, Text, StyleSheet } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"

import { colors } from "../assets/colors"
import { RootStackParamList } from "./Home"

import ButtonOne from "../components/ButtonOne"

type NotFoundScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "NotFound"
>

type Props = {
  navigation: NotFoundScreenNavigationProp
}

const NotFound: FC<Props> = ({ navigation }: Props) => (
  <View style={styles.container}>
    <ImageBackground
      source={require("../assets/images/404.jpg")}
      style={styles.image}
    >
      <Text style={styles.text}>Algo salió mal 😕...</Text>
      <ButtonOne
        text="volver a la home"
        handleTap={() => navigation.navigate("Home")}
        textColor={colors.primary}
      />
    </ImageBackground>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  text: {
    color: colors.primary,
    fontSize: 35,
    marginTop: 75,
    fontFamily: "poppins-extrabold",
  },
})

export default NotFound
