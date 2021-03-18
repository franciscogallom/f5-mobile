import React, { FC } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSelector } from "react-redux"

import { colors } from '../assets/colors'
import { UserState } from "../redux/userReducer"

import Search from '../components/Search'
import BigCard from '../components/BigCard'

const Home: FC = () => {

  const user = useSelector<UserState, UserState["username"]>(
    (state) => state.username
  )

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hola {user}! Hoy se juega? ⚽</Text>
      <Search />
      <Text style={styles.text}>Nuestras mejores canchas ⭐.</Text>
      <BigCard />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
  },
  greeting: {
    color: colors.secondary,
    paddingVertical: 40,
    fontSize: 30,
    fontFamily: 'poppins-extrabold'
  },
  text: {
    color: colors.secondary,
    paddingVertical: 40,
    fontSize: 20,
    fontFamily: 'poppins-bold-italic'
  }
})

export default Home
