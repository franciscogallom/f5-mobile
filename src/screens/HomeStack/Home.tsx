import React, { FC, useState, useEffect, useCallback } from "react"
import { Text, StyleSheet, ScrollView } from "react-native"
import { DrawerActions, useFocusEffect } from "@react-navigation/native"

import { colors } from "../../assets/colors"
import { getFieldsWithLimit } from "../../services/fields/getFieldsWithLimit"
import { Field } from "../../interfaces/interfaces"
import { HomeScreenNavigationProp } from "../../interfaces/props"
import { getUsername } from "../../redux/getUsername"

import Search from "../../components/Search"
import Carousel from "../../components/Carousel"
import Loader from "../../components/Loader"
import Footer from "../../components/Footer"
import Banner from "../../components/Banner"
import RentPlayRepeat from "../../components/RentPlayRepeat"
import MyGame from "../../components/MyGame"
import OpenMenu from "../../components/OpenMenu"

const Home: FC<HomeScreenNavigationProp> = ({
  navigation,
}: HomeScreenNavigationProp) => {
  const [fields, setFields] = useState<Field[]>([])
  const [loader, setLoader] = useState(true)
  const [search, setSearch] = useState("")

  const user = getUsername()

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent()
      parent?.setOptions({ swipeEnabled: true })
      return () => parent?.setOptions({ swipeEnabled: false })
    }, [navigation])
  )

  useEffect(() => {
    getFieldsWithLimit(5)
      .then((fields) => setFields(fields))
      .catch(() => navigation.navigate("NotFound"))
      .finally(() => setLoader(false))
  }, [])

  return loader ? (
    <Loader />
  ) : (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <OpenMenu
        handleTap={() => navigation.dispatch(DrawerActions.openDrawer())}
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
