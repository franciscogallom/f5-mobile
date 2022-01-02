import React, { FC, useState, useEffect } from "react"
import { Text, StyleSheet, ScrollView } from "react-native"
import { useSelector } from "react-redux"

import { colors } from "../assets/colors"
import { UserState } from "../redux/userReducer"
import { getFieldsWithLimit } from "../services/getFieldsWithLimit"
import { height } from "../assets/dimensions"
import { Field } from "../interfaces/interfaces"
import { HomeScreenNavigationProp, MyGameData } from "../interfaces/props"

import Search from "../components/Search"
import Carousel from "../components/Carousel"
import Loader from "../components/Loader"
import Footer from "../components/Footer"
import Banner from "../components/Banner"
import RentPlayRepeat from "../components/RentPlayRepeat"
import MyGame from "../components/MyGame"
import { getBookingForUserForToday } from "../services/getBookingForUserForToday"

const PADDING_VERTICAL = 10

const Home: FC<HomeScreenNavigationProp> = ({
  navigation,
}: HomeScreenNavigationProp) => {
  const [fields, setFields] = useState<Field[]>([])
  const [loader, setLoader] = useState(true)
  const [search, setSearch] = useState("")
  const [myGame, setMyGame] = useState<MyGameData>()

  const user = useSelector<UserState, UserState["username"]>(
    (state) => state.username
  )

  useEffect(() => {
    getBookingForUserForToday(user)
      .then((res) => res.length > 0 && setMyGame(res[0]))
      .catch(() => navigation.navigate("NotFound"))

    getFieldsWithLimit(5)
      .then((fields) => setFields(fields))
      .catch(() => navigation.navigate("NotFound"))
      .finally(() => setLoader(false))
  }, [])

  return loader ? (
    <Loader />
  ) : (
    <ScrollView style={styles.container}>
      <Text style={styles.user}>{user} ⚽</Text>
      {myGame ? (
        <MyGame data={myGame} />
      ) : (
        <Text style={styles.greeting}>hey 👋! se juega?</Text>
      )}
      <Search
        setSearch={setSearch}
        handleSearch={() =>
          search.length > 0
            ? navigation.navigate("FieldList", { search })
            : undefined
        }
      />
      <Text style={styles.betterFields}>nuestras mejores canchas 💯.</Text>
      <Carousel data={fields} navigation={navigation} />
      <RentPlayRepeat />
      <Banner
        text="ver todas las canchas 🚀"
        handleTap={() => navigation.navigate("FieldList", { search: "" })}
      />
      <Footer />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
  },
  user: {
    color: colors.secondary,
    fontFamily: "poppins-bold-italic",
    marginTop: height * 0.05,
  },
  greeting: {
    color: colors.secondary,
    paddingVertical: PADDING_VERTICAL,
    fontSize: 30,
    fontFamily: "poppins-extrabold",
  },
  betterFields: {
    color: colors.secondary,
    paddingVertical: PADDING_VERTICAL,
    fontSize: 20,
    fontFamily: "poppins-bold-italic",
  },
})

export default Home
