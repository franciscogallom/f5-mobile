import React, { FC, useState, useEffect } from "react"
import { Text, StyleSheet, ScrollView } from "react-native"
import { AntDesign } from "@expo/vector-icons"

import { colors } from "../../assets/colors"
import { getFieldsWithLimit } from "../../services/fields/getFieldsWithLimit"
import { height } from "../../assets/dimensions"
import { Field } from "../../interfaces/interfaces"
import { HomeScreenNavigationProp } from "../../interfaces/props"
import { getUsername } from "../../services/getUsername"

import Search from "../../components/Search"
import Carousel from "../../components/Carousel"
import Loader from "../../components/Loader"
import Footer from "../../components/Footer"
import Banner from "../../components/Banner"
import RentPlayRepeat from "../../components/RentPlayRepeat"
import MyGame from "../../components/MyGame"

const Home: FC<HomeScreenNavigationProp> = ({
  navigation,
}: HomeScreenNavigationProp) => {
  const [fields, setFields] = useState<Field[]>([])
  const [loader, setLoader] = useState(true)
  const [search, setSearch] = useState("")

  const user = getUsername()

  useEffect(() => {
    getFieldsWithLimit(5)
      .then((fields) => setFields(fields))
      .catch(() => navigation.navigate("NotFound"))
      .finally(() => setLoader(false))
  }, [])

  return loader ? (
    <Loader />
  ) : (
    <ScrollView style={styles.container}>
      <AntDesign
        style={styles.buttonMenu}
        name="menu-fold"
        size={24}
        color={colors.grey}
      />
      <MyGame user={user} navigation={navigation} />
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
  buttonMenu: {
    marginTop: height * 0.03,
    marginBottom: height * 0.01,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
  },
  betterFields: {
    color: colors.secondary,
    paddingVertical: 10,
    fontSize: 20,
    fontFamily: "poppins-bold-italic",
  },
})

export default Home
