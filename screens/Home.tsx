import React, { FC } from "react"
import { Text, StyleSheet, ScrollView } from "react-native"
import { useSelector } from "react-redux"

import { colors } from '../assets/colors'
import { UserState } from "../redux/userReducer"

import Search from '../components/Search'
import Carousel from '../components/Carousel'

// Mock.
const DATA = [
  {
    title: 'el demetrio',
    location: '11 e/ 60 y 61, N° 121',
    price: '$1100',
    image: require('../assets/images/fields/eldemetrio.jpg')
  },
  {
    title: 'bernabeu',
    location: '11 e/ 60 y 61, N° 121',
    price: '$1500',
    image: require('../assets/images/fields/bernabeu.jpg')
  },
];

const PADDING_VERTICAL = 10;

const Home: FC = () => {

  const user = useSelector<UserState, UserState["username"]>(
    (state) => state.username
  )

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hola {user}! Hoy se juega? ⚽</Text>
      <Search />
      <Text style={styles.text}>Nuestras mejores canchas ⭐.</Text>
      <Carousel data={DATA} />
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
    fontFamily: 'poppins-extrabold'
  },
  text: {
    color: colors.secondary,
    paddingVertical: PADDING_VERTICAL,
    fontSize: 20,
    fontFamily: 'poppins-bold-italic'
  }
})

export default Home
