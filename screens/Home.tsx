import React, { FC, useState, useCallback } from "react"
import { Text, StyleSheet, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { StackNavigationProp } from "@react-navigation/stack"
import { useFocusEffect } from "@react-navigation/native"

import { colors } from "../assets/colors"
import { UserState } from "../redux/userReducer"
import { getFields } from "../services/getFields"

import Search from "../components/Search"
import Carousel from "../components/Carousel"
import Loader from "../components/Loader"

export type RootStackParamList = {
  Home: undefined
  FieldDetails: Field
  NotFound: undefined
}

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>

type Props = {
  navigation: HomeScreenNavigationProp
}
export interface Field {
  image: string
  location: string
  name: string
  price: string
  id: number
}

const PADDING_VERTICAL = 10

const Home: FC<Props> = ({ navigation }: Props) => {
  const [fields, setFields] = useState([])
  const [loader, setLoader] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getFields(setLoader, setFields, navigation)
      return () => unsubscribe
    }, [])
  )

  const user = useSelector<UserState, UserState["username"]>(
    (state) => state.username
  )

  return loader ? (
    <Loader />
  ) : (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hola {user}! Hoy se juega? ⚽</Text>
      <Search />
      <Text style={styles.text}>Nuestras mejores canchas ⭐.</Text>
      <Carousel data={fields} navigation={navigation} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
  },
  greeting: {
    color: colors.secondary,
    paddingVertical: PADDING_VERTICAL,
    fontSize: 30,
    fontFamily: "poppins-extrabold",
  },
  text: {
    color: colors.secondary,
    paddingVertical: PADDING_VERTICAL,
    fontSize: 20,
    fontFamily: "poppins-bold-italic",
  },
})

export default Home
