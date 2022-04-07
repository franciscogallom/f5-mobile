import React, { FC, useEffect, useState } from "react"
import { FlatList, View, StyleSheet, Text } from "react-native"
import { SharedElement } from "react-navigation-shared-element"

import { getFields } from "../../services/fields/getFields"
import { height } from "../../assets/dimensions"
import { colors } from "../../assets/colors"
import { Field } from "../../interfaces/interfaces"
import { FieldListScreenNavigationProp } from "../../interfaces/props"

import Loader from "../../components/Loader"
import FieldCard from "../../components/FieldCard"
import Search from "../../components/Search"

const FieldList: FC<FieldListScreenNavigationProp> = ({
  route,
  navigation,
}: FieldListScreenNavigationProp) => {
  const [loader, setLoader] = useState(true)
  const [fields, setFields] = useState<Field[]>([])
  const [filterFields, setFilterFields] = useState<Field[]>([])
  const [search, setSearch] = useState(route.params.search)

  useEffect(() => {
    getFields()
      .then((fields) => {
        setFields(fields)
        setFilterFields(
          fields.filter((field) =>
            field.name.toLowerCase().includes(search.toLowerCase())
          )
        )
      })
      .catch(() => navigation.navigate("NotFound"))
      .finally(() => setLoader(false))
  }, [])

  useEffect(() => {
    setFilterFields(
      fields.filter((field) =>
        field.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search])

  return loader ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <Search
        setSearch={setSearch}
        handleSearch={() => undefined}
        value={search}
      />
      {filterFields.length > 0 ? (
        <>
          <FlatList
            data={filterFields}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <FieldCard
                  field={item}
                  handleNavigation={() =>
                    navigation.navigate("FieldDetails", item)
                  }
                />
              )
            }}
          />
          <SharedElement
            id="details"
            style={[
              StyleSheet.absoluteFillObject,
              { transform: [{ translateY: height }] },
            ]}
          >
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: "rgba(25, 20, 20, 0.75)" },
              ]}
            />
          </SharedElement>
        </>
      ) : (
        <Text style={styles.noResults}>
          No hay resultados que coincidan con la búsqueda 😕.
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingTop: height * 0.05,
  },
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
  results: {
    color: colors.secondary,
    fontSize: 25,
    fontFamily: "poppins-extrabold",
    padding: 10,
    marginVertical: 5,
  },
  searchKey: {
    fontStyle: "italic",
    color: colors.secondary,
  },
  noResults: {
    color: colors.secondary,
    fontFamily: "poppins-extrabold",
    fontSize: 30,
    textAlign: "center",
    marginTop: height * 0.2,
  },
})

export default FieldList
