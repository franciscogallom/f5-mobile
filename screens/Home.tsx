import React, { FC, useState, useEffect } from "react"
import { Text, StyleSheet, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import axios from "axios"

import { colors } from "../assets/colors"
import { UserState } from "../redux/userReducer"

import Search from "../components/Search"
import Carousel from "../components/Carousel"

export interface Field {
  image: string
  location: string
  name: string
  price: string
  id: number
}

const PADDING_VERTICAL = 10

const Home: FC = () => {
  const [fields, setFields] = useState([])

  const getFields = () => {
    axios.get("http://10.0.2.2:3001/fields").then((response) => {
      setFields(response.data)
    })
  }

  useEffect(() => {
    getFields()
  }, [])

  const user = useSelector<UserState, UserState["username"]>(
    (state) => state.username
  )

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hola {user}! Hoy se juega? ⚽</Text>
      <Search />
      <Text style={styles.text}>Nuestras mejores canchas ⭐.</Text>
      <Carousel data={fields} />
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
